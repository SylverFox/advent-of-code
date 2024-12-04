export default function (input) {
  input = input[0]

  let houses = []
  for (let i = 1; i <= input / 10; i++) {
    for (let j = i; j <= input / 10; j += i) {
      houses[j] = (houses[j] || 0) + i * 10
    }
  }
  for (let h = 0; h < input; h++) {
    if (houses[h] >= input) {
      console.log('Part 1:', h)
      break
    }
  }

  houses = []
  for (let i = 1; i <= input / 11; i++) {
    for (let j = i, c = 0; j <= input / 11 && c < 50; j += i, c++) {
      houses[j] = (houses[j] || 0) + i * 11
    }
  }
  for (let h = 0; h < input; h++) {
    if (houses[h] >= input) {
      console.log('Part 2:', h)
      break
    }
  }
}
