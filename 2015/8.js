export default function (input) {
  let output = input
    .map((i) => [i.length, eval(i).length])
    .reduce((a, b) => a + (b[0] - b[1]), 0)
  console.log('Part 1:', output)

  output = input
    .map((i) => [JSON.stringify(i).length, i.length])
    .reduce((a, b) => a + (b[0] - b[1]), 0)
  console.log('Part 2:', output)
}
