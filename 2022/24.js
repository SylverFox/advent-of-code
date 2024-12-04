import { lcm } from '../common.js'

export default function (input) {
  let map = input.map((r) => r.split(''))

  const startX = map[0].findIndex((x) => x === '.') - 1
  const endX = map[map.length - 1].findIndex((x) => x === '.') - 1

  map = map.slice(1, -1).map((r) => r.slice(1, -1))

  let blizzards = []
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === '<') {
        blizzards.push({ x, y, dir: { x: map[0].length - 1, y: 0 } })
      } else if (map[y][x] === '^') {
        blizzards.push({ x, y, dir: { x: 0, y: map.length - 1 } })
      } else if (map[y][x] === '>') {
        blizzards.push({ x, y, dir: { x: 1, y: 0 } })
      } else if (map[y][x] === 'v') {
        blizzards.push({ x, y, dir: { x: 0, y: 1 } })
      }
      map[y][x] = '.'
    }
  }

  const directions = [
    { x: 0, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
  ]
  const lcmSteps = lcm(map.length, map[0].length)
  let routes = [{ x: startX, y: -1 }],
    steps = 0,
    cache = Array(lcmSteps)
      .fill()
      .map(() => [])
  main: while (true) {
    let newRoutes = []
    steps++

    const blizzardsOnStep = blizzards.map((b) => ({
      x: (b.x + steps * b.dir.x) % map[0].length,
      y: (b.y + steps * b.dir.y) % map.length,
    }))

    while (routes.length) {
      const next = routes.shift()

      if (next.y === map.length - 1 && next.x === endX) {
        // Can go to exit now
        break main
      }

      for (let d of directions) {
        const pos = { x: next.x + d.x, y: next.y + d.y }
        const hash = `${pos.x},${pos.y}`
        if (cache[steps % lcmSteps].includes(hash)) continue
        if (pos.x === startX && pos.y === -1) {
          // wait on first position is also an option
          newRoutes.push({ x: pos.x, y: pos.y })
          cache[steps % lcmSteps].push(hash)
        }
        if (!map[pos.y] || !map[pos.y][pos.x]) continue
        if (!blizzardsOnStep.some((b) => b.x === pos.x && b.y === pos.y)) {
          newRoutes.push({ x: pos.x, y: pos.y })
          cache[steps % lcmSteps].push(hash)
        }
      }
    }

    routes = newRoutes
  }

  console.log('Part 1:', steps)

  ;(routes = [{ x: endX, y: map.length }]),
    (cache = Array(lcmSteps)
      .fill()
      .map(() => []))
  main: while (true) {
    let newRoutes = []
    steps++

    const blizzardsOnStep = blizzards.map((b) => ({
      x: (b.x + steps * b.dir.x) % map[0].length,
      y: (b.y + steps * b.dir.y) % map.length,
    }))

    while (routes.length) {
      const next = routes.shift()

      if (next.y === 0 && next.x === startX) {
        // Can go to exit now
        break main
      }

      for (let d of directions) {
        const pos = { x: next.x + d.x, y: next.y + d.y }
        const hash = `${pos.x},${pos.y}`
        if (cache[steps % lcmSteps].includes(hash)) continue
        if (pos.x === endX && pos.y === map.length) {
          // wait on first position is also an option
          newRoutes.push({ x: pos.x, y: pos.y })
          cache[steps % lcmSteps].push(hash)
        }
        if (!map[pos.y] || !map[pos.y][pos.x]) continue
        if (!blizzardsOnStep.some((b) => b.x === pos.x && b.y === pos.y)) {
          newRoutes.push({ x: pos.x, y: pos.y })
          cache[steps % lcmSteps].push(hash)
        }
      }
    }

    routes = newRoutes
    if (!routes.length) {
      console.log('no routes left')
      return
    }
  }

  // Fuck it just do it again
  ;(routes = [{ x: startX, y: -1 }]),
    (cache = Array(lcmSteps)
      .fill()
      .map(() => []))
  main: while (true) {
    let newRoutes = []
    steps++

    const blizzardsOnStep = blizzards.map((b) => ({
      x: (b.x + steps * b.dir.x) % map[0].length,
      y: (b.y + steps * b.dir.y) % map.length,
    }))

    while (routes.length) {
      const next = routes.shift()

      if (next.y === map.length - 1 && next.x === endX) {
        // Can go to exit now
        break main
      }

      for (let d of directions) {
        const pos = { x: next.x + d.x, y: next.y + d.y }
        const hash = `${pos.x},${pos.y}`
        if (cache[steps % lcmSteps].includes(hash)) continue
        if (pos.x === startX && pos.y === -1) {
          // wait on first position is also an option
          newRoutes.push({ x: pos.x, y: pos.y })
          cache[steps % lcmSteps].push(hash)
        }
        if (!map[pos.y] || !map[pos.y][pos.x]) continue
        if (!blizzardsOnStep.some((b) => b.x === pos.x && b.y === pos.y)) {
          newRoutes.push({ x: pos.x, y: pos.y })
          cache[steps % lcmSteps].push(hash)
        }
      }
    }

    routes = newRoutes
  }

  console.log('Part 2:', steps)
}
