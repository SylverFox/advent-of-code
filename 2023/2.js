export default function (input) {
  const colors = {
    red: 12,
    green: 13,
    blue: 14,
  }

  let output = 0,
    output2 = 0
  for (let i of input) {
    const match = i.match(/\d+ (red|green|blue)/g).map((m) => m.split(' '))
    let possible = true
    let minColors = { red: 0, green: 0, blue: 0 }
    for (let m of match) {
      if (colors[m[1]] && m[0] > colors[m[1]]) {
        possible &= false
      }
      minColors[m[1]] = Math.max(minColors[m[1]], m[0])
    }
    if (possible) {
      output += i.match(/\d+/)[0] / 1
    }
    output2 += Object.values(minColors).reduce((a, v) => a * v)
  }
  console.log('part 1:', output)
  console.log('part 2:', output2)
}
