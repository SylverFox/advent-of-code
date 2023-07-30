export default function (input) {
    input = input.map(Number)

    let combinations = 0, minContainers = Number.MAX_VALUE, minContCombinations = 0
    for (let i = 0; i < 2**input.length; i++) {
        const mask = i.toString(2).padStart(input.length, '0')
        const sum = input.filter((_,i) => mask[i] == 1).reduce((a,b) => a + b, 0)
        if (sum === 150) {
            combinations++
            const containers = mask.replace(/0/g, '').length
            if (containers < minContainers) {
                minContainers = containers
                minContCombinations = 1
            } else if (containers === minContainers) {
                minContCombinations++
            }
        }
    }
    console.log('Part 1:', combinations)
    console.log('Part 2:', minContCombinations)
}
