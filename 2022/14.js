export default function (input) {
    input = input.map(row => row.split(' -> ').map(c => c.split(',').map(Number)))

    for (let i = 0; i < input.length; i++) {
        let newInput = []
        for (let j = 1; j < input[i].length; j++) {
            const x1 = input[i][j - 1][0], x2 = input[i][j][0]
            const y1 = input[i][j - 1][1], y2 = input[i][j][1]
            for (let x = x1; x !== x2; x1 < x2 ? x++ : x--) {
                newInput.push([x, y2])
            }
            for (let y = y1; y !== y2; y1 < y2 ? y++ : y--) {
                newInput.push([x2, y])
            }
        }
        newInput.push(input[i].slice(-1)[0])
        input[i] = newInput
    }

    let xMin = Infinity, xMax = 0, yMin = 0, yMax = 0
    let map = []
    for (let [x, y] of input.reduce((a, b) => a.concat(b), [])) {
        if (x < xMin) xMin = x
        if (x > xMax) xMax = x
        if (y > yMax) yMax = y

        if (!map[y]) map[y] = []
        map[y][x] = '#'
    }
    for (let y = yMin; y <= yMax; y++) {
        if (!map[y]) map[y] = []
    }

    let sand = 0
    main: while (true) {
        let x = 500, y = 0
        while (true) {
            if (!map[y + 1][x]) {
                y++
            } else if (!map[y + 1][x - 1]) {
                y++
                x--
            } else if (!map[y + 1][x + 1]) {
                y++
                x++
            } else {
                map[y][x] = 'o'
                sand++
                break
            }
            if (y === yMax) {
                break main
            }
        }
    }
    console.log('Part 1:', sand)

    map[++yMax] = []
    map[++yMax] = []
    xMin = 500 - yMax
    xMax = 500 + yMax
    for (let x = xMin; x <= xMax; x++) {
        map[yMax][x] = '#'
    }

    main: while (true) {
        let x = 500, y = 0
        while (true) {
            if (!map[y + 1][x]) {
                y++
            } else if (!map[y + 1][x - 1]) {
                y++
                x--
            } else if (!map[y + 1][x + 1]) {
                y++
                x++
            } else if (x === 500 && y === 0) {
                break main
            } else {
                map[y][x] = 'o'
                sand++
                break
            }
        }
    }
    console.log('Part 2:', sand + 1)
}
