export default function (input) {
  const map = input.map((i) => i.split(''))
  let start, end
  search: for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (map[y][x] === 'S') {
        start = { x, y }
        map[y][x] = '.'
      } else if (map[y][x] === 'E') {
        end = { x, y }
        map[y][x] = '.'
      }
      if (start && end) break search
    }
  }

  const eq = (p1, p2) => p1.x === p2.x && p1.y === p2.y
  const d = (p1, p2) => Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)

  const findPath = (start, end) => {
    let open = [{ ...start, path: [start] }]
    let closed = []
    while (open.length) {
      const current = open.shift()
      closed.push(current)

      if (eq(current, end)) {
        return current
      }

      const neighbors = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: 1 },
      ]
        .map((n) => ({ x: current.x + n.x, y: current.y + n.y }))
        .filter((n) => map[n.y]?.[n.x] === '.')
        .filter((n) => !closed.some((c) => eq(c, n)))

      for (let n of neighbors) {
        const node = {
          ...n,
          path: [...current.path, n],
        }
        open.unshift(node)
      }
    }
  }

  const findCheats = (path, cheatLength) => {
    let cheats = []
    for (let p1 = 0; p1 < path.length; p1++) {
      for (let p2 = p1 + 1; p2 < path.length; p2++) {
        const distance = d(path[p1], path[p2])
        const cheatDistance = p2 - p1 - distance
        if (distance >= 2 && distance <= cheatLength && cheatDistance > 0) {
          cheats.push({
            p1,
            p2,
            pp1: path[p1],
            pp2: path[p2],
            saved: cheatDistance,
          })
        }
      }
    }
    return cheats
  }

  const path = findPath(start, end)

  let cheats = findCheats(path.path, 2)
  let output = cheats.filter((x) => x.saved >= 100).length
  console.log('part 1:', output)

  cheats = findCheats(path.path, 20)
  output = cheats.filter((x) => x.saved >= 100).length
  console.log('part 2:', output)
}
