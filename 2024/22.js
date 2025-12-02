export default function (input) {
  const next = (num) => {
    let output = ((num << 6n) ^ num) % (1n << 24n)
    output = ((output >> 5n) ^ output) % (1n << 24n)
    output = ((output << 11n) ^ output) % (1n << 24n)
    return output
  }

  const generate = (num, rounds) => {
    let secret = BigInt(num)
    for (let r = 0; r < rounds; r++) {
      secret = next(secret)
    }
    return Number(secret)
  }
  let output = input.map((i) => generate(i, 2000)).sum()
  console.log('part 1:', output)

  let buyerSequences = []
  for (let i of input) {
    let secret = BigInt(i)
    let prices = [Number(secret % 10n)]
    for (let r = 0; r < 2000; r++) {
      secret = next(secret)
      prices.push(Number(secret % 10n))
    }
    buyerSequences.push(prices)
  }

  let sequenceSums = {}
  for (let bs of buyerSequences) {
    let buyerSequenceSums = {}
    for (let s = 0; s <= bs.length - 5; s++) {
      const sequence = bs
        .slice(s, s + 5)
        .map((s, i, a) => (i === 0 ? null : s - a[i - 1]))
        .slice(1)
        .join(',')
      const price = bs[s + 4]

      if (!buyerSequenceSums[sequence]) {
        buyerSequenceSums[sequence] = price
      }
    }

    for (let seq of Object.keys(buyerSequenceSums)) {
      sequenceSums[seq] = (sequenceSums[seq] ?? 0) + buyerSequenceSums[seq]
    }
  }
  output = Math.max(...Object.values(sequenceSums))
  console.log('part 2:', output)
}
