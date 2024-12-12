export default function (input) {
  input = input.map((i) => i.split(''))

  let cache = new Map()
  const findRegions = (input) => {
    const hash = input.map((i) => i.x + ':' + i.y).join(',')
    if (cache.has(hash)) return cache.get(hash)

    let regions = []
    let map = structuredClone(input)
    let open = [{ x: 0, y: 0 }]
    let closed = []
    while (open.length) {
      let region = [open[0]]
      while (open.length) {
        const current = open.pop()
        closed.push(current)

        const neighbors = [
          { x: 1, y: 0 },
          { x: 0, y: 1 },
          { x: -1, y: 0 },
          { x: 0, y: -1 },
        ]
          .map((n) => ({ x: n.x + current.x, y: n.y + current.y }))
          .filter((n) => map[n.y]?.[n.x] === map[current.y][current.x])
          .filter((n) => !closed.find((c) => c.x === n.x && c.y === n.y))
          .filter((n) => !open.find((c) => c.x === n.x && c.y === n.y))

        region.push(...neighbors)
        open.push(...neighbors)
      }
      regions.push(region)
      findnew: for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
          if (!closed.find((c) => c.x === x && c.y === y)) {
            open = [{ x, y }]
            break findnew
          }
        }
      }
    }

    cache.set(hash, regions)
    return regions
  }

  const getCost = (region) => {
    let perimeter = 0
    for (let r of region) {
      const neighbors = [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: 0, y: -1 },
      ]
        .map((n) => ({ x: n.x + r.x, y: n.y + r.y }))
        .filter((n) => region.find((r) => r.x === n.x && r.y === n.y))
      perimeter += 4 - neighbors.length
    }
    return perimeter * region.length
  }

  const regions = findRegions(input)
  console.log('part 1:', regions.map(getCost).sum())

  const countSides = (region) => {
    const minX = Math.min(...region.map((r) => r.x))
    const minY = Math.min(...region.map((r) => r.y))
    const maxX = Math.max(...region.map((r) => r.x))
    const maxY = Math.max(...region.map((r) => r.y))

    const fullRegion = [...Array(maxY - minY + 1)].map(() =>
      '.'.repeat(maxX - minX + 1).split('')
    )
    region.forEach((r) => (fullRegion[r.y - minY][r.x - minX] = '#'))
    const antiRegions = findRegions(fullRegion)
    // remove our region
    antiRegions.splice(
      antiRegions.findIndex((ar) =>
        ar.find((r) => r.x === region[0].x - minX && r.y === region[0].y - minY)
      ),
      1
    )

    let sum = 4
    for (let ar of antiRegions) {
      sum += countSides(ar)
      if (
        ar.some(
          (r) =>
            (r.x === 0 || r.x === maxX - minX) &&
            (r.y === 0 || r.y === maxY - minY)
        )
      ) {
        sum -= 2
      }
    }
    return sum
  }

  const getCost2 = (region) => region.length * countSides(region)
  console.log('part 2:', regions.map(getCost2).sum())
}
