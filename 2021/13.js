export default function (input) {
    let dots = []
    let instructions = []
    for (let line of input) {
        if (line === '') continue
        else if (line.startsWith('fold')) instructions.push(line)
        else dots.push(line)
    }

    dots = dots.map(d => d.split(',')).map(d => ({ x: d[0] / 1, y: d[1] / 1 }))
    instructions = instructions.map(i => i.match(/^fold along ([xy])=(\d+)$/))
        .map(i => ({ axis: i[1], line: i[2] / 1 }))

    let WIDTH = dots.reduce((a, v) => Math.max(a, v.x), 0) + 1
    let HEIGHT = dots.reduce((a, v) => Math.max(a, v.y), 0) + 1

    // fold
    const fold = instructions[0]
    dots.filter(d => d[fold.axis] > fold.line)
        .forEach((d, i, a) => fold.axis === 'y' ? a[i].y = HEIGHT - d.y - 1 : a[i].x = WIDTH - d.x - 1)

    // print
    WIDTH = dots.reduce((a, v) => Math.max(a, v.x), 0) + 1
    HEIGHT = dots.reduce((a, v) => Math.max(a, v.y), 0) + 1
    let map = [...Array(HEIGHT)].map(() => [...Array(WIDTH)].map(() => '.'))
    dots.forEach(d => map[d.y][d.x] = '#')

    console.log('Part 1:', map.reduce((a, v) => a.concat(v), []).filter(d => d === '#').length)

    // fold
    for (let fold of instructions) {
        WIDTH = dots.reduce((a, v) => Math.max(a, v.x), 0) + 1
        HEIGHT = dots.reduce((a, v) => Math.max(a, v.y), 0) + 1
        dots.filter(d => d[fold.axis] > fold.line)
            .forEach((d, i, a) => fold.axis === 'y' ? a[i].y = HEIGHT - d.y - 1 : a[i].x = WIDTH - d.x - 1)
    }

    // print
    WIDTH = dots.reduce((a, v) => Math.max(a, v.x), 0) + 1
    HEIGHT = dots.reduce((a, v) => Math.max(a, v.y), 0) + 1
    map = [...Array(HEIGHT)].map(() => [...Array(WIDTH)].map(() => '.'))
    dots.forEach(d => map[d.y][d.x] = '#')
    console.log('Part 2:')
    map.forEach(l => console.log(l.join(' ')))

}
