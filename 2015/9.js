export default function (input) {
    let places = [], graph = {}
    for (let i of input) {
        const [_, A, B, dist] = i.match(/(.*) to (.*) = (\d+)/)
        places.push(A, B)
        graph[A] = {...(graph[A] || {}), [B]: dist/1}
        graph[B] = {...(graph[B] || {}), [A]: dist/1}
    }
    places = places.filter((e,i,a) => a.indexOf(e) === i)
    
    const shortestPath = (left, chosen = []) => {
        if (!left.length) {
            let distance = 0
            for (let i = 1; i < chosen.length; i++) {
                distance += graph[chosen[i-1]][chosen[i]] 
            }
            return [distance, chosen]
        }

        let shortest = [Number.MAX_VALUE, []]
        for (let l = 0; l < left.length; l++) {
            const newLeft = left.slice(0, l).concat(left.slice(l + 1))
            const newChosen = chosen.slice().concat(left[l])
            const path = shortestPath(newLeft, newChosen)
            if (path[0] < shortest[0]) {
                shortest = path
            }
        }
        return shortest
    }

    let output = shortestPath(places)
    console.log('Part 1:', output[0])

    const longestPath = (left, chosen = []) => {
        if (!left.length) {
            let distance = 0
            for (let i = 1; i < chosen.length; i++) {
                distance += graph[chosen[i-1]][chosen[i]] 
            }
            return [distance, chosen]
        }

        let longest = [Number.MIN_VALUE, []]
        for (let l = 0; l < left.length; l++) {
            const newLeft = left.slice(0, l).concat(left.slice(l + 1))
            const newChosen = chosen.slice().concat(left[l])
            const path = longestPath(newLeft, newChosen)
            if (path[0] > longest[0]) {
                longest = path
            }
        }
        return longest
    }

    output = longestPath(places)
    console.log('Part 2:', output[0])
}
