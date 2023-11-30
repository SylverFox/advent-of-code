export default function (input) {
    input = input
        .map(i => i.match(/\S+ (?:microchip|generator)/g) || [])
        .map(i => i.map(x => x.replace(/^([\w-]+)\s(\w+)$/, (_, e, t) => e[0].toUpperCase() + e[1] + t[0].toUpperCase())))

    let states = [{ map: input.clone(), elevator: 0 }], steps = 0, cache = []
    main: while (true) {
        let newStates = []
        layer: while (states.length) {
            const next = states.shift()

            // Success state
            if (next.map.slice(0, -1).every(floor => !floor.length)) {
                // Everything is on the last floor
                break main
            }

            // Expand state
            const dirs = []
            if (next.elevator > 0) dirs.push(next.elevator - 1)
            if (next.elevator < next.map.length - 1) dirs.push(next.elevator + 1)

            let permutations = []
            for (let dir of dirs) {
                for (let i = 0; i < next.map[next.elevator].length; i++) {
                    permutations.push([dir, i])
                    for (let j = i + 1; j < next.map[next.elevator].length; j++) {
                        permutations.push([dir, i, j])
                    }
                }
            }
            // console.log('expand', next.map)
            perms: for (let p of permutations) {
                const mapCopy = next.map.clone()
                for (let i = p.length - 1; i > 0; i--) {
                    mapCopy[p[0]].push(mapCopy[next.elevator].splice(p[i], 1)[0])
                }
                // console.log(mapCopy)

                const newState = { map: mapCopy, elevator: p[0] }
                if (cache.includes(JSON.stringify(newState))) continue perms

                // Fail state
                for (let f = 0; f < mapCopy.length; f++) {
                    for (let item of mapCopy[f]) {
                        if (
                            item.endsWith('M') &&
                            !mapCopy[f].includes(item.slice(0, 2) + 'G') &&
                            mapCopy[f].find(x => x.endsWith('G'))
                        ) {
                            // console.log('invalid', next.map, f, item)
                            continue perms
                        }
                    }
                }

                newStates.push({ map: mapCopy, elevator: p[0] })
                cache.push(JSON.stringify(next))
            }
        }

        states = newStates
        steps++

        console.log(steps, states.length)
        // states.forEach(s => console.log(s.elevator, s.map))
        // console.log()
        // cache.forEach(c => console.log(JSON.parse(c)))
        // console.log()
        if (steps === 12) {
            break
        }
    }
    console.log('Part 1:', steps)
}
