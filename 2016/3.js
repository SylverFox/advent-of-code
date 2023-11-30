export default function (input) {
    input = input.map(i => i.trim().split(/\s+/).map(Number))
    let output = 0
    for (let i of input) {
        const t = i.slice().sort((a,b) => a-b)
        if (t[0] + t[1] > t[2]) output++
    }
    console.log('Part 1:', output)

    output = 0
    for (let i = 0; i < input.length; i += 3) {
        for (let j = 0; j < 3; j++) {
            const t = [input[i][j], input[i + 1][j], input[i + 2][j]].sort((a,b) => a-b)
            if (t[0] + t[1] > t[2]) output++
        }
    }
    console.log('Part 2:', output)
}
