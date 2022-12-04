export default function (input) {
    input = input.map(i => i.split(',').map(x => x.split('-').map(Number)))
    let output = input
        .filter(i => i[0][0] <= i[1][0] && i[0][1] >= i[1][1] || i[1][0] <= i[0][0] && i[1][1] >= i[0][1])
        .length
    console.log('Part 1:', output)

    output = input.filter(i => !(i[0][1] < i[1][0] || i[0][0] > i[1][1])).length
    console.log('Part 2:', output)
}
