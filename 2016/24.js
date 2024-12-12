export default function (input) {
  const HEIGHT = input.length
  const WIDTH = input[0].length

  const map = input
  let targets = [],
    start
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      if (!['.', '#'].includes(map[y][x])) {
        if (map[y][x] === '0') start = { x, y }
        else targets.push({ x, y })
      }
    }
  }

  const manhattan = (p1, p2) => Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)
  const shortestDistance = (p1, p2) => {
    let open = [{ pos: p1, d: 0, h: manhattan(p1, p2) }]
    let closed = []
    let i = 0

    while (open.length) {
      const current = open.shift()

      if (manhattan(current.pos, p2) === 0) {
        return current.d
      }

      closed.push(current.pos)

      const neighbors = [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: 0, y: -1 },
      ]
        .map((p) => ({ x: p.x + current.pos.x, y: p.y + current.pos.y }))
        .filter((p) => map[p.y]?.[p.x] !== '#')
        .filter((p) => !closed.some((c) => c.x === p.x && c.y === p.y))

      for (let n of neighbors) {
        const node = { pos: n, d: current.d + 1, h: manhattan(n, p2) }
        const inOpen = open.findIndex(
          (o) => o.x === n.x && o.y === n.y && o.d + o.h > node.d + node.h
        )
        if (inOpen >= 0) {
          open[inOpen] = node
        } else {
          open.unshift(node)
        }
      }

      open = open.sort((a, b) => a.h + a.d - b.h - b.d)
    }
  }

  let pathCache = new Map()
  const memoizedShortestDistance = (p1, p2) => {
    const hash1 = `${p1.x},${p1.y};${p2.x},${p2.y}`
    const hash2 = `${p2.x},${p2.y};${p1.x},${p1.y}`
    if (pathCache.has(hash1)) return pathCache.get(hash1)
    if (pathCache.has(hash2)) return pathCache.get(hash2)
    const dist = shortestDistance(p1, p2)
    pathCache.set(hash1, dist)
    pathCache.set(hash2, dist)
    return dist
  }

  const findShortestPath = (current, targets, end) => {
    if (!targets.length) return end ? memoizedShortestDistance(current, end) : 0
    const distances = targets.map(
      (t, i) =>
        memoizedShortestDistance(current, t) +
        findShortestPath(
          t,
          [...targets.slice(0, i), ...targets.slice(i + 1)],
          end
        )
    )
    return Math.min(...distances)
  }

  console.log('part 1:', findShortestPath(start, targets))
  console.log('part 2:', findShortestPath(start, targets, start))
}
