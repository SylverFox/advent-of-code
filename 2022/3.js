const PRIORITIES = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const UNIQUES = (e,i,a) => a.indexOf(e) === i
const NON_UNIQUES = (e,i,a) => a.indexOf(e) !== i
const DOUBLE_NON_UNIQUES = (e,i,a) => a.indexOf(e) !== i && a.lastIndexOf(e) !== i

export default function(input) {
    input = input.map(r => r.split('').map(c => PRIORITIES.indexOf(c)))
    let output = 0
    for (let i of input) {
        const front = i.slice(0, i.length/2).filter(UNIQUES)
        const back = i.slice(i.length/2).filter(UNIQUES)
        output += front.concat(back).filter(NON_UNIQUES)[0]
    }
    console.log('Part 1:', output)

    output = 0
    for (let i = 0; i < input.length; i += 3) {
        const r1 = input[i].filter(UNIQUES)
        const r2 = input[i+1].filter(UNIQUES)
        const r3 = input[i+2].filter(UNIQUES)
        output += r1.concat(r2).concat(r3).filter(DOUBLE_NON_UNIQUES)[0]
    }
    console.log('Part 2:', output)
}