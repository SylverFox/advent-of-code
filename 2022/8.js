export default function (input) {
    input = input.map(i => i.split('').map(Number))
    const WIDTH = input[0].length
    const HEIGHT = input.length

    const check = (x, y) => {
        const val = input[y][x]
        const left = input[y].slice(0, x).every(t => t < val)
        const right = input[y].slice(x + 1).every(t => t < val)
        const up = input.map(rows => rows[x]).slice(0, y).every(t => t < val)
        const down = input.map(rows => rows[x]).slice(y + 1).every(t => t < val)
        return left || right || up || down
    }

    let output = HEIGHT * 2 + WIDTH * 2 - 4
    for (let y = 1; y < HEIGHT - 1; y++) {
        for (let x = 1; x < WIDTH -1; x++) {
            if (check(x, y)) output++
        }
    }
    console.log('Part 1:', output)

    const lenUntilBlock = (trees, max) => ((trees.findIndex(t => t >= max) + 1) || trees.length)

    const score = (x, y) => {
        const val = input[y][x]
        const left = lenUntilBlock(input[y].slice(0, x).reverse(), val)
        const right = lenUntilBlock(input[y].slice(x + 1), val)
        const up = lenUntilBlock(input.map(rows => rows[x]).slice(0, y).reverse(), val)
        const down = lenUntilBlock(input.map(rows => rows[x]).slice(y + 1), val)
        return left * right * up * down
    }
    output = 0
    for (let y = 1; y < HEIGHT - 1; y++) {
        for (let x = 1; x < WIDTH - 1; x++) {
            console.log(x, y, score(x,y))
            output = Math.max(output, score(x, y))
        }
    }
    console.log('Part 2:', output)
}