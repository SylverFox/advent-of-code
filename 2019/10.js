const gcd = (a, b) => (b ? gcd(b, a % b) : a)

function inLineOfSight(ax, ay, mx, my, map) {
  const dy = ay - my
  const dx = ax - mx
  const divisor = gcd(Math.abs(dy), Math.abs(dx))
  const stepY = dy / divisor
  const stepX = dx / divisor

  let blocked = false
  let x = mx + stepX,
    y = my + stepY
  while (x !== ax || y !== ay) {
    if (map[y][x] === '#') {
      blocked = true
      break
    }

    x += stepX
    y += stepY
  }

  return !blocked
}

function testAsteroid(mx, my, map) {
  let asteroids = 0
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if ((y === my && x === mx) || map[y][x] === '.') continue

      if (inLineOfSight(x, y, mx, my, map)) {
        asteroids++
      }
    }
  }
  return asteroids
}

export default function (input) {
  const map = input.map((l) => l.split(''))
  map.forEach((m) => console.log(m.join(' ')))
  console.log(`width: ${map[0].length}, height: ${map.length}`)

  let max = 0,
    position
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] !== '#') continue

      const amountVisible = testAsteroid(x, y, map)
      if (amountVisible > max) {
        max = amountVisible
        position = { x, y }
      }
    }
  }
  console.log('Part 1:', max)

  // map[position.y][position.x] = 'X'
  // map.forEach(m => console.log(m.join(' ')))
  // console.log('Station:', JSON.stringify(position))

  const pointData = []
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === '#') {
        const angle =
          ((Math.atan2(position.y - y, position.x - x) * 180) / Math.PI +
            180 +
            90) %
          360
        const distance = Math.sqrt(
          (position.y - y) ** 2 + (position.x - x) ** 2
        )
        pointData.push({
          angle,
          distance,
          position: { x, y },
        })
      }
    }
  }
  pointData.sort((a, b) =>
    a.angle !== b.angle ? a.angle - b.angle : a.distance - b.distance
  )

  let lastAngle = -1,
    vaporized = 0,
    lastAsteroidHit
  while (vaporized < 200) {
    const next = pointData.findIndex((p) => p.angle > lastAngle)
    if (next !== -1) {
      // console.log(vaporized, lastAngle.toFixed(2), next, pointData[next])

      vaporized++
      const asteroid = pointData.splice(next, 1)[0]
      lastAsteroidHit = asteroid.position
      lastAngle = asteroid.angle

      // map[asteroid.position.y][asteroid.position.x] = 'o'
      // map.forEach(r => console.log(r.join('')))
      // console.log(pointData.length, 'asteroids left')
      // map[asteroid.position.y][asteroid.position.x] = '.'
    } else {
      lastAngle = -1
    }
  }

  console.log('Part 2:', lastAsteroidHit.x * 100 + lastAsteroidHit.y)
}
