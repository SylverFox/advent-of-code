export default function (input) {
    const HEIGHT = input.length
    const WIDTH = input[0].length
    let map = [...Array(HEIGHT)].map(() => Array(WIDTH).fill('.'))
    
    const followBeam = (x, y, d) => {
        let visited = [], beams = [{x, y, d}]
        while (beams.length) {
            const {x, y, d} = beams.pop()

            if (x < 0 || y < 0 || x >= WIDTH || y >= HEIGHT) continue
            if (visited.includes(`${x},${y},${d}`)) continue

            visited.push(`${x},${y},${d}`)

            if (input[y][x] === '.') {
                map[y][x] = d
                if (d === '>') {
                    beams.push({x: x + 1, y, d: '>'})
                } else if (d === 'v') {
                    beams.push({x, y: y + 1, d: 'v'})
                } else if (d === '<') {
                    beams.push({x: x - 1, y, d: '<'})
                } else if (d === '^') {
                    beams.push({x, y: y - 1, d: '^'})
                }
            } else if (input[y][x] === '/') {
                map[y][x] = input[y][x]
                if (d === '>') {
                    beams.push({x, y: y - 1, d: '^'})
                } else if (d === 'v') {
                    beams.push({x: x - 1, y, d: '<'})
                } else if (d === '<') {
                    beams.push({x, y: y + 1, d: 'v'})
                } else if (d === '^') {
                    beams.push({x: x + 1, y, d: '>'})
                }
            } else if (input[y][x] === '\\') {
                map[y][x] = input[y][x]
                if (d === '>') {
                    beams.push({x, y: y + 1, d: 'v'})
                } else if (d === 'v') {
                    beams.push({x: x + 1, y, d: '>'})
                } else if (d === '<') {
                    beams.push({x, y: y - 1, d: '^'})
                } else if (d === '^') {
                    beams.push({x: x - 1, y, d: '<'})
                }
            } else if (input[y][x] === '|') {
                map[y][x] = input[y][x]
                if (['>', '<'].includes(d)) {
                    beams.push({x, y: y - 1, d: '^'})
                    beams.push({x, y: y + 1, d: 'v'})
                } else {
                    if (d === '>') {
                        beams.push({x: x + 1, y, d: '>'})
                    } else if (d === 'v') {
                        beams.push({x, y: y + 1, d: 'v'})
                    } else if (d === '<') {
                        beams.push({x: x - 1, y, d: '<'})
                    } else if (d === '^') {
                        beams.push({x, y: y - 1, d: '^'})
                    }
                }
            } else if (input[y][x] === '-') {
                map[y][x] = input[y][x]
                if (['^', 'v'].includes(d)) {
                    beams.push({x: x - 1, y, d: '<'})
                    beams.push({x: x + 1, y, d: '>'})
                } else {
                    if (d === '>') {
                        beams.push({x: x + 1, y, d: '>'})
                    } else if (d === 'v') {
                        beams.push({x, y: y + 1, d: 'v'})
                    } else if (d === '<') {
                        beams.push({x: x - 1, y, d: '<'})
                    } else if (d === '^') {
                        beams.push({x, y: y - 1, d: '^'})
                    }
                }
            }
        }
    }

    followBeam(0, 0, '>')

    let output = map.map(row => row.filter(c => c !== '.').length).sum()
    console.log('part 1:', output)

    for (let y = 1; y < HEIGHT; y++) {
        map = [...Array(HEIGHT)].map(() => Array(WIDTH).fill('.'))
        followBeam(0, y, '>')
        const result = map.map(row => row.filter(c => c !== '.').length).sum()
        output = Math.max(output, result)
    }
    for (let y = 0; y < HEIGHT; y++) {
        map = [...Array(HEIGHT)].map(() => Array(WIDTH).fill('.'))
        followBeam(WIDTH - 1, y, '<')
        const result = map.map(row => row.filter(c => c !== '.').length).sum()
        output = Math.max(output, result)
    }
    for (let x = 0; x < WIDTH; x++) {
        map = [...Array(HEIGHT)].map(() => Array(WIDTH).fill('.'))
        followBeam(x, 0, 'v')
        const result = map.map(row => row.filter(c => c !== '.').length).sum()
        output = Math.max(output, result)
    }
    for (let x = 0; x < WIDTH; x++) {
        map = [...Array(HEIGHT)].map(() => Array(WIDTH).fill('.'))
        followBeam(x, HEIGHT - 1, '^')
        const result = map.map(row => row.filter(c => c !== '.').length).sum()
        output = Math.max(output, result)
    }

    console.log('part 2:', output)
}
