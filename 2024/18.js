export default function (input) {
  const WIDTH = 71
  const HEIGHT = 71
  const START = { x: 0, y: 0 }
  const END = { x: WIDTH - 1, y: HEIGHT - 1 }
  const BYTES = 1024

  let map = [...Array(HEIGHT)].map(() => Array(WIDTH).fill('.'))

  for (let i of input.slice(0, BYTES)) {
    const [x, y] = i.split(',')
    map[y][x] = '#'
  }

  const eq = (p1, p2) => p1.x === p2.x && p1.y === p2.y
  const h = (p1, p2) => Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)

  const findPath = (map, start, end) => {
    let open = [{ ...start, d: 0, h: h(start, end), path: [start] }]
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
          d: current.d + 1,
          h: h(n, end),
          path: [...current.path, n],
        }
        const inOpen = open.findIndex(
          (o) => eq(o, node) && o.d + o.h > node.d + node.h
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

  const output = findPath(map, START, END)
  console.log('part 1:', output.d)

  let MIN = BYTES
  let MAX = input.length - 1
  while (MIN < MAX) {
    let map = [...Array(HEIGHT)].map(() => Array(WIDTH).fill('.'))
    const split = (MIN + MAX) >> 1
    for (let i = 0; i <= split; i++) {
      const [x, y] = input[i].split(',')
      map[y][x] = '#'
    }
    const path = findPath(map, START, END)
    if (path) {
      MIN = split + 1
    } else {
      MAX = split - 1
    }
  }
  console.log('part 2:', input[MIN])
}
