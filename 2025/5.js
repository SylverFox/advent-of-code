export default function (input) {
  const split = input.findIndex((row) => row === '')
  const ranges = input.slice(0, split).map((row) => row.split('-').map(Number))
  const ingredients = input.slice(split + 1).map((row) => Number(row))

  const isFresh = (ingredient) => {
    for (let r of ranges) {
      if (ingredient >= r[0] && ingredient <= r[1]) {
        return true
      }
    }
    return false
  }

  const output1 = ingredients.filter(isFresh).length
  console.log('part 1:', output1)

  for (let r = 0; r < ranges.length; r++) {
    const overlappingRange = ranges.findIndex(
      (range, i) =>
        i > r && range[0] <= ranges[r][1] && range[1] >= ranges[r][0]
    )

    if (overlappingRange >= 0) {
      ranges[r] = [
        Math.min(ranges[r][0], ranges[overlappingRange][0]),
        Math.max(ranges[r][1], ranges[overlappingRange][1]),
      ]
      ranges.splice(overlappingRange, 1)
      r -= 1
    }
  }
  const output2 = ranges.map((r) => r[1] - r[0] + 1).sum()

  console.log('part 2:', output2)
}
