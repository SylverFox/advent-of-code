export default function (input) {
    let monkeyInput = []
    for (let m = 0; m < input.length; m += 7) {
        monkeyInput.push({
            items: input[m + 1].match(/\d+/g).map(Number),
            op: input[m + 2].match(/Operation: (.*)/)[1].replaceAll('new', 'next'),
            test: input[m + 3].match(/\d+/)/1,
            onTrue: input[m + 4].match(/\d+/)/1,
            onFalse: input[m + 5].match(/\d+/)/1,
            inspected: 0
        })
    }

    let monkeys = JSON.parse(JSON.stringify(monkeyInput))
    for (let round = 0; round < 20; round++) {
        for (let m = 0; m < monkeys.length; m++) {
            while(monkeys[m].items.length) {
                let old = monkeys[m].items.splice(0, 1)[0], next
                eval(monkeys[m].op)
                next = Math.floor(next / 3)
                if (next % monkeys[m].test === 0) {
                    monkeys[monkeys[m].onTrue].items.push(next)
                } else {
                    monkeys[monkeys[m].onFalse].items.push(next)
                }
                monkeys[m].inspected++
            }
        }
    }
    monkeys.sort((a,b) => b.inspected - a.inspected)
    console.log('Part 1:', monkeys[0].inspected * monkeys[1].inspected)

    monkeys = JSON.parse(JSON.stringify(monkeyInput))
    const productTests = monkeys.map(m => m.test).reduce((a, b) => a * b)
    for (let round = 0; round < 10000; round++) {
        for (let m = 0; m < monkeys.length; m++) {
            while(monkeys[m].items.length) {
                let old = monkeys[m].items.splice(0, 1)[0], next
                eval(monkeys[m].op)
                next %= productTests
                if (next % monkeys[m].test === 0) {
                    monkeys[monkeys[m].onTrue].items.push(next)
                } else {
                    monkeys[monkeys[m].onFalse].items.push(next)
                }
                monkeys[m].inspected++
            }
        }
    }
    monkeys.sort((a,b) => b.inspected - a.inspected)
    console.log('Part 2:', monkeys[0].inspected * monkeys[1].inspected)
}
