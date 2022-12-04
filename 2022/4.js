export default function (input) {
    input = input.map(i => i.split(',').map(x => x.split('-').map(Number)))
    input.filter(i => i[0][0] <= i[1][0] && i[0][1] >= i[1][1] || i[1][0] <= i[0][0] && i[1][1] >= i[0][1])
        .tap(x => console.log('Part 1:', x.length))
    input.filter(i => !(i[0][1] < i[1][0] || i[0][0] > i[1][1]))
        .tap(x => console.log('Part 2:', x.length))
}
