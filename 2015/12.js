export default function (input) {
    let output = input[0].match(/(-?\d+)/g).map(Number).reduce((a,b) => a + b)
    console.log('Part 1:', output)

    const count = obj => {
        let c = 0
        for (let k of Object.keys(obj)) {
            if (typeof obj[k] === 'object') {
                c += count(obj[k])
            } else if (typeof obj[k] === 'number') {
                c += obj[k]
            } else if (!(obj instanceof Array) && typeof obj[k] === 'string' && obj[k] === 'red') {
                return 0 // bail, no output
            }
        }
        return c
    }

    const obj = JSON.parse(input[0])
    console.log('Part 2:', count(obj))
    // > 58042
    // > 92108
}
