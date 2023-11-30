export default function (input) {
    const count = input.filter(i => i.startsWith('bot')).length
    let bots = Array(count).fill().map(b => ({chips: []}))
    for (let i of input) {
        if (i.startsWith('bot')) {
            const match = i.match(/(\d+).*((?:bot|output) \d+).*((?:bot|output) \d+)/)
            bots[match[1]/1].ol = match[2]
            bots[match[1]/1].oh = match[3]
        } else {
            const match = i.match(/\d+/g)
            bots[match[1]/1].chips.push(match[0]/1)
        }
    }
    console.log(bots)

    let output = 1
    main: while (bots.some(b => b.chips.length >= 2)) {
        for (let b in bots) {
            if (bots[b].chips.length >= 2) {
                const [A, B] = bots[b].chips.splice(0, 2)
                if (A === 61 && B === 17 || A === 17 && B === 61) {
                    console.log('Part 1:', b)
                }
                if (bots[b].ol.startsWith('bot')) {
                    bots[bots[b].ol.slice(4)/1].chips.push(Math.min(A, B))
                } else if (bots[b].ol.match(/output [0-2]$/)) {
                    output *= Math.min(A, B)
                }
                if (bots[b].oh.startsWith('bot')) {
                    bots[bots[b].oh.slice(4)/1].chips.push(Math.max(A, B))
                } else if (bots[b].oh.match(/output [0-2]$/)) {
                    output *= Math.max(A, B)
                }
            }
        }
    }
    console.log('Part 2:', output)
}
