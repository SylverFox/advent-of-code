export default function (input) {
    input = input[0].split('')

    const WIDTH = 7
    const SHAPES = [
        {name: '-', width: 4, height: 1},
        {name: '+', width: 3, height: 3},
        {name: 'l', width: 3, height: 3},
        {name: '|', width: 1, height: 4},
        {name: 'o', width: 2, height: 2}
    ]

    let map = []

    const collision = (shape, x, y) => {
        if (shape.name === '-') {
            return map[y] && (map[y][x] || map[y][x+1] || map[y][x+2] || map[y][x+3])
        } else if (shape.name === '+') {
            return map[y] && map[y][x+1] ||
                map[y-1] && (map[y-1][x] || map[y-1][x+1] || map[y-1][x+2]) || 
                map[y-2] && map[y-2][x+1]
        } else if (shape.name === 'l') {
            return map[y] && map[y][x+2] ||
                map[y-1] && map[y-1][x+2] ||
                map[y-2] && (map[y-2][x] || map[y-2][x+1] || map[y-2][x+2])
        } else if (shape.name === '|') {
            return map[y] && map[y][x] || map[y-1] && map[y-1][x] ||
                map[y-2] && map[y-2][x] || map[y-3] && map[y-3][x]
        } else if (shape.name === 'o') {
            return map[y] && (map[y][x] || map[y][x+1]) ||
                map[y-1] && (map[y-1][x] || map[y-1][x+1])
        }
    }

    const placeShape = (shape, x, y) => {
        map[y] = map[y] || []
        if (shape.name === '-') {
            map[y][x] = '-'
            map[y][x+1] = '-'
            map[y][x+2] = '-'
            map[y][x+3] = '-'
        } else if (shape.name === '+') {
            map[y][x+1] = '+'
            map[y-1] = map[y-1] || []
            map[y-1][x] = '+'
            map[y-1][x+1] = '+'
            map[y-1][x+2] = '+'
            map[y-2] = map[y+2] || []
            map[y-2][x+1] = '+'
        } else if (shape.name === 'l') {
            map[y][x+2] = '#'
            map[y-1] = map[y-1] || []
            map[y-1][x+2] = '#'
            map[y-2] = map[y-2] || []
            map[y-2][x] = '#'
            map[y-2][x+1] = '#'
            map[y-2][x+2] = '#'
        } else if (shape.name === '|') {
            map[y][x] = '|'
            map[y-1] = map[y-1] || []
            map[y-1][x] = '|'
            map[y-2] = map[y-2] || []
            map[y-2][x] = '|'
            map[y-3] = map[y-3] || []
            map[y-3][x] = '|'
        } else if (shape.name === 'o') {
            map[y][x] = 'o'
            map[y][x+1] = 'o'
            map[y-1] = map[y-1] || []
            map[y-1][x] = 'o'
            map[y-1][x+1] = 'o'
        }
    }


    let blockY = 3, blockX = 2, jet = 0, shape = 0, placed = 0
    while (true) {
        // MOVE
        if (
            input[jet] === '>' &&
            blockX + SHAPES[shape].width < WIDTH &&
            !collision(SHAPES[shape], blockX + 1, blockY)
        ) {
            blockX += 1
        } else if (
            input[jet] === '<' &&
            blockX > 0 &&
            !collision(SHAPES[shape], blockX - 1, blockY)
        ) {
            blockX -= 1
        }

        // FALL
        if ((blockY - SHAPES[shape].height + 1) > 0 && !collision(SHAPES[shape], blockX, blockY - 1)) {
            blockY -= 1
        } else {
            placeShape(SHAPES[shape], blockX, blockY)
            shape = (shape + 1) % SHAPES.length
            blockX = 2
            blockY = map.length + SHAPES[shape].height + 2
            if (++placed === 2022) {
                placeShape(SHAPES[shape], blockX, blockY)
                console.log(input[jet])
                break
            }
        }

        jet = (jet + 1) % input.length
    }

    for (let y = map.length - 1; y >= 0; y--) {
        process.stdout.write('|')
        if (!map[y]) {
            process.stdout.write(' '.repeat(WIDTH))
        } else {
            for (let x = 0; x < WIDTH; x++) {
                process.stdout.write(map[y][x] ?? ' ')
            }
        }
        process.stdout.write('|\n')
    }
    console.log('+-------+')

    console.log('Part 1:', map.length)
}
