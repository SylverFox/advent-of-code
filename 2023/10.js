export default function (input) {
    input = input.map(i => i.split(''))

    const HEIGHT = input.length
    const WIDTH = input[0].length

    // top right bottom left
    const EXITS = []
    EXITS[0b0000] = '.'
    EXITS[0b1010] = '|'
    EXITS[0b0101] = '-'
    EXITS[0b1100] = 'L'
    EXITS[0b1001] = 'J'
    EXITS[0b0011] = '7'
    EXITS[0b0110] = 'F'
    
    const getReachableNeighbours = ({x, y}) => {
        const exits = EXITS.indexOf(input[y][x])
        let neighbours = []
        // top
        if (y > 0 && (exits & 0b1000) > 0 && (EXITS.indexOf(input[y-1][x]) & 0b0010) > 0) {
            neighbours.push({x, y: y - 1})
        }
        // right
        if (x < WIDTH - 1 && (exits & 0b0100) > 0 && (EXITS.indexOf(input[y][x+1]) & 0b0001) > 0) {
            neighbours.push({x: x + 1, y})
        }
        // bottom
        if (y < HEIGHT - 1 && (exits & 0b0010) > 0 && (EXITS.indexOf(input[y+1][x]) & 0b1000) > 0) {
            neighbours.push({x, y: y + 1})
        }
        // left
        if (x > 0 && (exits & 0b0001) > 0 && (EXITS.indexOf(input[y][x-1]) & 0b0100) > 0) {
            neighbours.push({x: x - 1, y})
        }

        return neighbours
    }

    // Find starting position
    let y = 0, x = 0
    search: for (y = 0; y < HEIGHT; y++) {
        for (x = 0; x < WIDTH; x++) {
            if (input[y][x] === 'S') break search
        }
    }

    // Replace start with correct symbol
    const t = (Math.max(0, EXITS.indexOf(input[y-1][x])) & 0b0010) > 0
    const r = (Math.max(0, EXITS.indexOf(input[y][x+1])) & 0b0001) > 0
    const b = (Math.max(0, EXITS.indexOf(input[y+1][x])) & 0b1000) > 0
    const l = (Math.max(0, EXITS.indexOf(input[y][x-1])) & 0b0100) > 0
    const S = EXITS[t << 3 | r << 2 | b << 1 | l]
    input[y][x] = S


    // Dijkstra over the graph
    let nodes = [{x, y}], visited = [`${x}.${y}`], d = 0
    while (nodes.length) {
        let newNodes = []

        while (nodes.length) {
            const next = nodes.pop()
            const neighbours = getReachableNeighbours(next)
                .filter(n => !visited.includes(`${n.x}.${n.y}`))

            if (neighbours.length) {
                visited.push(`${neighbours[0].x}.${neighbours[0].y}`)
                newNodes.push(neighbours[0])
            }
        }

        nodes = newNodes
        d++
    }

    console.log('part 1:', d / 2)

    // Draw the loop on new map
    let map = [...Array(HEIGHT)].map(() => Array(WIDTH).fill('.'))
    for (let v of visited) {
        const [x, y] = v.split('.').map(Number)
        map[y][x] = 'X'
    }

    // Find top left starting position
    search: for (y = 0; y < HEIGHT; y++) {
        for (x = 0; x < WIDTH; x++) {
            if (map[y][x] !== '.') {
                break search
            }
        }
    }
    const start = visited.indexOf(`${x}.${y}`)

    // Loop over the visited pipes and tag the left hand empty areas as insides
    let current = visited[start]
    let insides = []
    for (let v = 1; v <= visited.length; v++) {
        const next = visited[(start + v) % visited.length]
        const [curX, curY] = current.split('.').map(Number)
        const [nextX, nextY] = next.split('.').map(Number)
        if (nextY === curY - 1) {
            // direction = ^
            if (map[curY][curX - 1] === '.') {
                insides.push({x: curX - 1, y: curY})
            }
            if (input[curY][curX] === 'L' && map[curY + 1] && map[curY + 1][curX] === '.') {
                insides.push({x: curX, y: curY + 1})
            }
        } else if (nextX === curX + 1) {
            // direction = >
            if (map[curY - 1] && map[curY - 1][curX] === '.') {
                insides.push({x: curX, y: curY - 1})
            }
            if (input[curY][curX] === 'F' && map[curY][curX - 1] === '.') {
                insides.push({x: curX - 1, y: curY})
            }
        } else if (nextY === curY + 1) {
            // direction = v
            if (map[curY][curX + 1] === '.') {
                insides.push({x: curX + 1, y: curY})
            }
            if (input[curY][curX] === '7' && map[curY - 1] && map[curY - 1][curX] === '.') {
                insides.push({x: curX, y: curY - 1})
            }
        } else if (nextX === curX - 1) {
            // direction = <
            if (map[curY + 1] && map[curY + 1][curX] === '.') {
                insides.push({x: curX, y: curY + 1})
            }
            if (input[curY][curX] === 'J' && map[curY][curX + 1] === '.') {
                insides.push({x: curX + 1, y: curY})
            }
        }

        current = next
    }


    // Flood fill insides
    while (insides.length) {
        const next = insides.pop()
        map[next.y][next.x] = 'I'
        ;[
            {x: next.x, y: next.y - 1},
            {x: next.x + 1, y: next.y},
            {x: next.x, y: next.y + 1},
            {x: next.x - 1, y: next.y},
        ].filter(n => map[n.y][n.x] === '.')
            .forEach(n => insides.push(n))
    }

    const output = map.reduce((a,v) => a.concat(v), []).filter(c => c === 'I').length
    console.log('part 2:', output)
}
