export default function (input) {
    input = input[0]

    let output = '', left = input
    while (left.match(/\(\d+x\d+\)/)) {
        const match = left.match(/(.*?)\((\d+)x(\d+)\)/)
        output += (match[1] || '') + left.slice(match[0].length, match[0].length + match[2]/1).repeat(match[3]/1)
        left = left.slice(match[0].length + match[2]/1)
    }
    output += left

    console.log('Part 1:', output.length)

    let expansions = [input], output2 = 0
    while (expansions.length) {
        let next = expansions.shift()
        while (next.match(/\(\d+x\d+\)/)) {
            const match = next.match(/(.*?)\((\d+)x(\d+)\)/)
            output2 += (match[1] || '').length
            expansions.push(next.slice(match[0].length, match[0].length + match[2]/1).repeat(match[3]/1))
            next = next.slice(match[0].length + match[2]/1)
        }
        output2 += next.length
        // console.log(expansions, output2)
        // if (expansions.length > 10)
        //     return
    }
    console.log('Part 2:', output2)
}
