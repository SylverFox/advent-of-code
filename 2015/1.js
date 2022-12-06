export default function (input) {
    input = input[0]
    console.log('Part 1:', input.match(/\(/g).length - input.match(/\)/g).length)

    let depth = 0
    for (let i = 0; i < input.length; i++) {
        depth += input[i] === '(' ? 1 : -1
        if (depth === -1) {
            console.log('Part 2:', i + 1)
            break
        }
    }
}
