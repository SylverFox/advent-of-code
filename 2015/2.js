export default function (input) {
    let output = input
        .map(l => l.split(/x/g))
        .map(l => 2 * l[0] * l[1] + 2 * l[1] * l[2] + 2 * l[2] * l[0] + (l[0] * l[1] * l[2]) / Math.max(...l))
        .reduce((a, b) => a + b)
    console.log('Part 1:', output)

    output = input
        .map(l => l.split(/x/g))
        .map(l => l[0] * l[1] * l[2] + (2 * l[0] + 2 * l[1] + 2 * l[2]) - (2 * Math.max(...l)))
        .reduce((a, b) => a + b)
    console.log('Part 2:', output)
}
