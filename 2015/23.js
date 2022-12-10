export default function (input) {
    const runProgram = registers => {
        for (let i = 0; i < input.length; i++) {
            const [_, op, arg1, arg2] = input[i].match(/^(\w+) ([ab+-\d]+)(?:, ([+-\d]+))?$/)
            if (op === 'hlf') {
                registers[arg1] /= 2
            } else if (op === 'tpl') {
                registers[arg1] *= 3
            } else if (op === 'inc') {
                registers[arg1] += 1
            } else if (op === 'jmp') {
                i += arg1/1 - 1
            } else if (op === 'jie' && registers[arg1] % 2 === 0) {
                i += arg2/1 - 1
            } else if (op === 'jio' && registers[arg1] === 1) {
                i += arg2/1 - 1
            }
        }
    }

    let registers = { a: 0, b: 0 }
    runProgram(registers)
    console.log('Part 1:', registers.b)

    registers = {a: 1, b: 0}
    runProgram(registers)
    console.log('Part 2:', registers.b)
}
