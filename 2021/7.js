export default function (input) {
  input = input[0].split(',').map(Number)
  input.sort((a, b) => a - b)
  let median
  if (input.length % 2) {
    median = input[(input.length - 1) / 2]
  } else {
    const middle = input.slice(input.length / 2 - 1, input.length / 2 + 1)
    median = (middle[0] + middle[1]) / 2
  }

  const fuel = input.map((i) => Math.abs(i - median)).reduce((a, b) => a + b)
  console.log('Part 1:', fuel)

  let minFuel = Number.MAX_SAFE_INTEGER
  const maxPos = input[input.length - 1]
  for (let i = 0; i <= maxPos; i++) {
    const cost = input
      .map((x) => Math.abs(x - i))
      .map((x) => (x * (x + 1)) / 2)
      .reduce((a, b) => a + b)
    minFuel = Math.min(cost, minFuel)
  }

  console.log('Part 2:', minFuel)
}
