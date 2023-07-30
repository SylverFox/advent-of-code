export default function (input) {
    let deltaX = input
        .map(i => i === 'noop' ? [0] : [0, i.match(/-?\d+/)/1])
        .reduce((a,b) => a.concat(b), [])
    
    let output = 0, x = 1
    for (let c = 0; c < deltaX.length; c++) {
        if ((c + 1) % 40 === 20) {
            output += (c+1) * x
        }
        x += deltaX[c]
    }
    console.log('Part 1:', output)

    x = 1
    let display = Array(40 * 6).fill('.')
    for (let c = 0; c < deltaX.length; c++) {
        if ([x -1, x, x + 1].includes(c % 40)) {
            display[c] = '#'
        }
        x += deltaX[c]
    }
    console.log('Part 2:')
    display.join('').match(/.{40}/g).forEach(row => console.log(row))
}
