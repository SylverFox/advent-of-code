export default function (input) {
    input = input[0].split(', ').map(i => ({
        dir: i[0] === 'R' ? 1 : -1,
        count: i.slice(1)/1
    }))
    let dir = 0, pos = {x: 0, y: 0}, posList = [], doublePos
    for (let i of input) {
        dir = (dir + 4 + i.dir) % 4
        for (let j = 0; j < i.count; j++) {
            if (dir === 0) pos.y += 1
            if (dir === 1) pos.x += 1
            if (dir === 2) pos.y -= 1
            if (dir === 3) pos.x -= 1

            if (!doublePos) {
                const json = JSON.stringify(pos)
                if (posList.includes(json)) {
                    doublePos = json
                } else {
                    posList.push(json)
                }
            }
        }
    }
    console.log('Part 1:', Math.abs(pos.x) + Math.abs(pos.y))
    const dPos = JSON.parse(doublePos)
    console.log('Part 2:', Math.abs(dPos.x) + Math.abs(dPos.y))
}
