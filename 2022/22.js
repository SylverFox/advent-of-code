export default function (input) {
  let maxWidth = Math.max(...input.slice(0, -2).map((r) => r.length))
  const map = input.slice(0, -2).map((i) => i.padEnd(maxWidth, ' ').split(''))

  const instructions = input[input.length - 1].match(/[LR]|\d+/g)

  const startX = map[0].findIndex((x) => x === '.')

  const nextPos = (pos, dir) => {
    let { x, y } = JSON.parse(JSON.stringify(pos))
    if (dir === 0) {
      do {
        x = (x + 1) % map[0].length
      } while (map[y][x] === ' ')
    } else if (dir === 1) {
      do {
        y = (y + 1) % map.length
      } while (map[y][x] === ' ')
    } else if (dir === 2) {
      do {
        x = (x - 1 + map[0].length) % map[0].length
      } while (map[y][x] === ' ')
    } else {
      do {
        y = (y - 1 + map.length) % map.length
      } while (map[y][x] === ' ')
    }

    return map[y][x] === '#' ? pos : { x, y }
  }

  let position = { x: startX, y: 0 },
    direction = 0
  for (let instruction of instructions) {
    if (instruction === 'R') direction = (direction + 1) % 4
    else if (instruction === 'L') direction = (direction + 3) % 4
    else
      for (let _ in Array(instruction / 1).fill())
        position = nextPos(position, direction)
  }
  console.log(
    'Part 1:',
    1000 * (position.y + 1) + 4 * (position.x + 1) + direction
  )

  const nextPos2 = (pos, dir) => {
    let { x, y } = JSON.parse(JSON.stringify(pos))
    if (dir === 0) {
      do {
        x = (x + 1) % map[0].length
      } while (map[y][x] === ' ')
    } else if (dir === 1) {
      do {
        y = (y + 1) % map.length
      } while (map[y][x] === ' ')
    } else if (dir === 2) {
      do {
        x = (x - 1 + map[0].length) % map[0].length
      } while (map[y][x] === ' ')
    } else {
      do {
        y = (y - 1 + map.length) % map.length
      } while (map[y][x] === ' ')
    }

    return map[y][x] === '#' ? pos : { x, y }
  }

  ;(position = { x: startX, y: 0 }), (direction = 0)
  for (let instruction of instructions) {
    if (instruction === 'R') direction = (direction + 1) % 4
    else if (instruction === 'L') direction = (direction + 3) % 4
    else
      for (let _ in Array(instruction / 1).fill())
        position = nextPos2(position, direction)
  }
  console.log(
    'Part 2:',
    1000 * (position.y + 1) + 4 * (position.x + 1) + direction
  )

  const HEIGHT = map.length,
    WIDTH = map[0].length

  const CUBE_RIB = Math.sqrt((WIDTH * HEIGHT) / 12)
  console.log(WIDTH, HEIGHT, CUBE_RIB)
  return
}
