export default function (input) {
    let output = input.map(i => i.match(/^\D*(\d).*?(\d)?\D*$/))
        .reduce((a,v) => a + (v[2] ? v[1]+v[2] : v[1]+v[1])/1, 0)
    console.log('part 1:', output)

    const NUMS = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

    let sum = 0
    for (let i of input) {
        let first = (new RegExp('\\d|' + NUMS.join('|'))).exec(i)[0]
        first = first.length > 1 ? NUMS.indexOf(first) + 1 : first/1
        let last = (new RegExp('.*(\\d|' + NUMS.join('|') + ').*?$')).exec(i)[1]
        last = last.length > 1 ? NUMS.indexOf(last) + 1 : last/1
        sum += first * 10 + last
    }
    console.log('part 2:', sum)
}
