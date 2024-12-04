export default function (input) {
  let grid = input.map((i) => i.split(''))

  const neighbours = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ]

  const runSimulation = (fixedLights) => {
    for (let i = 0; i < 100; i++) {
      let copy = Array(grid.length)
        .fill()
        .map((r) => Array(grid[0].length).fill('.'))

      for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid.length; x++) {
          const lights = neighbours
            .map((n) => [n[0] + x, n[1] + y])
            .filter(
              (n) =>
                n[0] >= 0 &&
                n[1] >= 0 &&
                n[0] < grid[0].length &&
                n[1] < grid.length
            )
            .filter((n) => grid[n[1]][n[0]] === '#').length
          if (grid[y][x] === '#' && lights !== 2 && lights !== 3) {
            copy[y][x] = '.'
          } else if (grid[y][x] === '.' && lights === 3) {
            copy[y][x] = '#'
          } else {
            copy[y][x] = grid[y][x]
          }
        }
      }

      grid = copy

      if (fixedLights) {
        grid[0][0] = '#'
        grid[99][0] = '#'
        grid[0][99] = '#'
        grid[99][99] = '#'
      }
    }
    return grid
      .map((row) => row.join('').replace(/\./g, '').length)
      .reduce((a, b) => a + b)
  }

  console.log('Part 1:', runSimulation())

  grid = input.map((i) => i.split(''))
  grid[0][0] = '#'
  grid[99][0] = '#'
  grid[0][99] = '#'
  grid[99][99] = '#'
  console.log('Part 2:', runSimulation(true))
}
