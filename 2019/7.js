import { runPipedProgram, runProgram } from "./5.js"

function thrusterOutput(program, phases) {
    let state = { program: program.slice(), output: [0] }
    for (let p of phases) {
        state = runProgram(state.program, [p, state.output[0]])
    }
    return state.output[0]
}

export default function(input) {
    const program = input[0].split(',').map(c => Number(c))
    let phases = [4,3,2,1,0]
    let max = 0
    for (let A of phases) {
        for (let B of phases) {
            for (let C of phases) {
                for (let D of phases) {
                    for (let E of phases) {
                        if ((2**A + 2**B + 2**C + 2**D + 2**E) !== 31) continue

                        const output = thrusterOutput(program, [A, B, C, D, E])
                        if (output > max) {
                            max = output
                        }
                    }
                }
            }
        }
    }
    console.log('Part 1:', max)

    phases = [9,8,7,6,5]
    max = 0
    for (let A of phases) {
        for (let B of phases) {
            for (let C of phases) {
                for (let D of phases) {
                    for (let E of phases) {
                        if ((2**A + 2**B + 2**C + 2**D + 2**E) !== 992) continue

                        const parallelOutput = runPipedProgram(program, [[A, 0],[B],[C],[D],[E]])
                        const output = parallelOutput.slice(-1)[0].output.slice(-1)[0]
                        if (output > max) {
                            max = output
                        }
                    }
                }
            }
        }
    }
    console.log('Part 2:', max)
}
