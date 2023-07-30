export default function (input) {
    let molecule = input.pop()
    input.pop()
    let replacements = input.map(i => i.split(' => '))

    let results = []
    for (let r of replacements) {
        let i = molecule.indexOf(r[0])
        while (i !== -1) {
            results.push(molecule.slice(0, i) + molecule.slice(i).replace(r[0], r[1]))
            i = molecule.indexOf(r[0], i + 1)
        }
    }
    results = results.filter((e,i,a) => a.indexOf(e) === i)
    console.log('Part 1:', results.length)

    // Hours of trying, I had to look up a solution :( It's really interesting though
    // https://www.reddit.com/r/adventofcode/comments/3xflz8/comment/cy4etju/?utm_source=share&utm_medium=web2x&context=3
    const output = molecule.match(/[A-Z][a-z]?/g).length
        - molecule.match(/Rn|Ar/g).length
        - 2 * molecule.match(/Y/g).length
        - 1

    console.log('Part 2:', output)
}
