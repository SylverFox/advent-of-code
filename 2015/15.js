export default function (input) {
    input = input
        .map(i => i.match(/(.*):.* (-?\d+).* (-?\d+).* (-?\d+).* (-?\d+).* (-?\d+)/))
        .map(i => ({ name: i[1], spoons: 0, c: i[2] / 1, d: i[3] / 1, f: i[4] / 1, t: i[5] / 1, cal: i[6] / 1 }))

    const score = (input) => {
        const capacity =   input.map(i => i.spoons * i.c).reduce((a, b) => a + b)
        const durability = input.map(i => i.spoons * i.d).reduce((a, b) => a + b)
        const flavor =     input.map(i => i.spoons * i.f).reduce((a, b) => a + b)
        const texture =    input.map(i => i.spoons * i.t).reduce((a, b) => a + b)
        return Math.max(capacity, 0) * Math.max(durability, 0) * Math.max(flavor, 0) * Math.max(texture, 0)
    }

    const calories = (input) => input.map(i => i.spoons * i.cal).reduce((a, b) => a + b)

    const bestScore = (trackCalories = false, ingredient = 0, spoons = 100) => {
        if (ingredient === input.length && spoons === 0) {
            return trackCalories && calories(input) !== 500 ? 0 : score(input)
        } else if (ingredient === input.length || spoons === 0) {
            return 0 // no spoons left for the remaining ingredients
        }

        let maxScore = 0
        for (let s = 1; s <= spoons; s++) {
            input[ingredient].spoons = s
            maxScore = Math.max(maxScore, bestScore(trackCalories, ingredient + 1, spoons - s))
        }
        return maxScore
    }

    let output = bestScore()
    console.log('Part 1:', output)
    output = bestScore(true)
    console.log('Part 2:', output)
}
