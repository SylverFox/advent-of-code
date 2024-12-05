export default function (input) {
  input = input.map((i) =>
    i
      .split(/\s+/)
      .map(Number)
      .sort((a, b) => b - a)
  )

  let output = input.map((i) => i[0] - i[i.length - 1]).sum()
  console.log('part 1:', output)

  const findDividers = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] % arr[j] === 0) return arr[i] / arr[j]
      }
    }
  }

  output = input.map(findDividers).sum()
  console.log('part 2:', output)
}
