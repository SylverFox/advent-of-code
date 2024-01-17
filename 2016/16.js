export default function (input) {
    const step = input => {
        return input + '0' + input.split('').reverse().map(c => c === '0' ? '1' : '0').join('')
    }

    const checksum = input => {
        do {
            input = input.match(/(.){2}/g).map(m => m.match(/(.)\1/) ? '1' : '0').join('')
        } while (input.length % 2 === 0)
        return input
    }

    const hash = (input, diskSize) => {
        let state = input
        while (state.length < diskSize) {
            state = step(state)
        }
        return checksum(state.slice(0, diskSize))
    }

    console.log('part 1:', hash(input[0], 272))
    console.log('part 2:', hash(input[0], 35651584))
}
