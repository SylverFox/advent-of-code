export default function (input) {
    const clues = [
        'children: 3',
        'samoyeds: 2',
        'akitas: 0',
        'vizslas: 0',
        'perfumes: 1',
        'cars: 2',

        'cats: 7',
        'trees: 3',

        'pomeranians: 3',
        'goldfish: 5',
    ]

    for (let i of input) {
        const match = i.match(/Sue (\d+): (.*), (.*), (.*)/)
        if (match.slice(2).every(c => clues.includes(c))) {
            console.log('Part 1:', match[1])
            break
        }
    }

    const clues2 = {
        'cats': 7,
        'trees': 3,
        'pomeranians': 3,
        'goldfish': 5,
    }
    main: for (let i of input) {
        const match = i.match(/Sue (\d+): (.*), (.*), (.*)/)
        for (let c of match.slice(2)) {
            if (
                c.includes('trees') && c.match(/\d+/)[0]/1 <= clues2['trees'] ||
                c.includes('cats') && c.match(/\d+/)[0]/1 <= clues2['cats'] ||
                c.includes('pomeranians') && c.match(/\d+/)[0]/1 >= clues2['pomeranians'] ||
                c.includes('goldfish') && c.match(/\d+/)[0]/1 >= clues2['goldfish']
            ) {
                continue main
            } else if (Object.keys(clues2).every(clue => !c.startsWith(clue)) && !clues.includes(c)) {
                continue main
            }
        }
        console.log('Part 2:', match[1])
        break
    }
}
