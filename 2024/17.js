export default function (input) {
  let registers = {}
  let i
  for (i = 0; input[i] !== ''; i++) {
    const [_, reg, val] = input[i].match(/^Register (\w): (\d+)$/)
    registers[reg] = val / 1
  }
  const program = input[++i].slice(9).split(',').map(Number)

  const runProgram = (registers, program) => {
    let output = []
    for (let p = 0; p < program.length; p += 2) {
      let param = program[p + 1]
      if (param >= 4 && param <= 6) {
        param = registers[String.fromCharCode(param + 61)]
      }

      if (program[p] === 0) {
        registers.A = registers.A >>> param
      } else if (program[p] === 1) {
        registers.B ^= program[p + 1]
      } else if (program[p] === 2) {
        registers.B = param % 8
      } else if (program[p] === 3) {
        if (registers.A !== 0) {
          p = program[p + 1] - 2
        }
      } else if (program[p] === 4) {
        registers.B ^= registers.C
      } else if (program[p] === 5) {
        output.push(param % 8)
      } else if (program[p] === 6) {
        registers.B = registers.A >>> param
      } else if (program[p] === 7) {
        registers.C = registers.A >>> param
      }
    }
    return output
  }

  let output = runProgram(structuredClone(registers), program)
  console.log('part 1:', output.join(','))

  const stepOutput = (A) => {
    const B = A % 8n ^ 5n
    const C = A >> B
    return (B ^ C ^ 6n) % 8n
  }

  const findSolution = (p = program.length - 1, A = 0n) => {
    if (p === -1) return A

    for (let i = 0n; i < 8n; i++) {
      if (stepOutput((A << 3n) + i) == program[p]) {
        const solution = findSolution(p - 1, (A << 3n) + i)
        if (solution !== false) {
          return solution
        }
      }
    }
    return false
  }

  const A = findSolution()
  console.log('part 2:', Number(A))
}
