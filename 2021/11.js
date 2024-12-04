export default function (input) {
  let map = input.map((line) => line.split('').map(Number))
  let flashes = 0

  const step = () => {
    // Increment all first and track the first flashes
    let flashing = [],
      hasFlashed = []
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[0].length; x++) {
        if (map[y][x] < 9) {
          map[y][x]++
        } else {
          map[y][x] = 0
          flashing.push({ x, y })
          hasFlashed.push(`${x},${y}`)
          flashes++
        }
      }
    }

    // Keep flashing subsequent neighbours
    while (flashing.length) {
      const next = flashing.shift()

      // console.log('next:',next)
      // map.forEach(r => console.log(r.join('')))
      // console.log()

      for (let y = next.y - 1; y <= next.y + 1; y++) {
        for (let x = next.x - 1; x <= next.x + 1; x++) {
          if (y === next.y && x === next.x) continue // Skip middle
          if (x < 0 || y < 0 || y >= map.length || x >= map[y].length) continue // Out of bounds
          if (hasFlashed.includes(`${x},${y}`)) continue // Skip if already flashed
          if (map[y][x] < 9) {
            map[y][x]++
          } else {
            map[y][x] = 0
            hasFlashed.push(`${x},${y}`)
            flashing.push({ x, y })
            flashes++
          }
        }
      }
    }
  }

  let i = 0
  while (i++ < 100) {
    step()
  }
  console.log('Part 1:', flashes)

  const allFlashing = () =>
    map.map((r) => r.join('')).join('') ===
    '0'.repeat(map.length * map[0].length)
  while (!allFlashing()) {
    step()
    i++
  }
  console.log('Part 2:', i - 1)
}
