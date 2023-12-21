function getDigArea(input) {
    // get area dimensions
    let maxX = 0, maxY = 0, minX = Infinity, minY = Infinity, x = 0, y = 0
    for (let i of input) {
        if (i.d === 'R') x += i.l
        else if (i.d === 'D') y += i.l
        else if (i.d === 'L') x -= i.l
        else if (i.d === 'U') y -= i.l

        maxX = Math.max(maxX, x)
        maxY = Math.max(maxY, y)
        minX = Math.min(minX, x)
        minY = Math.min(minY, y)
    }
    const WIDTH = maxX - minX + 1
    const HEIGHT = maxY - minY + 1

    x = Math.abs(minX), y = Math.abs(minY)
    let ranges = [...Array(HEIGHT)].map(() => [])
    for (let i = 0; i < input.length; i ++) {
        const dig = input[i]
        if (['U', 'D'].includes(dig.d)) {
            for (let l = 0; l < dig.l; l++) {
                y += dig.d === 'U' ? -1 : 1
                if (l + 1 !== dig.l) ranges[y].push(x+'')
            }
        } else {
            const hook = input[(i - 1 + input.length) % input.length].d === input[(i + 1) % input.length].d ? '1' : '0'
            const x2 = x + (dig.d === 'L' ? -dig.l : dig.l)
            if (dig.d === 'L') {
                ranges[y].push(`${x2}-${x}-${hook}`)
            } else {
                ranges[y].push(`${x}-${x2}-${hook}`)
            }
            x = x2
        }
    }

    let output = 0, rangeCache = {}
    for (let y = 0; y < ranges.length; y++) {
        const range = ranges[y].sort((a,b) => a.split('-')[0]-b.split('-')[0])

        // deduplicate for same rows
        const rangeHash = range.join(';')
        if (rangeCache[rangeHash]) {
            output += rangeCache[rangeHash]
            continue
        }

        let val = 0
        for (let i = 0, inside = false; i < range.length; i++) {
            if (range[i].includes('-')) {
                const block = range[i].split('-').map(Number)
                if (block[2]) inside = !inside

                if (inside) {
                    val += range[i+1].split('-')[0]/1 - block[0]
                } else {
                    val += block[1] - block[0]
                }
            } else {
                inside = !inside
                if (inside) {
                    val += range[i+1].split('-')[0]/1 - range[i]/1
                }
            }

            if (!inside) val++
        }

        output += val
        rangeCache[rangeHash] = val
    }
    return output
}

export default function (input) {
    const input1 = input.map(i => i.split(' ')).map(i => ({
        d: i[0], l: i[1]/1
    }))

    console.log('part 1:', getDigArea(input1))

    const input2 = input.map(i => i.split(' ')).map(i => ({
        l: parseInt(i[2].slice(2, 7), 16),
        d: ['R', 'D', 'L', 'U'][i[2][7]/1]
    }))

    console.log('part 2:', getDigArea(input2))
}
