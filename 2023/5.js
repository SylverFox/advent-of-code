export default function (input) {
    // Part 1
    const seeds = input.shift().split(' ').slice(1).map(Number)
    const maps = []
    while (input.length) {
        input.shift()
        const [_, from, to] = input.shift().match(/^(\w+)\-to\-(\w+)\s/)
        let mapping = []
        while (input.length && input[0] !== '') {
            const [dest, source, range] = input.shift().split(' ').map(Number)
            mapping.push({ source, dest, range })
        }
        maps.push({ from, to, mapping })
    }

    let locations = {}
    for (let seed of seeds) {
        let source = 'seed', value = seed
        while (source !== 'location') {
            const map = maps.find(m => m.from === source)
            const mapping = map.mapping.find(m => value >= m.source && value < m.source + m.range)
            value = mapping ? (value - mapping.source) + mapping.dest : value
            source = map.to
        }
        locations[seed] = value
    }

    console.log('part 1:', Math.min(...Object.values(locations)))

    // Part 2
    let seedRanges = []
    for (let i = 0; i < seeds.length; i+=2) {
        seedRanges.push({
            start: seeds[i],
            end: seeds[i] + seeds[i+1],
            range: seeds[i+1]
        })
    }

    maps.forEach(map => map.mapping.sort((a,b) => a.source - b.source))
    // Fill in gaps in mapping
    for (let map of maps) {
        for (let m = 0, source = 0; m < map.mapping.length; m++) {
            const minSource = map.mapping[m].source, range = map.mapping[m].range
            if (minSource > source) {
                // Add a new mapping for the missing range
                map.mapping.splice(m++, 0, {
                    source,
                    dest: source,
                    range: minSource - source
                })
            }
            source = minSource + range
        }
        // Add last mapping to Infinity
        const lastMapping = map.mapping.slice(-1)[0]
        map.mapping.push({
            source: lastMapping.source + lastMapping.range,
            dest: lastMapping.source + lastMapping.range,
            range: Infinity
        })
    }

    let currentMap = 'seed'
    while (currentMap !== 'location') {
        const map = maps.find(m => m.from === currentMap)
        let newSeedRanges = []

        for (let sr of seedRanges) {
            let cursor = sr.start
            let newSeedRange = []
            while (cursor < sr.end) {
                const mapping = map.mapping.find(m => cursor >= m.source && cursor < m.source + m.range)

                const mapOffset = cursor - mapping.source
                if (mapping.range > mapOffset + sr.range) {
                    // Can fully fit this seedRange in the mapping
                    newSeedRange.push({
                        start: mapOffset + mapping.dest,
                        end: mapOffset + mapping.dest + sr.range,
                        range: sr.range
                    })
                    break
                } else {
                    // Add partial seed range, update cursor and range, continue
                    newSeedRange.push({
                        start: mapOffset + mapping.dest,
                        end: mapOffset + mapping.dest + (mapping.range - mapOffset),
                        range: (mapping.range - mapOffset)
                    })
                    sr.range -= (mapping.range - mapOffset)
                    cursor += (mapping.range - mapOffset)
                }

                if (mapping.range === Infinity) break
            }
            newSeedRanges.push(...newSeedRange)
        }

        seedRanges = newSeedRanges
        currentMap = map.to
    }

    console.log('part 2:', Math.min(...seedRanges.map(sr => sr.start)))
}
