export default function (input) {
  input = input.map((i) => i.split(' ').map(Number))

  const check = (report) => {
    const delta = report.slice(1).map((r, i) => report[i] - r)
    return (
      delta.filter((d) => d >= 1 && d <= 3).length === delta.length ||
      delta.filter((d) => d >= -3 && d <= -1).length === delta.length
    )
  }

  console.log('part 1:', input.filter(check).length)

  const check2 = (report) => {
    if (check(report)) return true
    for (let i = 0; i < report.length; i++) {
      const copy = report.slice()
      copy.splice(i, 1)
      if (check(copy)) return true
    }
    return false
  }

  console.log('part 2:', input.filter(check2).length)
}
