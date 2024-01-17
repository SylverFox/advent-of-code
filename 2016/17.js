import { createHash } from 'crypto'

const md5 = plain => createHash('md5').update(plain).digest('hex')

export default function (input) {
    const HEIGHT = 4
    const WIDTH = 4

    let nodes = [{p: '', x: 0, y: 0}], solution
    while (nodes.length) {
        const node = nodes.shift()

        if (node.x === WIDTH - 1 && node.y === HEIGHT - 1) {
            if (!solution) {
                solution = node.p
            } else if (node.p.length < solution.p) {
                solution = node.p
            } else {
                continue
            }
        } else if (solution && node.p.length > solution.length) {
            continue
        }

        const hash = md5(input + node.p)
        nodes.push(...[
            {p: node.p + 'U', x: node.x, y: node.y - 1},
            {p: node.p + 'D', x: node.x, y: node.y + 1},
            {p: node.p + 'L', x: node.x - 1, y: node.y},
            {p: node.p + 'R', x: node.x + 1, y: node.y},
        ].filter((n,i) => 'bcdef'.includes(hash[i]) && n.x >= 0 && n.y >= 0 && n.x < WIDTH && n.y < HEIGHT))
    }

    console.log('part 1:', solution)

    nodes = [{p: '', x: 0, y: 0}], solution = 0
    while (nodes.length) {
        let newNodes = []
        for (let node of nodes) {
            if (node.x === WIDTH - 1 && node.y === HEIGHT - 1) {
                if (node.p.length > solution) {
                    solution = node.p.length
                }
                continue
            }

            const hash = md5(input + node.p)
            newNodes.push(...[
                {p: node.p + 'U', x: node.x, y: node.y - 1},
                {p: node.p + 'D', x: node.x, y: node.y + 1},
                {p: node.p + 'L', x: node.x - 1, y: node.y},
                {p: node.p + 'R', x: node.x + 1, y: node.y},
            ].filter((n,i) => 'bcdef'.includes(hash[i]) && n.x >= 0 && n.y >= 0 && n.x < WIDTH && n.y < HEIGHT))
        }
        nodes = newNodes
    }

    console.log('part 2:', solution)
}
