export default function (input) {
  input = input.map((i) => i.match(/\d+/)).map(Number)

  const factors = [16807, 48271]

  let generators = input.slice()
  let output = 0
  for (let i = 0; i < 40_000_000; i++) {
    generators = generators.map((x, i) => (x * factors[i]) % (2 ** 31 - 1))
    const pairs = generators.map((i) =>
      i.toString(2).padStart(16, '0').slice(-16)
    )
    if (pairs[0] === pairs[1]) {
      output++
    }
  }
  console.log('part 1:', output)

  generators = input.slice()
  output = 0
  for (let i = 0; i < 5_000_000; i++) {
    do {
      generators[0] = (generators[0] * factors[0]) % (2 ** 31 - 1)
    } while (generators[0] % 4 !== 0)
    do {
      generators[1] = (generators[1] * factors[1]) % (2 ** 31 - 1)
    } while (generators[1] % 8 !== 0)
    const pairs = generators.map((i) =>
      i.toString(2).padStart(16, '0').slice(-16)
    )
    if (pairs[0] === pairs[1]) {
      output++
    }
  }
  console.log('part 2:', output)
}
