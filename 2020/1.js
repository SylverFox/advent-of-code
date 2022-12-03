export default function (input) {
    input = input.map(Number)

    for (let i = 0; i < input.length; i++) {
        const remainder = 2020 - input[i]
        const index = input.indexOf(remainder, i)
        if (index > 0) {
            console.log('Part 1:', input[i] * input[index])
            break
        }
    }

    main: for (let i = 0; i < input.length - 2; i++) {
        for (let j = i; j < input.length - 1; j++) {
            const remainder = 2020 - input[i] - input[j]
            const index = input.indexOf(remainder, j)
            if (index > 0) {
                console.log('Part 2:', input[i] * input[j] * input[index])
                break main;
            }
        }
    }
}