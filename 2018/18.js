export default function (input) {
  let map = input.map((i) => i.split(''))
  const HEIGHT = map.length
  const WIDTH = map[0].length

  const neighbors = (pos, map) =>
    [
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ]
      .map((p) => ({ x: p.x + pos.x, y: p.y + pos.y }))
      .map((p) => map[p.y]?.[p.x])
      .filter((p) => p)

  const forward = (map) => {
    const newMap = []
    for (let y = 0; y < HEIGHT; y++) {
      newMap[y] = []
      for (let x = 0; x < WIDTH; x++) {
        const n = neighbors({ x, y }, map)
        if (map[y][x] === '.') {
          newMap[y][x] = n.filter((n) => n === '|').length >= 3 ? '|' : '.'
        } else if (map[y][x] === '|') {
          newMap[y][x] = n.filter((n) => n === '#').length >= 3 ? '#' : '|'
        } else {
          newMap[y][x] =
            n.some((n) => n === '#') && n.some((n) => n === '|') ? '#' : '.'
        }
      }
    }
    return newMap
  }

  const run = (initialMap, minutes) => {
    let map = structuredClone(initialMap)
    let cache = new Map()
    for (let m = 1; m <= minutes; m++) {
      map = forward(map)

      const hash = map.map((r) => r.join('')).join('')
      if (cache.has(hash)) {
        m = minutes - ((minutes - m) % (m - cache.get(hash)))
      } else {
        cache.set(hash, m)
      }
    }
    return map
  }

  const score = (map) => {
    const wood = map.flatMap((row) => row.filter((x) => x === '|')).length
    const lumber = map.flatMap((row) => row.filter((x) => x === '#')).length
    return wood * lumber
  }

  console.log('part 1:', score(run(map, 10)))
  console.log('part 2:', score(run(map, 1000000000)))
}
