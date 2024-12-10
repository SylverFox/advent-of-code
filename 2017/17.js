export default function (input) {
  input = Number(input[0])

  let buffer = [0],
    index = 0
  for (let i = 1; i <= 2017; i++) {
    index = ((index + input) % buffer.length) + 1
    buffer.splice(index, 0, i)
  }
  let output = buffer[buffer.indexOf(2017) + 1]
  console.log('part 1:', output)

  let bufferSize = 1
  index = 0
  for (let i = 1; i <= 50_000_000; i++) {
    index = ((index + input) % bufferSize) + 1
    bufferSize++
    if (index === 1) output = i
  }
  console.log('part 2:', output)
}
