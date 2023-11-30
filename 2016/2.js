export default function (input) {
    const keypad = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    let x = 1, y = 1, pin = ''
    for (let i of input) {
        for (let j of i) {
            if (j === 'R') x = Math.min(2, x + 1)
            if (j === 'L') x = Math.max(0, x - 1)
            if (j === 'D') y = Math.min(2, y + 1)
            if (j === 'U') y = Math.max(0, y - 1)
        }
        pin += keypad[y][x]
    }
    console.log('Part 1:', pin)

    const keypad2 = [
        [null, null, 1, null, null],
        [null, 2, 3, 4, null],
        [5, 6, 7, 8, 9],
        [null, 'A', 'B', 'C', null],
        [null, null, 'D', null, null]
    ]
    x = 0, y = 2, pin = ''
    for (let i of input) {
        for (let j of i) {
            if (j === 'R' && keypad2[y][x + 1]) x++
            if (j === 'L' && keypad2[y][x - 1]) x--
            if (j === 'D' && keypad2[y + 1] && keypad2[y + 1][x]) y++
            if (j === 'U' && keypad2[y - 1] && keypad2[y - 1][x]) y--
        }
        pin += keypad2[y][x]
    }
    console.log('Part 2:', pin)
}
