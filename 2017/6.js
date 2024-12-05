export default function (input) {
  input = input[0].split(/\s+/).map(Number)

  let cache = {}
  let bank = input.slice()
  let steps = 0
  let cycle
  while (true) {
    const hash = bank.join('')
    if (cache[hash] !== undefined) {
      cycle = steps - cache[hash]
      break
    }
    cache[hash] = steps

    let maxValue = 0,
      maxIndex
    for (let i = 0; i < bank.length; i++) {
      if (bank[i] > maxValue) {
        maxValue = bank[i]
        maxIndex = i
      }
    }

    bank[maxIndex] = 0
    for (let v = 0; v < maxValue; v++) {
      bank[(maxIndex + v + 1) % bank.length]++
    }

    steps++
  }

  console.log('part 1:', steps)
  console.log('part 2:', cycle)
}
