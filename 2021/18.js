export default function (input) {
    const explode = (input, offset) => {
        const match = input.slice(offset).match(/\[(\d+),(\d+)\]/)
        const leftS = input.slice(0, offset)
            .replace(/(\d+)([,\[\]]*)$/, (_, g1, g2) => (g1 / 1 + match[1] / 1) + g2)
        const rightS = input.slice(offset + match[0].length)
            .replace(/^([,\[\]]*)(\d+)/, (_, g1, g2) => g1 + (match[2] / 1 + g2 / 1))
        return leftS + '0' + rightS
    }

    const split = (input, offset) => input.slice(0, offset) + input.slice(offset)
        .replace(/(\d{2,})/, (_, g1) => '[' + Math.floor(g1 / 2) + ',' + Math.ceil(g1 / 2) + ']')

    const magnitude = input => {
        while (input.includes(',')) {
            input = input.replace(/\[(\d+),(\d+)\]/, (_,l,r) => 3 * l + 2 * r)
        }
        return input
    }

    const add = (num1, num2) => {
        let num = '[' + num1 + ',' + num2 + ']'
        let done = false
        parse: while (!done) {
            // Check for explosions
            let i = 0, depth = 0
            while (i < num.length) {
                if (num[i] === '[') depth++
                if (num[i] === ']') depth--

                if (depth === 5) {
                    num = explode(num, i)
                    i = 0
                    depth = 0
                    continue parse
                } else {
                    i++
                }
            }

            // Check for splits
            const double = num.match(/\d{2,}/)
            if (double) {
                num = split(num, double.index)
                continue parse
            }

            done = true
        }
        return num
    }

    let line = input[0]
    for (let i of input) {
        line = add(line, i)
    }
    console.log('Part 1:', magnitude(line))

    let max = 0
    for (let x = 0; x < input.length; x++) {
        for (let y = 0; y < input.length; y++) {
            max = Math.max(max, magnitude(add(input[x], input[y])))
        }
    }
    console.log('Part 2:', max)
}