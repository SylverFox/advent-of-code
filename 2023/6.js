export default function (input) {
  const times = input[0].match(/\d+/g).map(Number)
  const distances = input[1].match(/\d+/g).map(Number)

  let output = 1
  for (let race = 0; race < times.length; race++) {
    let raceOutput = 0
    for (let t = 0; t <= times[race]; t++) {
      const dist = (times[race] - t) * t
      if (dist > distances[race]) raceOutput++
    }
    output *= raceOutput
  }

  console.log('part 1:', output)

  const time = Number(input[0].match(/\d+/g).join(''))
  const distance = Number(input[1].match(/\d+/g).join(''))

  const xl = (-time + Math.sqrt(time ** 2 - 4 * -1 * -distance)) / (2 * -1)
  const xr = (-time - Math.sqrt(time ** 2 - 4 * -1 * -distance)) / (2 * -1)

  console.log('part 2:', Math.floor(xr) - Math.ceil(xl) + 1)
}
