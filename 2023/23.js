export default function (input) {
    input = input.map(i => i.split(''))
    const HEIGHT = input.length
    const WIDTH = input[0].length

    let nodes = [[{x: 1, y: 0}]], maxPath = 0
    while (nodes.length) {
        const next = nodes.shift()
        const node = next[next.length - 1]

        if (node.x === WIDTH - 2 && node.y === HEIGHT - 1) {
            maxPath = Math.max(maxPath, next.length - 1)
            continue
        }

        const neighbours = input[node.y][node.x] === '.' ? [
            {x: node.x, y: node.y + 1},
            {x: node.x + 1, y: node.y},
            {x: node.x, y: node.y - 1},
            {x: node.x - 1, y: node.y},
        ] : [{
            'v' : {x: node.x, y: node.y + 1},
            '>': {x: node.x + 1, y: node.y},
            '^': {x: node.x, y: node.y - 1},
            '<': {x: node.x - 1, y: node.y},
        }[input[node.y][node.x]]]

        const valid = neighbours
            .filter(n => n.x >= 0 && n.y >= 0 && n.x < WIDTH && n.y < HEIGHT)
            .filter(n => input[n.y][n.x] !== '#')
            .filter(n => !next.some(p => p.x === n.x && p.y === n.y))
            .map(n => [...next, n])

        nodes.push(...valid)
    }

    console.log('part 1:', maxPath)

    let crossRoads = []
    for (let y = 1; y < HEIGHT - 1; y++) {
        for (let x = 1; x < WIDTH - 1; x++) {
            if (input[y][x] !== '.') continue

            const neighbours = [
                {x, y: y + 1}, {x: x + 1, y}, {x, y: y - 1}, {x: x - 1, y},
            ].filter(n => input[n.y][n.x] !== '#')

            if (neighbours.length > 2) {
                crossRoads.push({x, y, n: neighbours})
            }
        }
    }
    // crossRoads = [
    //     {x: 1, y: 0, n: [{x: 1, y: 1}]},
    //     ...crossRoads,
    //     {x: WIDTH - 2, y: HEIGHT - 1, n: [{x: WIDTH - 2, y: HEIGHT - 2}]}
    // ]

    console.log(crossRoads)

    const findNextCrossing = (start) => {
        let path = start
        while (true) {
            const {x, y} = path[path.length - 1]
            const neighbour = [
                {x, y: y + 1}, {x: x + 1, y}, {x, y: y - 1}, {x: x - 1, y},
            ].find(n => input[n.y][n.x] !== '#' && !path.some(p => p.x === n.x && p.y === n.y))
            
            const cr = crossRoads.findIndex(cr => cr.x === neighbour.x && cr.y === neighbour.y)
            if (cr >= 0) {
                return {cr, p: path}
            } else if (neighbour.x === WIDTH - 2 && neighbour.y === HEIGHT - 1) {
                return {cr: -1, p: path}
            } else {
                path.push({x: neighbour.x, y: neighbour.y})
            }
        }
    }

    const maxBranches = crossRoads.map(cr => cr.n.length - 1).product()
    console.log(maxBranches)
    let max = 0
    const findLongestPath = (dir, crossRoads, d = 0) => {
        // console.log(crossRoads.filter(cr => cr).length, d)
        const next = findNextCrossing(dir)
        d += next.p.length

        if (next.cr === -1) {
            // node is end
            max = Math.max(max, d)
            console.log(max)
            return d
        } else if (crossRoads[next.cr]) {
            const enteringNode = next.p[next.p.length - 1]
            
            // console.log(next.cr, crossRoads[next.cr], crossRoads)
            const newStartNode = {x: crossRoads[next.cr].x, y: crossRoads[next.cr].y}
            const branches = crossRoads[next.cr].n.filter(cr => cr.x !== enteringNode.x || cr.y !== enteringNode.y)

            const newCrossRoads = crossRoads.clone()
            if (newCrossRoads[next.cr].n.length < 4) {
                delete newCrossRoads[next.cr]
            } else {
                // can visit here again, remove these nodes to tag them later
                newCrossRoads[next.cr].n = newCrossRoads[next.cr].n.filter(cr => cr.x !== enteringNode.x || cr.y !== enteringNode.y)
            }

            let maxBranch = 0
            for (let branch of branches) {
                const subResult = findLongestPath([newStartNode, branch], newCrossRoads, d)
                maxBranch = Math.max(maxBranch, subResult) 
            }
            return maxBranch
        }
        return 0
    }

    const maxLength = findLongestPath([{x: 1, y: 0}, {x: 1, y: 1}], crossRoads)


    // let graph = []
    // let nodesToInvestigate = [[{x: 1, y: 0}, {x: 1, y: 1}]]
    // while (nodesToInvestigate.length) {
    //     const next = nodesToInvestigate.shift()
    //     const nextNode = findNextCrossing(next)

    //     if (nextNode.cr === -1) {
    //         graph.push({
    //             A: next[0],
    //             A2: next[1],
    //             B: {x: WIDTH - 1, y: HEIGHT - 1},
    //             B2: nextNode.p[nextNode.p.length - 1],
    //             d: nextNode.p.length
    //         })
    //     } else {
    //         const cr = crossRoads[nextNode.cr]
    //         graph.push({
    //             A: next[0],
    //             A2: next[1],
    //             B: {x: cr.x, y: cr.y},
    //             B2: nextNode.p[nextNode.p.length - 1],
    //             d: nextNode.p.length,
    //         })

    //         const newNodes = cr.n.filter(
    //             crn => !graph.some(g => g.A2.x === crn.x && g.A2.y === crn.y || g.B2.x === crn.x && g.B2.y === crn.y)
    //         ).map(nn => [{x: cr.x, y: cr.y}, {x: nn.x, y: nn.y}])
    //         nodesToInvestigate.push(...newNodes)
    //     }
    // }
    // graph = graph.map(g => ({
    //     A: g.A.x + ',' + g.A.y,
    //     B: g.B.x + ',' + g.B.y,
    //     d: g.d
    // })).filter((e,i,a) => i === a.findIndex(g => g.A === e.A && g.B === e.B || g.A === e.B && g.B === e.A))
    // console.log(graph)

    // const end = `${WIDTH-2},${HEIGHT-1}`
    // let paths = [{d: 0, p: [0]}], maxLength = 0
    // while (paths.length) {
    //     const next = paths.pop()
    //     const current = next.p[next.p.length - 1]

    //     console.log(next.p.join(','))

    //     if (graph[current].B === end || graph[current].A === end) {
    //         maxLength = Math.max(maxLength, next.d)
    //         console.log(maxLength)
    //         if (maxLength > 154) return
    //         continue
    //     }

    //     for (let g = 0; g < graph.length; g++) {
    //         if (next.p.includes(g)) continue
    //         if (
    //             graph[g].A === graph[current].A ||
    //             graph[g].A === graph[current].B ||
    //             graph[g].B === graph[current].A ||
    //             graph[g].B === graph[current].B
    //         ) {
    //             paths.push({
    //                 d: next.d + graph[g].d,
    //                 p: [...next.p, g]
    //             })
    //         }
    //     }
    // }

    console.log('part 2:', maxLength)
}
