export default function (input) {
  const HEIGHT = input.length
  const WIDTH = input[0].length

  const map = input.map((i) => i.split(''))
  let start, end
  targets: for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      if (map[y][x] === 'S') {
        start = { x, y }
      } else if (map[y][x] === 'E') {
        end = { x, y }
      }
      if (start && end) break targets
    }
  }

  const eq = (p1, p2) => p1.x === p2.x && p1.y === p2.y
  const eqd = (p1, p2) => p1.dir === p2.dir && eq(p1, p2)
  const h = (p1, p2) => Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)
  const uniquePath = (paths) =>
    paths.filter((e, i, a) => a.findIndex((x) => eq(x, e)) === i)

  const findShortestPath = (start, end) => {
    const open = [
      { ...start, dir: '>', cost: 0, h: h(start, end), path: [start] },
    ]
    const closed = []
    const pathCostCache = new Map()

    while (open.length) {
      const current = open.shift()
      closed.push(current)

      if (eq(current, end)) {
        return current
      }

      const neighbors = [
        { x: 1, y: 0, dir: '>' },
        { x: 0, y: 1, dir: 'v' },
        { x: -1, y: 0, dir: '<' },
        { x: 0, y: -1, dir: '^' },
      ]
        .map((n) => ({ ...n, x: n.x + current.x, y: n.y + current.y }))
        .filter((n) => map[n.y]?.[n.x] !== '#')
        .filter((n) => !current.path.some((c) => eq(n, c)))
        .map((n) => ({
          ...n,
          path: [...structuredClone(current.path), { x: n.x, y: n.y }],
          cost: current.cost + (n.dir !== current.dir ? 1001 : 1),
          h: h(n, end),
        }))

      for (let n of neighbors) {
        const costHash = `${n.x}:${n.y}:${n.dir}`
        if (
          pathCostCache.has(costHash) &&
          pathCostCache.get(costHash) < n.cost
        ) {
          // abandon if there was a better path at this point sometime before
          continue
        }
        pathCostCache.set(costHash, n.cost)

        const dupe = open.findIndex((o) => eqd(o, n))
        if (dupe === -1) {
          // No duplicate path, add new branch
          open.unshift(n)
        } else {
          if (n.cost < open[dupe].cost) {
            // replace with better path
            open[dupe] = n
          } else if (n.cost === open[dupe].cost) {
            // merge paths
            open[dupe].path = uniquePath([...open[dupe].path, ...n.path])
          } else {
            // abandon path
            continue
          }
        }
      }

      open.sort((a, b) => a.cost + a.h - (b.cost + b.h))
    }
    return bestPathPositions
  }

  const bestPath = findShortestPath(start, end)
  console.log('part 1:', bestPath.cost)
  console.log('part 2:', bestPath.path.length)
}
