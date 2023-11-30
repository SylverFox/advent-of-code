export default function (input) {
    const getCoveredRanges = target => {
        let coveredRanges = []
        for (let i of input) {
            const [xS, yS, xB, yB] = i.match(/x=([-\d]+), y=([-\d]+).*x=([-\d]+), y=([-\d]+)/)
                .slice(1).map(Number)

            const dist = Math.abs(yB - yS) + Math.abs(xB - xS)
            const dY = target - yS
            if (Math.abs(dY) <= dist) {
                const xMin = xS - (dist - Math.abs(dY))
                const xMax = xS + (dist - Math.abs(dY))
                // console.log({ i, dist, dY, xMin, xMax })
                const range = coveredRanges
                    .findIndex(r => xMin <= r.xMax && xMax >= r.xMin)
                if (range !== -1) {
                    coveredRanges[range].xMin = Math.min(xMin, coveredRanges[range].xMin)
                    coveredRanges[range].xMax = Math.max(xMax, coveredRanges[range].xMax)
                } else {
                    coveredRanges.push({ xMin, xMax })
                }
            }
        }

        // check overlaps
        let outputRanges = []
        for (let range of coveredRanges) {
            const overlap = outputRanges.find(or => range.xMin <= or.xMax && range.xMax >= or.xMin)
            if (!overlap) {
                outputRanges.push(range)
            } else {
                overlap.xMin = Math.min(overlap.xMin, range.xMin)
                overlap.xMax = Math.max(overlap.xMax, range.xMax)
            }
        }

        return outputRanges
    }

    const Y_TARGET = 2000000
    // const Y_TARGET = 10
    let output = getCoveredRanges(Y_TARGET).map(r => r.xMax - r.xMin).reduce((a, b) => a + b)
    console.log('Part 1:', output)

    // const MAX_COORDINATE = 20
    const MAX_COORDINATE = 4000000
    // main: for (let y = 0; y <= MAX_COORDINATE; y++) {
    //     const ranges = getCoveredRanges(y)
    //     for (let x = 0; x <= MAX_COORDINATE; x++) {
    //         const canFit = !ranges.some(r => x >= r.xMin && x <= r.xMax)
    //         if (canFit) {
    //             console.log('Part 2:', x * 4000000 + y)
    //             break main
    //         }
    //     }
        
    // }

    let parsed = input
        .map(i => i.match(/x=([-\d]+), y=([-\d]+).*x=([-\d]+), y=([-\d]+)/).slice(1).map(Number))
        .map(i => ({xS: i[0], yS: i[1], xB: i[2], yB: [3], dist: Math.abs(i[3] - i[1]) + Math.abs(i[2] - i[0])}))

    main: for (let y = 0; y <= MAX_COORDINATE; y++) {
        console.log(y)
        for (let x = 0; x <= MAX_COORDINATE; x++) {
            let hit = false;
            for (let p of parsed) {
                const distC = Math.abs(y - p.yS) + Math.abs(x - p.xS)
                if (distC <= p.dist) {
                    hit = true
                    break
                }
            }
            if (!hit) {
                console.log('Part 2:', x * 4000000 + y)
                break main
            }
        }
    }
}
