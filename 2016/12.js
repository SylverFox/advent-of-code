export default function (input) {
    let registers = { a: 0, b: 0, c: 0, d: 0 }
    for (let i = 0; i < input.length; i++) {
        const [_, op, arg1, arg2] = input[i].match(/(\w+) ([-\w]+)(?:\s([-\w]+))?/)
        if (op === 'cpy') {
            registers[arg2] = isNaN(arg1 / 1) ? registers[arg1] : arg1/1
        } else if (op === 'inc') {
            registers[arg1]++
        } else if (op === 'dec') {
            registers[arg1]--
        } else if (op === 'jnz') {
            if (isNaN(arg1 / 1) ? registers[arg1] !== 0 : arg1/1 !== 0) {
                i += arg2/1 - 1
            }
        }
    }
    console.log('Part 1:', registers.a)

    registers = { a: 0, b: 0, c: 1, d: 0 }
    for (let i = 0; i < input.length; i++) {
        const [_, op, arg1, arg2] = input[i].match(/(\w+) ([-\w]+)(?:\s([-\w]+))?/)
        if (op === 'cpy') {
            registers[arg2] = isNaN(arg1 / 1) ? registers[arg1] : arg1/1
        } else if (op === 'inc') {
            registers[arg1]++
        } else if (op === 'dec') {
            registers[arg1]--
        } else if (op === 'jnz') {
            if (isNaN(arg1 / 1) ? registers[arg1] !== 0 : arg1/1 !== 0) {
                i += arg2/1 - 1
            }
        }
    }
    console.log('Part 2:', registers.a)
}
