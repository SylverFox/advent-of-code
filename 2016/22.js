export default function (input) {
  const nodes = input
    .slice(2)
    .map((n) => n.match(/node-x(\d+)-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)T/))
    .map((n) => ({
      x: n[1] / 1,
      y: n[2] / 1,
      size: n[3] / 1,
      used: n[4] / 1,
      free: n[5] / 1,
    }))

  const pairs = nodes
    .filter((n) => n.used > 0)
    .map((n) => nodes.filter((n2) => n !== n2 && n2.free >= n.used).length)
    .sum()
  console.log('part 1:', pairs)

  const yMax = Math.max(...nodes.map((n) => n.y))
  const xMax = Math.max(...nodes.map((n) => n.x))

  let grid = [],
    empty
  for (let y = 0; y <= yMax; y++) {
    grid[y] = []
    for (let x = 0; x <= xMax; x++) {
      const node = nodes.find((n) => n.x === x && n.y === y)
      if (node.used === 0) {
        empty = { x: node.x, y: node.y }
      }
      grid[y][x] = node.used > 100 ? '#' : '.'
    }
  }
  // grid.forEach((row) => console.log(row.join('')))
  // observation of the grid shows there is just on single wall in the middle of the map
  // go all the way left, up, and right past the "wall". then do the wiggle to get the data to the starting point
  const wallY = grid.findIndex((row) => row.includes('#'))
  const wallX = grid[wallY].indexOf('#')
  const sum = empty.x - wallX + empty.y + xMax + 5 * (xMax - 1)
  console.log('part 2:', sum)
}
