export default function (input) {
  input = input.map(Number)
  console.log('part 1:', input.sum())

  let frequencies = [0]
  let frequency = 0
  let i = 0
  while (true) {
    frequency += input[i++ % input.length]
    if (frequencies.includes(frequency)) break
    frequencies.push(frequency)
  }
  console.log('part 2:', frequency)
}
