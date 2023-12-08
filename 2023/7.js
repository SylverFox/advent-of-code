export default function (input) {
    const CARDS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q' ,'K' ,'A']

    const compareHands = (h1, h2) => {
        const g1 = h1.split('').reduce((a,v) => ({...a, [v]: (a[v] || 0) + 1}), {})
        const hg1 = Object.values(g1).sort().join('')
        const g2 = h2.split('').reduce((a,v) => ({...a, [v]: (a[v] || 0) + 1}), {})
        const hg2 = Object.values(g2).sort().join('')

        if (hg1.length !== hg2.length) {
            return hg2.length - hg1.length
        } else if (hg1.length === 2 && hg1 !== hg2) {
            // four of a kind (14) or full house (23)
            return hg2 - hg1
        } else if (hg1.length === 3 && hg1 !== hg2) {
            // three of a kind (113) or two pair (122)
            return hg2 - hg1
        }

        // High card
        for (let i = 0; i < 5; i++) {
            if (h1[i] !== h2[i]) {
                return CARDS.indexOf(h1[i]) - CARDS.indexOf(h2[i])
            }
        }
    }

    let output = input.map(i => i.split(' '))
        .sort((a,b) => compareHands(a[0], b[0]))
        .reduce((a,v,i) => a + v[1] * (i + 1), 0)

    console.log('part 1:', output)

    const CARDS2 = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q' ,'K' ,'A']
    const compareHands2 = (h1, h2) => {
        const g1 = h1.split('').reduce((a,v) => v === 'J' ? a : ({...a, [v]: (a[v] || 0) + 1}), {})
        const g2 = h2.split('').reduce((a,v) => v === 'J' ? a : ({...a, [v]: (a[v] || 0) + 1}), {})

        for (let j = 0; j < 5; j++) {
            // Add jokers to the highest group
            if (h1[j] === 'J') {
                let max = Math.max(...Object.values(g1))
                let found = false
                for (let key of Object.keys(g1)) {
                    if (g1[key] === max) {
                        g1[key] += 1
                        max += 1
                        found = true
                        break
                    }
                }
                if (!found) g1['J'] = 1
            }
            if (h2[j] === 'J') {
                let max = Math.max(...Object.values(g2))
                let found = false
                for (let key of Object.keys(g2)) {
                    if (g2[key] === max) {
                        g2[key] += 1
                        max += 1
                        found = true
                        break
                    }
                }
                if (!found) g2['J'] = 1
            }
        }

        const lg1 = Object.keys(g1).length
        const hg1 = Number(Object.values(g1).sort().join(''))
        const lg2 = Object.keys(g2).length
        const hg2 = Number(Object.values(g2).sort().join(''))

        if (lg1 !== lg2) {
            return lg2 - lg1
        } else if (lg1 === 2 && hg1 !== hg2) {
            // four of a kind (14) or full house (23)
            return hg2 - hg1
        } else if (lg1 === 3 && hg1 !== hg2) {
            // three of a kind (113) or two pair (122)
            return hg2 - hg1
        }

        // High card
        for (let i = 0; i < 5; i++) {
            if (h1[i] !== h2[i]) {
                return CARDS2.indexOf(h1[i]) - CARDS2.indexOf(h2[i])
            }
        }
    }

    output = input.map(i => i.split(' '))
        .sort((a,b) => compareHands2(a[0], b[0]))
        .reduce((a,v,i) => a + v[1] * (i + 1), 0)

    console.log('part 2:', output)
}
