export default function (input) {
  const runProgram = (input, registers) => {
    let flipflop,
      out = 0
    for (let i = 0; i < input.length; i++) {
      const [_, op, arg1, arg2] = input[i].match(
        /(\w+) ([-\w]+)(?:\s([-\w]+))?/
      )
      if (op === 'cpy') {
        registers[arg2] = isNaN(arg1 / 1) ? registers[arg1] : arg1 / 1
      } else if (op === 'inc') {
        registers[arg1]++
      } else if (op === 'dec') {
        registers[arg1]--
      } else if (op === 'jnz') {
        if (isNaN(arg1 / 1) ? registers[arg1] !== 0 : arg1 / 1 !== 0) {
          i += arg2 / 1 - 1
        }
      } else if (op === 'out') {
        if (registers[arg1] === flipflop) return false
        flipflop = registers[arg1]
        out++
      }
      if (out >= 1000) return true
    }
  }

  let a = 0
  while (true) {
    let registers = { a: ++a, b: 0, c: 0, d: 0 }
    if (runProgram(input, registers)) break
  }
  console.log('part 1:', a)
}
