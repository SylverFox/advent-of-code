export default function (input) {
    const enhancement = input[0].split('')

    const ROUNDS = 2

    let map = []
    for (let i = 2; i < input.length; i++) {
        map[i-2] = input[i].split('')
    }

    for (let y = 0; y < map.length; y++) {
        map[y] = [
            ...'.'.repeat(ROUNDS*2+1).split(''),
            ...map[y], '.',
            ...'.'.repeat(ROUNDS*2+1).split(''),
        ]
    }
    const padding = '.'.repeat(map[0].length).split('')
    map = [
        ...Array(ROUNDS*2+1).fill().map(r => padding.slice()),
        ...map,
        ...Array(ROUNDS*2+1).fill().map(r => padding.slice()),
    ]

    map.forEach(r => console.log(r.join(' ')))
    console.log()

    const blockValue = (map, x, y) => {
        let block = ''
        for (let a = y - 1; a <= y + 1; a++) {
            for (let b = x - 1; b <= x + 1; b++) {
                block += map[a][b] === '#' ? 1 : 0
            }
        }
        return parseInt(block, 2)
    }

    for (let r = 0; r < ROUNDS; r++) {
        let newMap = JSON.parse(JSON.stringify(map))
        for (let y = 1; y < map.length - 1; y++) {
            for (let x = 1; x < map[0].length - 1; x++) {
                newMap[y][x] = enhancement[blockValue(map, x, y)]
            }
        }
        map = newMap
        map.forEach(r => console.log(r.join(' ')))
        console.log()
    }

    let output = []
    for (let y = 2; y < map.length - 2; y++) {
        output.push(map[y].slice(2, -2).join(''))
    }
    output = output.join('').match(/#/g).length
    console.log('Part 1:', output)
    // > 5431
    // < 5688
}
