export default function (input) {
  input = Number(input[0])

  const radius = Math.round((input - 1) ** (1 / 2) / 2)
  const minNum = (radius * 2 - 1) ** 2
  const d = Math.abs(((input - minNum) % (radius * 2)) - radius)
  console.log('part 1:', d + radius)

  let val
  let values = [
    [1],
    [1],
    [2, 4],
    [5, 10],
    [11, 23, 25],
    [26, 54, 57],
    [59, 122, 133, 142],
    [147, 304, 330, 351],
  ].flatMap((x) => x)
  const getSideLength = (side) => Math.floor(side / 2) + 1
  const getSideIndex = (side) =>
    Math.floor((side + 1) / 2) * Math.ceil((side + 1) / 2)

  loop: for (let side = 8; ; side++) {
    const sideLength = getSideLength(side)
    const previousSideIndex = getSideIndex(side - 4)

    for (let i = 0; i < sideLength; i++) {
      val = values.last()

      if (i === 0) {
        val += values[previousSideIndex]
      } else if (i === 1) {
        val += val + values[previousSideIndex + 1]
      } else if (i < sideLength - 1) {
        val += values
          .slice(previousSideIndex + i - 2, previousSideIndex + i + 1)
          .sum()
      } else {
        val += values
          .slice(previousSideIndex + i - 2, previousSideIndex + i)
          .sum()
      }

      if (val > input) {
        break loop
      }
      values.push(val)
    }
  }
  console.log('part 2:', val)
}
