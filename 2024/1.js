export default function (input) {
  const sorted = input
    .map((i) => i.split(/\s+/).map(Number))
    .transpose2D()
    .map((i) => i.sort())

  const sumOfDiff = sorted[0].map((x, i) => Math.abs(x - sorted[1][i])).sum()
  console.log('part 1:', sumOfDiff)

  const sumOfOccurences = sorted[0]
    .map((x, i) => x * sorted[1].filter((s) => s === x).length)
    .sum()
  console.log('part 2:', sumOfOccurences)
}
