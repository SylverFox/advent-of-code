export default function (input) {
  input = input
    .map((i) => i.split(', ').map(Number))
    .map((i) => ({ x: i[0], y: i[1] }))

  const minX = Math.min(...input.map((i) => i.x))
  let maxX = Math.max(...input.map((i) => i.x))
  const minY = Math.min(...input.map((i) => i.y))
  let maxY = Math.max(...input.map((i) => i.y))
  input = input.map((i) => ({ x: i.x - minX, y: i.y - minY }))
  maxX -= minX
  maxY -= minY

  let grid = [...Array(maxY + 1)].map(() => Array(maxX + 1).fill('?'))
  input.forEach((i, x) => (grid[i.y][i.x] = x))

  let output2 = 0

  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      const distances = input
        .map((v, i) => ({ i, d: Math.abs(v.x - x) + Math.abs(v.y - y) }))
        .sort((a, b) => a.d - b.d)

      const sumDistances = distances.reduce((a, b) => a + b.d, 0)
      if (sumDistances < 10000) {
        output2++
      }

      if (grid[y][x] === '?' && distances[0].d === distances[1].d) {
        grid[y][x] = '.'
      } else {
        grid[y][x] = distances[0].i
      }
    }
  }

  const infiniteIds = [
    ...grid[0],
    ...grid.map((row) => row[0]),
    ...grid.map((row) => row[maxX]),
    ...grid[maxY],
  ]
    .filter((e, i, a) => a.indexOf(e) === i)
    .sort((a, b) => a - b)

  const groups = grid
    .reduce((a, v) => a.concat(v))
    .filter((x) => !infiniteIds.includes(x))
    .reduce((a, v) => ({ ...a, [v]: (a[v] || 0) + 1 }), {})

  const output1 = Object.values(groups).sort((a, b) => b - a)[0]

  console.log('part 1:', output1)
  console.log('part 2:', output2)
}
