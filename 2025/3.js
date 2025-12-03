function solve(input, size) {
  let power = 0
  for (const bank of input) {
    let lastBat = -1
    let batPower = ''
    for (let b = 0; b < size; b++) {
      let max = 0
      let index = 0
      for (let i = lastBat + 1; i <= bank.length - size + b; i++) {
        if (Number(bank[i]) > max) {
          max = bank[i]
          index = i
        }
      }
      batPower += max
      lastBat = index
    }
    power += Number(batPower)
  }
  return power
}

export default function (input) {
  console.log('part 1:', solve(input, 2))
  console.log('part 2:', solve(input, 12))
}
