export default function (input) {
    let screen = Array(6).fill().map(r => Array(50).fill(0))

    for (let i of input) {
        if (i.startsWith('rect')) {
            const [xE, yE] = i.match(/\d+/g).map(Number)
            for (let y = 0; y < yE; y++) {
                for (let x = 0; x < xE; x++) {
                    screen[y][x] = 1
                }
            }
        } else if (i.startsWith('rotate row')) {
            const [y, amount] = i.match(/\d+/g).map(Number)
            screen[y] = screen[y].slice(50 - amount).concat(screen[y].slice(0, 50 - amount))
        } else if (i.startsWith('rotate column')) {
            const [x, amount] = i.match(/\d+/g).map(Number)
            let copy = screen.map(r => r[x])
            for (let y = 0; y < 6; y++) {
                screen[y][x] = copy[(y - amount + 6) % 6]
            }
        }
    }
    console.log('Part 1:', screen.map(r => r.filter(x => x === 1).length).reduce((a, b) => a + b))
    console.log('Part 2:')
    screen.forEach(row => console.log(row.map(x => x === 1 ? '#' : ' ').join('')))
}
