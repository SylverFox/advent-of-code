export default function (input) {
  const map = input.map((i) => i.split(''))
  let units = []
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (!['#', '.'].includes(map[y][x])) {
        units.push({ x, y, type: map[y][x], hp: 200, ap: 3 })
        map[y][x] = '.'
      }
    }
  }

  const eq = (p1, p2) => p1.x === p2.x && p1.y === p2.y
  const dist = (p1, p2) => Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)

  const print = (m = map, u = units) => {
    const copy = structuredClone(m)
    u.forEach((u) => (copy[u.y][u.x] = u.type ?? 'X'))
    u.forEach((u) => copy[u.y].push(` ${u.type ?? 'X'}(${u.hp})`))
    copy.forEach((row) => console.log(row.join('')))
    console.log()
  }

  const dijkstra = (start, units) => {
    let open = [{ ...start, d: 0, p: [start] }]
    let closed = units.filter((u) => u.type === start.type)
    const targets = units.filter((u) => u.type !== start.type)
    let maxDistance = Infinity
    let hits = []
    while (open.length) {
      const current = open.shift()
      closed.push(current)

      if (current.d > maxDistance) continue

      if (targets.some((t) => eq(current, t))) {
        maxDistance = current.d
        hits.push({
          ...current,
          ...targets.find((t) => eq(current, t)),
        })
        continue
      }
      ;[
        { x: 0, y: -1 },
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
      ]
        .map((n) => ({ x: n.x + current.x, y: n.y + current.y }))
        .filter((n) => map[n.y]?.[n.x] === '.')
        .filter((n) => !closed.some((c) => eq(n, c)))
        .filter((n) => !open.some((o) => eq(n, o)))
        .map((n) => ({
          ...n,
          d: current.d + 1,
          p: [...structuredClone(current.p), n],
        }))
        .forEach((n) => open.push(n))
    }
    // sort hits by final square in reading order
    hits.sort((a, b) => {
      const ap = a.p[a.p.length - 2]
      const bp = b.p[b.p.length - 2]
      return ap.y === bp.y ? ap.x - bp.x : ap.y - bp.y
    })
    return hits
  }

  const play = (units) => {
    units = structuredClone(units)
    let rounds = 0
    const unique = (e, i, a) => a.indexOf(e) === i
    const done = () => units.map((u) => u.type).filter(unique).length === 1
    while (!done()) {
      let doneBeforeRoundEnds = false
      for (let u = 0; u < units.length; u++) {
        if (done()) {
          doneBeforeRoundEnds = true
          break
        }
        const closestEnemies = dijkstra(units[u], units)
        if (!closestEnemies.length) continue

        if (closestEnemies[0].d >= 2) {
          // move towards enemy
          units[u] = { ...units[u], ...closestEnemies[0].p[1] }
        }
        if (closestEnemies[0].d <= 2) {
          // enemies were or are now in range
          const enemies = units.filter(
            (u2) => u2.type !== units[u].type && dist(u2, units[u]) === 1
          )
          enemies.sort((a, b) =>
            a.hp === b.hp ? (a.y === b.y ? a.x - b.x : a.y - b.y) : a.hp - b.hp
          )
          enemies[0].hp -= units[u].ap
          if (enemies[0].hp <= 0) {
            const unitIndex = units.indexOf(enemies[0])
            units.splice(unitIndex, 1)

            if (unitIndex < u) u--
          }
        }
      }
      units.sort((a, b) => (a.y === b.y ? a.x - b.x : a.y - b.y))
      if (!doneBeforeRoundEnds) rounds++
    }
    return { rounds, units }
  }

  const score = ({ rounds, units }) => rounds * units.map((u) => u.hp).sum()
  const countElves = (units) => units.filter((u) => u.type === 'E').length

  console.log('part 1:', score(play(units)))

  let numElves = countElves(units)
  while (true) {
    units.filter((u) => u.type === 'E').forEach((u) => u.ap++)
    const result = play(units)
    if (countElves(result.units) === numElves) {
      console.log('part 2:', score(result))
      break
    }
  }
}
