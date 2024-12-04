export default function (input) {
  let discs = input
    .map((i) =>
      i
        .match(/ (\d+) positions.*position (\d+)/)
        .slice(1)
        .map(Number)
    )
    .map((d, i) => [d[0], (d[1] + i + 1) % d[0]])

  const getRotations = (discs) => {
    discs = JSON.parse(JSON.stringify(discs))
    let multiplier = 1,
      rotations = 0
    for (let d in discs) {
      if (discs[d][1] !== 0) {
        let rotation = 1
        while (rotation++) {
          if ((discs[d][1] + rotation * multiplier) % discs[d][0] === 0) {
            break
          }
        }
        for (let d2 in discs) {
          discs[d2][1] = (discs[d2][1] + rotation * multiplier) % discs[d2][0]
        }
        rotations += rotation * multiplier
      }
      multiplier *= discs[d][0]
    }
    return rotations
  }

  console.log('Part 1:', getRotations(discs))
  discs.push([11, discs.length + 1])
  console.log('Part 2:', getRotations(discs))
}
