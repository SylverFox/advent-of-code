export default function (input) {
    input = input.map(Number)


    const bestGroup = groupSize => {
        let groups = input.slice().map((x, i) => [i]), found = []
        while (groups.length) {
            const next = groups.shift()
            for (let i = next[next.length - 1] + 1; i < input.length; i++) {
                const newGroup = next.concat(i)
                const sum = newGroup.reduce((a, b) => a + input[b], 0)

                if (sum === groupSize) {
                    found.push(newGroup)
                } else if (sum < groupSize && !found.length) {
                    groups.push(newGroup)
                }
            }
        }
        return found
            .map(f => f.map(x => input[x]).reduce((a, b) => a * b))
            .sort((a, b) => a - b)[0]
    }

    console.log('Part 1:', bestGroup(input.reduce((a, b) => a + b) / 3))
    console.log('Part 2:', bestGroup(input.reduce((a, b) => a + b) / 4))
}
