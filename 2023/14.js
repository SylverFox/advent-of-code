export default function (input) {
  const HEIGHT = input.length
  const WIDTH = input[0].length

  const tilt = (input, direction) => {
    let map = [...Array(HEIGHT)].map(() => Array(WIDTH).fill('.'))
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        if (input[y][x] === '#') {
          map[y][x] = '#'
        }
      }
    }

    if (['north', 'west'].includes(direction)) {
      for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
          if (input[y][x] === 'O') {
            if (direction === 'north') {
              const column = [...Array(y + 1)].map((_, i) => map[y - i][x])
              let yRolling = column.findIndex((c) => c !== '.')
              if (yRolling === -1) yRolling = column.length
              map[y - yRolling + 1][x] = 'O'
            } else if (direction === 'west') {
              const column = map[y].slice(0, x + 1).reverse()
              let yRolling = column.findIndex((c) => c !== '.')
              if (yRolling === -1) yRolling = column.length
              map[y][x - yRolling + 1] = 'O'
            }
          }
        }
      }
    } else {
      for (let y = HEIGHT - 1; y >= 0; y--) {
        for (let x = WIDTH - 1; x >= 0; x--) {
          if (input[y][x] === 'O') {
            if (direction === 'south') {
              const column = [...Array(HEIGHT)].map((_, i) => map[i][x])
              let yRolling = column.findIndex((c, i) => i >= y && c !== '.')
              if (yRolling === -1) yRolling = HEIGHT
              map[yRolling - 1][x] = 'O'
            } else if (direction === 'east') {
              let yRolling = map[y].findIndex((c, i) => i >= x && c !== '.')
              if (yRolling === -1) yRolling = WIDTH
              map[y][yRolling - 1] = 'O'
            }
          }
        }
      }
    }
    return map
  }

  const load = (map) =>
    map
      .reverse()
      .map((row, i) => (i + 1) * row.filter((c) => c === 'O').length)
      .sum()

  let map = tilt(input, 'north')
  console.log('part 1:', load(map))

  const order = ['north', 'west', 'south', 'east'],
    cycles = 1000000000 * 4
  let cache = {},
    cacheHit = false
  map = input
  for (let i = 0; i < cycles; i++) {
    map = tilt(map, order[i % 4])
    const hash = order[i % 4] + ';' + map.map((row) => row.join('')).join('')

    if (!cacheHit && cache[hash]) {
      cacheHit = true
      i = cycles - ((cycles - cache[hash]) % (i - cache[hash])) - 1
    } else {
      cache[hash] = i
    }
  }
  console.log('part 2:', load(map))
}
