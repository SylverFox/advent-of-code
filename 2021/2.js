export default function (input) {
    input = input.map(l => l.split(' '))
        .map(l => ({ direction: l[0], units: Number(l[1]) }))

    let pos = 0
    let depth = 0

    for (let i = 0; i < input.length; i++) {
        if (input[i].direction === 'forward') {
            pos += input[i].units;
        } else if (input[i].direction === 'down') {
            depth += input[i].units;
        } else if (input[i].direction === 'up') {
            depth -= input[i].units;
        }
    }
    console.log('Part 1', depth * pos)

    pos = 0;
    depth = 0;
    let aim = 0;

    for (let i = 0; i < input.length; i++) {
        if (input[i].direction === 'forward') {
            pos += input[i].units;
            depth += input[i].units * aim;
        } else if (input[i].direction === 'down') {
            aim += input[i].units;
        } else if (input[i].direction === 'up') {
            aim -= input[i].units;
        }
    }
    console.log('Part 2:', depth * pos)
}



