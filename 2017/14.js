import { hash } from './10.js'

export default function (input) {
  const grid = [...Array(128)]
    .map((_, i) => hash(input[0] + '-' + i))
    .map((h) =>
      h
        .split('')
        .map((s) => parseInt(s, 16).toString(2).padStart(4, '0'))
        .join('')
        .split('')
    )

  const output = grid.map((h) => h.filter((c) => c === '1').length).sum()
  console.log('part 1:', output)

  const findOne = () => {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) {
        if (grid[y][x] === '1') return { x, y }
      }
    }
  }

  let groups = 0,
    start
  while ((start = findOne())) {
    groups++
    let spaces = [start]
    while (spaces.length) {
      const next = spaces.pop()
      grid[next.y][next.x] = '0'
      spaces.push(
        ...[
          { x: 1, y: 0 },
          { x: 0, y: 1 },
          { x: -1, y: 0 },
          { x: 0, y: -1 },
        ]
          .map((s) => ({ x: s.x + next.x, y: s.y + next.y }))
          .filter((s) => grid[s.y]?.[s.x] === '1')
      )
    }
  }

  console.log('part 2:', groups)
}
