export default function (input) {
  let groups = {}
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] !== '.') {
        groups[input[y][x]] = [...(groups[input[y][x]] || []), { x, y }]
      }
    }
  }

  const filterInBounds = (n) =>
    n.y >= 0 && n.y < input.length && n.x >= 0 && n.x < input[n.y].length
  const filterUniques = (e, i, a) =>
    a.findIndex((n) => n.x === e.x && n.y === e.y) === i

  let antinodes = []
  for (let nodes of Object.values(groups)) {
    for (let a = 0; a < nodes.length; a++) {
      for (let b = 0; b < nodes.length; b++) {
        if (a === b) continue

        antinodes.push({
          x: 2 * nodes[a].x - nodes[b].x,
          y: 2 * nodes[a].y - nodes[b].y,
        })
      }
    }
  }

  let output = antinodes.filter(filterInBounds).filter(filterUniques).length
  console.log('part 1:', output)

  antinodes = []
  for (let nodes of Object.values(groups)) {
    for (let a = 0; a < nodes.length; a++) {
      for (let b = 0; b < nodes.length; b++) {
        if (a === b) continue

        const dx = nodes[a].x - nodes[b].x
        const dy = nodes[a].y - nodes[b].y
        let x = nodes[a].x
        let y = nodes[a].y
        while (y >= 0 && x >= 0 && y < input.length && x < input[y].length) {
          antinodes.push({ x, y })
          x += dx
          y += dy
        }
      }
    }
  }

  output = antinodes.filter(filterInBounds).filter(filterUniques).length
  console.log('part 2:', output)
}
