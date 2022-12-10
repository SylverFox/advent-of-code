export default function (input) {
    let graph = {}
    for (let i of input) {
        const [_, A, sign, points, B] = i
            .match(/(.+) would (gain|lose) (\d+) happiness units by sitting next to (.+)\./)
        graph[A] = {...(graph[A] || {}), [B]: sign === 'gain' ? points/1 : -points/1}
    }
    
    const happiest = (left, chosen = []) => {
        if (!left.length) {
            let happiness  = 0
            for (let i = 0; i < chosen.length; i++) {
                happiness += graph[chosen[i]][chosen[(i+1)%chosen.length]]
                happiness += graph[chosen[(i+1)%chosen.length]][chosen[i]]
            }
            return [happiness, chosen]
        }

        let happiness = [0, []]
        for (let i = 0; i < left.length; i++) {
            const newLeft = left.slice(0, i).concat(left.slice(i + 1))
            const newChosen = chosen.slice().concat(left[i])
            const res = happiest(newLeft, newChosen)
            if (res[0] > happiness[0]) {
                happiness = res
            }
        }
        return happiness
    }

    let output = happiest(Object.keys(graph))[0]
    console.log('Part 1:', output)

    graph['me'] = {}
    for (let g of Object.keys(graph)) {
        graph['me'][g] = 0
        graph[g]['me'] = 0
    }

    output = happiest(Object.keys(graph))[0]
    console.log('Part 2:', output)
}
