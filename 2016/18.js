export default function (input) {
    const getSafeSpaces = (row, count) => {
        let output = row.filter(c => c === '.').length
        for (let i = 1; i < count; i++) {
            row = row.map((r,i,a) => (a[i-1] ?? '.') + r + (a[i+1] ?? '.'))
                .map(r => ['^^.', '.^^', '^..', '..^'].includes(r) ? '^' : '.')
            output += row.filter(c => c === '.').length
        }
        return output
    }

    input = input[0].split('')
    console.log('part 1:', getSafeSpaces(input, 40))
    console.log('part 2:', getSafeSpaces(input, 400000))
}
