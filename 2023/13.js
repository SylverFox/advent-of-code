function findMirrorPoint(pattern, withSmudge) {
    for (let p = 1; p < pattern.length; p++) {
        const top = pattern.slice(0, p).reverse().join('')
        const bottom = pattern.slice(p).join('')
        const l = Math.min(top.length, bottom.length)
        let mirrored = false
        if (!withSmudge) {
            mirrored = bottom.slice(0, l) === top.slice(0, l)
        } else {
            mirrored = bottom.slice(0, l).split('').filter((c,i) => top[i] !== c).length === 1
        }
        if (mirrored) return {dir: 'h', p}
    }

    // transpose and run again
    const transposed = [...Array(pattern[0].length)].map((_,c) => pattern.map(r => r[c]));

    for (let p = 1; p < transposed.length; p++) {
        const top = transposed.slice(0, p).reverse().join('')
        const bottom = transposed.slice(p).join('')
        const l = Math.min(top.length, bottom.length)
        let mirrored = false
        if (!withSmudge) {
            mirrored = bottom.slice(0, l) === top.slice(0, l)
        } else {
            mirrored = bottom.slice(0, l).split('').filter((c,i) => top[i] !== c).length === 1
        }
        if (mirrored) return {dir: 'v', p}
    }
}

export default function (input) {
    let patterns = [[]]
    for (let p = 0, i = 0; i < input.length; i++) {
        if (input[i] === '') {
            patterns[++p] = []
            i++
        }
        patterns[p].push(input[i])
    }

    let output = 0
    for (let p of patterns) {
        const mp = findMirrorPoint(p, false)
        output += mp.dir === 'v' ? mp.p : mp.p * 100
    }
    console.log('part 1:', output)

    output = 0
    for (let p of patterns) {
        const mp = findMirrorPoint(p, true)
        output += mp.dir === 'v' ? mp.p : mp.p * 100
    }
    console.log('part 2:', output)
}
