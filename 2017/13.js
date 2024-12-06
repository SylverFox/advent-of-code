export default function (input) {
  input = input.map((i) => i.split(': ').map(Number))

  const collision = (time, range) => time % ((range - 1) * 2) === 0

  const output = input
    .filter((i) => collision(...i))
    .reduce((a, v) => a + v[0] * v[1], 0)

  console.log('part 1:', output)

  let delay = 1
  for (; ; delay++) {
    const hasCollision = input.some((i) => collision(i[0] + delay, i[1]))
    if (!hasCollision) {
      break
    }
  }

  console.log('part 2:', delay)
}
