export default function (input) {
    let grid = Array(1000).fill().map(x => Array(1000).fill(0))

    const parse = (_, op, x1, y1, x2, y2) => {
        for (let y = y1/1; y <= y2/1; y++) {
            for (let x = x1/1; x <= x2/1; x++) {
                if (op === 'toggle') {
                    grid[y][x] = grid[y][x] === 1 ? 0 : 1
                } else {
                    grid[y][x] = op === 'turn on' ? 1 : 0
                }
                
            }
        }
    }

    for (let i of input) {
        parse(...i.match(/(.*) (\d+),(\d+) through (\d+),(\d+)/))
    }
    let output = grid.map(row => row.reduce((a,b) => a + b)).reduce((a,b) => a + b)
    console.log('Part 1:', output)

    grid = Array(1000).fill().map(x => Array(1000).fill(0))

    const parse2 = (_, op, x1, y1, x2, y2) => {
        for (let y = y1/1; y <= y2/1; y++) {
            for (let x = x1/1; x <= x2/1; x++) {
                if (op === 'toggle') {
                    grid[y][x] += 2
                } else if (op === 'turn on') {
                    grid[y][x] += 1
                } else if (grid[y][x] > 0) {
                    grid[y][x] += -1
                }
            }
        }
    }

    for (let i of input) {
        parse2(...i.match(/(.*) (\d+),(\d+) through (\d+),(\d+)/))
    }
    output = grid.map(row => row.reduce((a,b) => a + b)).reduce((a,b) => a + b)
    console.log('Part 1:', output)
}
