export default function (input) {
  const grouped = input.map((i) =>
    i.split('').reduce((a, v) => ({ ...a, [v]: (a[v] ?? 0) + 1 }), {})
  )
  const twos = grouped.filter(
    (i) => Object.values(i).filter((x) => x === 2).length > 0
  ).length
  const threes = grouped.filter(
    (i) => Object.values(i).filter((x) => x === 3).length > 0
  ).length
  console.log('part 1:', twos * threes)

  const mapped = input.map((i) => i.split('').map((x) => x.charCodeAt()))
  let output
  search: for (let a = 0; a < mapped.length - 1; a++) {
    for (let b = a; b < mapped.length; b++) {
      const c = mapped[a].map((x, i) => x - mapped[b][i]).filter((x) => x !== 0)
      if (c.length === 1) {
        output = mapped[a]
          .filter((x, i) => mapped[b][i] === x)
          .map((x) => String.fromCharCode(x))
          .join('')
        break search
      }
    }
  }

  console.log('part 2:', output)
}
