const OP = {
    SUM: 1,
    MULT: 2,
    EXIT: 99
}

function runProgram(input) {
    const program = input.slice()
    for (let i = 0; i < program.length; i += 4) {
        if (program[i] === OP.EXIT) {
            break
        } else if (program[i] === OP.SUM) {
            program[program[i + 3]] = program[program[i + 1]] + program[program[i + 2]]
        } else if (program[i] === OP.MULT) {
            program[program[i + 3]] = program[program[i + 1]] * program[program[i + 2]]
        }
    }
    return program
}

export default function(input) {
    const program = input[0].split(',').map(c => Number(c))
    program[1] = 12
    program[2] = 2
    const output = runProgram(program)
    console.log('Part 1:', output[0])

    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            program[1] = i
            program[2] = j
            if (runProgram(program)[0] === 19690720) {
                console.log('Part 2:', 100 * i + j)
                break
            }
        }
    }
}

