export default function (input) {
    const SUM = (a, v) => a + v

    const SNAFUToDec = num => num.split('')
        .map(e => ({'2': 2, '1': 1, '0': 0, '-': -1, '=': -2})[e])
        .reverse()
        .map((e, i) => 5**i * e)
        .reduce(SUM)

    const DecToSNAFU = num => {
        let snafu = ''
        for (let i = 0; num > 0; i++) {
            const s = (num + 2) % 5 - 2
            snafu += s === -2 ? '=' : s === -1 ? '-' : s
            num = (num - s) / 5
        }
        return snafu.split('').reverse().join('')
    }

    console.log('Part 1:', DecToSNAFU(input.map(SNAFUToDec).reduce(SUM)))
}
