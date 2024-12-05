export default function (input) {
  let instructions = input.map(Number)
  let i = 0
  let steps = 0
  while (true) {
    const jump = instructions[i]
    instructions[i]++
    i += jump
    steps++
    if (i < 0 || i >= instructions.length) {
      break
    }
  }
  console.log('part 1:', steps)

  instructions = input.map(Number)
  i = 0
  steps = 0
  while (true) {
    const jump = instructions[i]
    instructions[i] += jump >= 3 ? -1 : 1
    i += jump
    steps++
    if (i < 0 || i >= instructions.length) {
      break
    }
  }
  console.log('part 2:', steps)
}
