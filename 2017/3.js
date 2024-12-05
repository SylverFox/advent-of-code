export default function (input) {
  input = Number(input[0])

  const radius = Math.round((input - 1) ** (1 / 2) / 2)
  const minNum = (radius * 2 - 1) ** 2
  const d = Math.abs(((input - minNum) % (radius * 2)) - radius)
  console.log(d, radius)
  console.log('part 1:', d + radius)

  let rings = [[], [1]],
    output
  for (let r = 2, i = 0; ; i++) {
    if (i === r * 4) {
      i = -1
      r++
      rings[r] = []
    }
  }
  console.log('part 2:', output)
}
