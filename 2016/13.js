export default function (input) {
  const MAGIC_NUM = Number(input[0])

  let wallCache = []
  const wall = ({ x, y }) => {
    if (!wallCache[`${x},${y}`]) {
      wallCache[`${x},${y}`] =
        (x * x + 3 * x + 2 * x * y + y + y * y + MAGIC_NUM)
          .toString(2)
          .split('')
          .filter((x) => x === '1').length %
          2 ===
        1
    }
    return wallCache[`${x},${y}`]
  }

  let paths = [{ x: 1, y: 1 }],
    cache = [],
    steps = 0,
    locations
  main: while (true) {
    let newPaths = []
    steps++
    layer: while (paths.length) {
      const next = paths.shift()

      const neighbours = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ]
        .map((n) => ({ x: next.x + n[0], y: next.y + n[1] }))
        .filter((n) => n.y >= 0 && n.x >= 0)
        .filter((n) => !wall(n))

      for (let n of neighbours) {
        if (n.x === 31 && n.y === 39) {
          break main
        }
        if (cache.includes(JSON.stringify(n))) continue
        cache.push(JSON.stringify(n))
        newPaths.push(n)
      }
    }
    paths = newPaths

    if (steps === 50) {
      locations = cache.length
    }
  }
  console.log('Part 1:', steps)
  console.log('Part 2:', locations)
}
