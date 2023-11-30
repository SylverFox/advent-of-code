export default function (input) {
    const Y_TARGET = 2000000
    const MAX_COORDINATE = 4000000

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

    let output = getCoveredRanges(Y_TARGET).map(r => r.xMax - r.xMin).reduce((a, b) => a + b)
    console.log('Part 1:', output)

    let parsed = input
        .map(i => i.match(/x=([-\d]+), y=([-\d]+).*x=([-\d]+), y=([-\d]+)/).slice(1).map(Number))
        .map(i => ({xS: i[0]/1, yS: i[1]/1, xB: i[2]/1, yB: [3]/1, r: Math.abs(i[3] - i[1]) + Math.abs(i[2] - i[0])}))

    main: for (let y = 0; y < MAX_COORDINATE; y++) {
        let ranges = []
        for (let p of parsed) {
            let dY = Math.abs(p.yS - y)
            if (dY > p.r) continue // Outside of range

            let xmin = Math.max(p.xS - (p.r - dY), 0)
            let xmax = Math.min(p.xS + (p.r - dY), MAX_COORDINATE)
            ranges.push({xmin, xmax})
        }

        let rangeMin = 0, rangeMax = MAX_COORDINATE
        while (ranges.length) {
            const r = ranges.findIndex(r => r.xmin <= rangeMin || r.xmax >= rangeMax)
            if (ranges[r].xmin <= rangeMin) {
                rangeMin = Math.max(rangeMin, ranges[r].xmax + 1)
            }
            if (ranges[r].xmax >= rangeMax) {
                rangeMax = Math.min(rangeMax, ranges[r].xmin - 1)
            }

            if (rangeMin > rangeMax) {
                // Complete overlap, continue next row
                continue main
            }

            ranges.splice(r, 1)[0]
        }

        if (rangeMin === rangeMax) {
            // All ranges applied and one position left, this is the result
            console.log('part 2:', rangeMin * 4000000 + y)
            return
        }
    }
}
