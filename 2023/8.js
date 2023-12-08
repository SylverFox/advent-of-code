import { lcm } from '../common.js'

export default function (input) {
    const nodes = input.slice(2)
        .map(n => n.match(/^(\w+) = \((\w+), (\w+)\)$/))
        .reduce((a,v) => ({...a, [v[1]]: {L: v[2], R: v[3]}}), {})

    for (let i = 0, n = 'AAA';; i++) {
        n = nodes[n][input[0][i % input[0].length]]
        if (n === 'ZZZ') {
            console.log('part 1:', i + 1)
            break
        }
    }

    let positions = Object.keys(nodes).filter(n => n.endsWith('A'))
    let loops = []
    for (let p of positions) {
        let position = p, leftLoop
        for (let i = 0;; i++) {
            position = nodes[position][input[0][i % input[0].length]]
            if (position.endsWith('Z')) {
                if (!leftLoop) {
                    leftLoop = i
                } else {
                    loops.push(i - leftLoop)
                    break
                }
            }
        }
    }
    while (loops.length > 1) {
        loops.splice(0, 2, lcm(loops[0], loops[1]))
    }
    console.log('part 2:', loops[0])
}
