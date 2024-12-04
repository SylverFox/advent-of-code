export default function (input) {
  input = input.map((i) => i.split(''))[0].map((_, i) => input.map((x) => x[i]))

  let output = '',
    output2 = ''
  for (let i of input) {
    const counts = i.reduce((a, x) => ({ ...a, [x]: (a[x] || 0) + 1 }), {})
    let max = 0,
      min = Infinity,
      charMax,
      charMin
    for (let c of Object.keys(counts)) {
      if (counts[c] > max) {
        max = counts[c]
        charMax = c
      }
      if (counts[c] < min) {
        ;(min = counts[c]), (charMin = c)
      }
    }
    output += charMax
    output2 += charMin
  }

  console.log('Part 1:', output)
  console.log('Part 2:', output2)
}
