export default function (input) {
  const problems = []
  for (let x = 0, lx = 0; x <= input[0].length; x++) {
    if (x === input[0].length || input.every((i) => i[x] === ' ')) {
      problems.push(input.map((row) => row.slice(lx, x)))
      lx = x + 1
    }
  }

  const output1 = problems
    .map((row) => {
      const op = row[row.length - 1]
      return eval(row.slice(0, -1).join(op))
    })
    .sum()
  console.log('part 1:', output1)

  const output2 = problems
    .map((row) => {
      const op = row.splice(-1, 1)[0]
      const mappedRow = row
        .map((v) => v.split(''))
        .transpose2D()
        .map((v) => v.join(''))
      return eval(mappedRow.join(op))
    })
    .sum()
  console.log('part 2:', output2)
}
