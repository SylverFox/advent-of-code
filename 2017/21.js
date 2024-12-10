export default function (input) {
  const rules = input.map((i) => i.split(' => '))

  const divide = (grid) => {
    let grids = []
    let gridSize = grid.length % 2 === 0 ? 2 : 3
    for (let y = 0; y < grid.length; y += gridSize) {
      for (let x = 0; x < grid.length; x += gridSize) {
        grids.push(
          grid.slice(y, y + gridSize).map((r) => r.slice(x, x + gridSize))
        )
      }
    }
    return grids
  }

  const variations = (grid) =>
    [grid, grid.transpose2D()]
      .flatMap((g) => [g, g.slice().reverse()])
      .flatMap((g) => [g, g.map((g) => g.slice().reverse())])

  const combine = (grids) => {
    if (grids.length === 1) return grids[0]

    let grid = []
    const gridSize = grids[0].length
    const superGridSize = Math.sqrt(grids.length)

    for (let sy = 0; sy < grids.length; sy += superGridSize) {
      for (let x = 0; x < gridSize; x++) {
        let row = []
        for (let y = 0; y < superGridSize; y++) {
          row.push(...grids[sy + y][x])
        }
        grid.push(row)
      }
    }
    return grid
  }

  const solution = (iterations) => {
    let grid = ['.#.', '..#', '###'].map((r) => r.split(''))
    for (let i = 0; i < iterations; i++) {
      let grids = divide(grid)

      for (let g = 0; g < grids.length; g++) {
        const vars = variations(grids[g])

        for (let v of vars) {
          const pattern = v.map((r) => r.join('')).join('/')
          const rule = rules.find((r) => r[0] === pattern)
          if (rule) {
            grids[g] = rule[1].split('/').map((r) => r.split(''))
            break
          }
        }
      }
      grid = combine(grids)
    }

    return grid.map((r) => r.filter((x) => x === '#').length).sum()
  }

  console.log('part 1:', solution(5))
  console.log('part 2:', solution(18))
}
