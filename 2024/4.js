export default function (input) {
  const height = input.length
  const width = input[0].length

  const get = (x, y) => (input[y] ? (input[y][x] ? input[y][x] : '') : '')

  let output = 0
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (get(x, y) !== 'X') continue

      const words = [
        get(x, y) + get(x + 1, y) + get(x + 2, y) + get(x + 3, y),
        get(x, y) + get(x + 1, y + 1) + get(x + 2, y + 2) + get(x + 3, y + 3),
        get(x, y) + get(x, y + 1) + get(x, y + 2) + get(x, y + 3),
        get(x, y) + get(x - 1, y + 1) + get(x - 2, y + 2) + get(x - 3, y + 3),
        get(x, y) + get(x - 1, y) + get(x - 2, y) + get(x - 3, y),
        get(x, y) + get(x - 1, y - 1) + get(x - 2, y - 2) + get(x - 3, y - 3),
        get(x, y) + get(x, y - 1) + get(x, y - 2) + get(x, y - 3),
        get(x, y) + get(x + 1, y - 1) + get(x + 2, y - 2) + get(x + 3, y - 3),
      ].filter((w) => w === 'XMAS').length

      output += words
    }
  }
  console.log('part 1:', output)

  output = 0
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (get(x + 1, y + 1) !== 'A') continue

      const word =
        get(x, y) +
        get(x + 2, y) +
        get(x + 1, y + 1) +
        get(x, y + 2) +
        get(x + 2, y + 2)

      if (['MMASS', 'MSAMS', 'SMASM', 'SSAMM'].includes(word)) {
        output++
      }
    }
  }
  console.log('part 2:', output)
}
