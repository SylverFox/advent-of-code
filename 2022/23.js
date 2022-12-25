export default function (input) {
    let elves = []
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[0].length; x++) {
            if (input[y][x] === '#') {
                elves.push({x, y})
            }
        }
    }

    const DIRECTIONS = [
        [{x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1}],
        [{x: -1, y: 1}, {x: 0, y: 1}, {x: 1, y: 1}],
        [{x: -1, y: -1}, {x: -1, y: 0}, {x: -1, y: 1}],
        [{x: 1, y: -1}, {x: 1, y: 0}, {x: 1, y: 1}],
    ]

    const printElves = elves => {
        const [xmin, xmax, ymin, ymax] = elves.reduce((a,e) => [
            Math.min(a[0], e.x),
            Math.max(a[1], e.x),
            Math.min(a[2], e.y),
            Math.max(a[3], e.y),
        ], [Infinity, -Infinity, Infinity, -Infinity])
        let map = []
        for (let y = ymin; y <= ymax; y++) {
            map[y] = []
            for (let x = xmin; x <= xmax; x++) {
                map[y][x] = '.'
            }
        }
        elves.forEach(e => map[e.y][e.x] = '#')
        console.log('elves:')
        map.forEach(row => console.log(row.join(' ')))
        console.log()
    }

    const countGround = elves => {
        const [xmin, xmax, ymin, ymax] = elves.reduce((a,e) => [
            Math.min(a[0], e.x),
            Math.max(a[1], e.x),
            Math.min(a[2], e.y),
            Math.max(a[3], e.y),
        ], [Infinity, -Infinity, Infinity, -Infinity])
        return (xmax - xmin + 1) * (ymax - ymin + 1) - elves.length
    }

    const doRound = (elves, round) => {
        let newPositions = []
        for (let e = 0; e < elves.length; e++) {
            let possiblePositions = []
            for (let i = 0, d = round % 4; i < 4; i++, d = (d + 1) % 4) {
                const freePos = DIRECTIONS[d]
                    .map(d => ({x: d.x + elves[e].x, y: d.y + elves[e].y}))
                    .every(d => !elves.some(e => e.x === d.x && e.y === d.y))
                if (freePos) {
                    possiblePositions.push({
                        x: elves[e].x + (d === 2 ? -1 : d === 3 ? 1 : 0),
                        y: elves[e].y + (d === 0 ? -1 : d === 1 ? 1 : 0),
                    })
                }
            }
            if (possiblePositions.length === 4 || possiblePositions.length === 0) {
                newPositions.push(elves[e])
            } else {
                newPositions.push(possiblePositions[0])
            }
        }
        for (let e = 0; e < elves.length; e++) {
            const duplicate = newPositions.find((p, i) => i !== e && p.x === newPositions[e].x && p.y === newPositions[e].y)
            if (!duplicate) {
                elves[e] = newPositions[e]
            }
        }
        // printElves(elves)
        return elves
    }


    for (let round = 0; round < 10; round++) {
        elves = doRound(elves, round)
    }

    console.log('Part 1:', countGround(elves))

    let output
    for (let round = 10; !output; round++) {
        const previous = JSON.stringify(elves)
        elves = doRound(elves, round)
        if (previous === JSON.stringify(elves)) {
            output = round + 1
        }
    }

    console.log('Part 2:', output)
}
