export default function (input) {
    const [R, C] = input[0].match(/\D*(\d+)\D*(\d+)/).slice(1).map(Number)

    const index = ((R + C - 1) * (R + C - 2)) / 2 + C
    let code = 20151125
    for (let i = 1; i < index; i++) {
        code = code * 252533 % 33554393
    }
    console.log('Part 1:', code)
}
