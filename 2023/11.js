export default function (input) {
    const HEIGHT = input.length;
    const WIDTH = input[0].length;

    let galaxies = []
    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            if (input[y][x] === '#') {
                galaxies.push({x, y})
            }
        }
    }

    const expandGalaxies = (galaxies, expansionFactor) => {
        let w = 0, h = 0
        for (let y = 0; y < HEIGHT; y++) {
            if (!input[y].includes('#')) {
                galaxies = galaxies.map(g => g.y < y + h ? g : ({...g, y: g.y + expansionFactor - 1}))
                h += expansionFactor - 1
            }
            
        }
        for (let x = 0; x < WIDTH; x++) {
            const column = input.reduce((a,v) => [...a, v[x]], [])
            if (!column.includes('#')) {
                galaxies = galaxies.map(g => g.x < x + w ? g : ({...g, x: g.x + expansionFactor - 1}))
                w += expansionFactor - 1
            }
        }
        return galaxies
    }

    const minDistanceSum = (galaxies) => {
        let output = 0
        for (let g1 = 0; g1 < galaxies.length - 1; g1++) {
            for (let g2 = g1 + 1; g2 < galaxies.length; g2++) {
                output += Math.abs(galaxies[g1].x - galaxies[g2].x) + Math.abs(galaxies[g1].y - galaxies[g2].y)
            }
        }
        return output
    }

    console.log('part 1:', minDistanceSum(expandGalaxies(galaxies, 2)))
    console.log('part 2:', minDistanceSum(expandGalaxies(galaxies, 1000000)))
}
