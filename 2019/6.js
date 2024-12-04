export default function (input) {
  let map = []
  for (let pair of input) {
    const [A, B] = pair.split(')')
    let mapObject = map.find((o) => o.obj === A)
    if (!mapObject) {
      map.push({
        obj: A,
        orbiters: [B],
      })
    } else if (!mapObject.orbiters.some((moo) => moo === B)) {
      mapObject.orbiters.push(B)
    }
  }

  console.log(map)

  const followOrbiters = (name, depth) => {
    const m = map.find((m) => m.obj === name)
    if (!m) {
      return depth
    } else {
      return m.orbiters.reduce(
        (a, b) => a + followOrbiters(b, depth + 1),
        depth
      )
    }
  }

  const orbits = followOrbiters('COM', 0)
  console.log('Part 1:', orbits)

  const distToObj = (name, target) => {
    if (name === target) {
      return 1
    }

    const m = map.find((m) => m.obj === name)
    if (!m) {
      return 0
    } else {
      const dist = m.orbiters
        .map((orb) => distToObj(orb, target))
        .filter((orb) => orb > 0)
      return dist.length ? Math.min(dist) + 1 : 0
    }
  }

  const distToCrossing = map
    .map((m) => ({
      obj: m.obj,
      san: distToObj(m.obj, 'SAN'),
      you: distToObj(m.obj, 'YOU'),
    }))
    .filter((m) => m.san > 0 && m.you > 0)
    .map((m) => m.san - 2 + m.you - 2)

  console.log('Part 2:', Math.min(...distToCrossing))
}
