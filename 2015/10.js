export default function (input) {
    let output = input[0]

    for (let i = 0; i < 40; i++) {
        output = output.match(/(\d)\1*/g).map(x => x.length + x[0]).join('')
    }
    console.log('Part 1:', output.length)

    for (let i = 0; i < 10; i++) {
        output = output.match(/(\d)\1*/g).map(x => x.length + x[0]).join('')
    }
    console.log('Part 2:', output.length)
}
