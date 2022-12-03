const WIDTH = 25
const HEIGHT = 6

export default function(input) {
    const layers = input[0].match(new RegExp(`.{${WIDTH*HEIGHT}}`, 'g'))

    const data = layers.map(l => ({
        zeroes: l.split('').filter(c => c === '0').length,
        ones: l.split('').filter(c => c === '1').length,
        twos: l.split('').filter(c => c === '2').length,
    }))
    data.sort((l1,l2) => l1.zeroes - l2.zeroes)
    let output = data[0].ones * data[0].twos
    console.log('Part 1:', output)

    let image = []
    for (let i = 0; i < WIDTH*HEIGHT; i++) {
        for (let l = 0; l < layers.length; l++) {
            if (layers[l][i] !== '2') {
                const color = layers[l][i]
                image.push(color === '0' ? ' ' : 'X')
                break
            }
        }
    }
    console.log('Part 2:')
    for (let h = 0; h < HEIGHT; h++) {
        const row = image.slice(h * WIDTH, (h+1) * WIDTH)
        console.log(row.join(' '))
    }
}
