const resultCache = {}

const glob = (line, groups) => {
    // Trim spaces and fixed groups
    while (!line.startsWith('?') && line.length > 0) {
        if (line[0] === '.') {
            line = line.replace(/^\.+/, '')
        } else {
            const match = line.match(`^#[#?]{${groups[0] - 1}}([\.\?]|$)`)
            if (match) {
                line = line.slice(match[0].length)
                groups.shift()
            } else {
                return 0
            }
        }
    }

    // win/fail states
    if (!groups.length && !line.length) {
        return 1
    } else if (
        groups.sum() + groups.length - 1 > line.length ||
        !groups.length && line.includes('#') ||
        groups.length && !(line.includes('#') || line.includes('?'))
    ) {
        return 0
    }

    // Find cache hit
    const hash = line + ';' + groups.join(',')
    if (resultCache[hash] !== undefined) {
        return resultCache[hash]
    }

    // branch nodes on space/group
    let output = 0
    output += glob(line.slice(1), groups.slice())
    output += glob('#' + line.slice(1), groups.slice())

    resultCache[hash] = output
    return output
}

export default function (input) {
    let output = input.map(i => {
        let [line, groups] = i.split(' ')
        groups = groups.split(',').map(Number)
        return glob(line, groups)
    }, 0).sum()
    console.log('part 1:', output)

    output = input.map(i => {
        let [line, groups] = i.split(' ')
        line = Array(5).fill(line).join('?')
        groups = groups.split(',').map(Number)
        groups = Array(5).fill(groups).reduce((a,v) => a.concat(v), [])
        return glob(line, groups)
    }, 0).sum()
    console.log('part 2:', output)
}
