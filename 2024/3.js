export default function (input) {
  let output = Array.from(
    input.join('').matchAll(/mul\((\d+),(\d+)\)/g)
  ).reduce((a, v) => a + (v[1] / 1) * (v[2] / 1), 0)
  console.log('part 1:', output)

  output = Array.from(
    input
      .join('')
      .replace(/don't\(\).*?(do\(\)|$)/g, '')
      .matchAll(/mul\((\d+),(\d+)\)/g)
  ).reduce((a, v) => a + (v[1] / 1) * (v[2] / 1), 0)
  console.log('part 2:', output)
}
