export default function (input) {
    const template = input[0]
    const rules = input.slice(2).map(r => r.split(' -> '))

    const addCounts = (a, b) => {
        for (let k of Object.keys(b)) {
            a[k] = (a[k] || 0) + b[k]
        }
        return a
    }

    let cache = {}
    const grow = (pair, maxStep, step = 1) => {
        if (cache[pair + step]) {
            return cache[pair + step]
        }

        const [left, right] = pair.split('')
        const insert = rules.find(r => r[0] === pair)[1]

        let counts = {
            [insert]: 1
        }

        if (step < maxStep) {
            const countsL = grow(left + insert, maxStep, step + 1)
            counts = addCounts(counts, countsL)
            const countsR = grow(insert + right, maxStep, step + 1)
            counts = addCounts(counts, countsR)
        }

        cache[pair + step] = counts

        return counts
    }

    let counts = template.split('').reduce((a, v) => ({ ...a, [v]: (a[v] || 0) + 1}), {})
    for (let i = 0; i < template.length - 1; i++) {
        const countsM = grow(template.slice(i, i + 2), 10)
        counts = addCounts(counts, countsM)
    }

    let min = Number.MAX_VALUE, max = 0
    for (let k of Object.keys(counts)) {
        min = Math.min(min, counts[k])
        max = Math.max(max, counts[k])
    }
    console.log('Part 1:', max - min)

    counts = template.split('').reduce((a, v) => ({ ...a, [v]: (a[v] || 0) + 1}), {})
    cache = {}
    for (let i = 0; i < template.length - 1; i++) {
        const countsM = grow(template.slice(i, i + 2), 40)
        counts = addCounts(counts, countsM)
    }

    min = Number.MAX_VALUE, max = 0
    for (let k of Object.keys(counts)) {
        min = Math.min(min, counts[k])
        max = Math.max(max, counts[k])
    }
    console.log('Part 2:', max - min)
}

