export default function (input) {
  let instructions = input
    .map((i) => i.match(/(\w+) ([-\w]+)(?:\s([-\w]+))?/))
    .map((i) => ({ op: i[1], arg1: i[2], arg2: i[3] }))

  const runProgram = (instructions, a) => {
    let registers = { a, b: 0, c: 0, d: 0 }
    const getVal = (arg) => (isNaN(arg / 1) ? registers[arg] : arg / 1)
    const toggle = (i) => {
      if (i >= instructions.length) return
      const { op, arg2 } = instructions[i]
      console.log('toggling', instructions[i])
      if (arg2) {
        if (op === 'jnz') {
          instructions[i].op = isNaN(arg2 / 1) ? 'cpy' : 'noop'
        } else {
          instructions[i].op = 'jnz'
        }
      } else {
        if (op === 'inc') {
          instructions[i].op = 'dec'
        } else {
          instructions[i].op = 'inc'
        }
      }
    }

    for (let i = 0; i < instructions.length; i++) {
      const { op, arg1, arg2 } = instructions[i]
      if (op === 'cpy') {
        registers[arg2] = getVal(arg1)
      } else if (op === 'inc') {
        registers[arg1]++
      } else if (op === 'dec') {
        registers[arg1]--
      } else if (op === 'jnz') {
        if (getVal(arg1) !== 0) i += getVal(arg2) - 1
      } else if (op === 'tgl') {
        toggle(getVal(arg1) + i, instructions)
      }
    }
    return registers.a
  }

  console.log('part 1:', runProgram(instructions, 7))

  const factorial = (n) => (n == 0 || n == 1 ? 1 : factorial(n - 1) * n)
  const output = input[19].match(/\d+/) * input[20].match(/\d+/) + factorial(12)
  console.log('part 2:', output)
}
