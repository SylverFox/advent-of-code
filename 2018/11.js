export default function (input) {
  input = Number(input[0])

  const powerLevel = (x, y) =>
    Math.floor(((((x + 10) * y + input) * (x + 10)) % 1000) / 100) - 5

  let powerCache = new Map()
  const powerLevelGrid = (x, y, s) => {
    if (s < 1) return 0
    else if (s === 1) return powerLevel(x, y)
    else {
      const hash = [x, y, s].join(':')
      if (powerCache.has(hash)) return powerCache.get(hash)

      let power
      if (s % 2 === 0) {
        const mid = s / 2
        const tl = powerLevelGrid(x, y, mid)
        const tr = powerLevelGrid(x + mid, y, mid)
        const bl = powerLevelGrid(x, y + mid, mid)
        const br = powerLevelGrid(x + mid, y + mid, mid)
        power = tl + tr + bl + br
      } else {
        power = powerLevelGrid(x + 1, y + 1, s - 1)

        for (let i = x; i < x + s; i++) {
          power += powerLevel(i, y)
        }
        for (let j = y + 1; j < y + s; j++) {
          power += powerLevel(x, j)
        }
      }

      powerCache.set(hash, power)
      return power
    }
  }

  let maxPower = 0,
    solution
  for (let y = 1; y <= 298; y++) {
    for (let x = 1; x <= 298; x++) {
      const power = powerLevelGrid(x, y, 3)
      if (power > maxPower) {
        maxPower = power
        solution = { x, y }
      }
    }
  }
  console.log('part 1:', `${solution.x},${solution.y}`)

  maxPower = -Infinity
  for (let s = 1; s <= 20; s++) {
    for (let y = 1; y <= 298; y++) {
      for (let x = 1; x <= 298; x++) {
        const power = powerLevelGrid(x, y, s)
        if (power > maxPower) {
          maxPower = power
          solution = { x, y, s }
        }
      }
    }
  }
  console.log('part 2:', `${solution.x},${solution.y},${solution.s}`)
}
