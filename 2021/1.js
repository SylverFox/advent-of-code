export default function (input) {
    input = input.map(Number)

    let depth = 0;
    for (let i = 1; i < input.length; i++) {
        if (input[i] > input[i - 1]) {
            depth++;
        }
    }
    console.log('Part 1:', depth)

    const sum = (a, b) => a + b

    for (let i = 0; i < input.length - 2; i++) {
        input[i] = input.slice(i, i + 3).reduce(sum)
    }
    input = input.slice(0, -2)

    depth = 0;
    for (let i = 1; i < input.length; i++) {
        if (input[i] > input[i - 1]) {
            depth++;
        }
    }
    console.log('Part 2:', depth)
}

