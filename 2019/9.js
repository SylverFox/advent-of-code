import { runProgram } from './5.js'

export default function (input) {
  const program = input[0].split(',').map(Number)
  let state = runProgram(program, [1])
  console.log('Part 1:', state.output[0])
  state = runProgram(program, [2])
  console.log('Part 2:', state.output[0])
}
