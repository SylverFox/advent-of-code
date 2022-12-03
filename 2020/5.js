export default function (input) {
    let seats = []
    for (let i of input) {
        const [_, row, column] = i.replace(/[BR]/g, '1').replace(/[FL]/g, '0').match(/(.{7})(.{3})/)
        const seat = parseInt(row, 2) * 8 + parseInt(column, 2)
        seats.push(seat)
    }
    seats.sort((a, b) => a - b)
    console.log('Part 1:', seats.slice(-1)[0])

    for (let x = 0; ; x++) {
        if (seats[x + 1] - seats[x] !== 1) {
            console.log('Part 2:', seats[x] + 1)
            break
        }
    }
}