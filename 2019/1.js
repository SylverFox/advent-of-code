const fuelRequired = mass => Math.max(Math.floor(mass / 3) - 2, 0)
const sum = (a, b) => a + b

export default function(input) {
    const output1 = input.map(fuelRequired).reduce(sum)
    console.log('Part 1:', output1)

    let fuel = 0, done = false
    for (let i of input) {
        while (i !== 0) {
            i = fuelRequired(i)
            fuel += i
        }
    }
    console.log('Part 2:', fuel)
}
