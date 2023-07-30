export default function (input) {
    input = input.map(line => line.split('').map(Number))


    function isLowPoint(x, y) {
        const get = (a, b) => input[a] ? (input[a][b] >= 0 ? input[a][b] : 9) : 9
        return Math.min(get(x - 1, y), get(x, y - 1), get(x, y + 1), get(x + 1, y)) > get(x, y)
    }

    let risk = 0
    for (let x = 0; x < input.length; x++) {
        for (let y = 0; y < input[x].length; y++) {
            if (isLowPoint(x, y)) {
                risk += input[x][y] + 1
            }
        }
    }
    console.log('Part 1:', risk)

    function* traverse() {
        for (let x = 0; x < input.length; x++) {
            for (let y = 0; y < input[x].length; y++) {
                yield { x, y }
            }
        }
    }

    function paintAll(scouts = [], num = 0) {
        const coords = traverse()
        for (let { x, y } of coords) {
            if (scouts.includes(input[x][y])) {
                input[x][y] = num
            }
        }
    }

    const get = (a, b) => input[a] ? (input[a][b] >= 0 ? input[a][b] : 9) : 9

    let basins = []
    let basinIndex = 10
    const coords = traverse();
    for (let { x, y } of coords) {
        if (input[x][y] === 9) continue;

        const neighbourBasin = [get(x - 1, y), get(x + 1, y), get(x, y - 1), get(x, y + 1)]
            .filter(c => c >= 10).filter((e, i, a) => a.indexOf(e) === i)

        if (!neighbourBasin.length) {
            // create new basin
            input[x][y] = basinIndex
            basins[basinIndex] = 1
            basinIndex++
        } else if (neighbourBasin.length === 1) {
            // one neighbour, attach this one
            input[x][y] = neighbourBasin[0]
            basins[neighbourBasin[0]]++
        } else {
            // combine multiple basins
            input[x][y] = basinIndex
            basins[basinIndex] = 1 + neighbourBasin.map(b => basins[b]).reduce((a, b) => a + b)
            paintAll(neighbourBasin, basinIndex)
            basinIndex++
            neighbourBasin.forEach(b => delete basins[b])
        }
    }

    const output = basins.filter(b => b)
        .sort((a, b) => a - b)
        .reverse()
        .slice(0, 3)
        .reduce((a, b) => a * b)

    console.log('Part 2:', output)
}

