export default function (input) {
  let map = input.map((i) => i.split(''))

  let start = {}
  findstart: for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (map[y][x] === '^') {
        start = { x, y, dir: '^' }
        map[y][x] = '.'
        break findstart
      }
    }
  }

  const get = (x, y, map) => (map[y] ? (map[x] ? map[y][x] : null) : null)

  const move = (pos) => {
    switch (pos.dir) {
      case '>':
        return { x: pos.x + 1, y: pos.y, dir: '>' }
      case 'v':
        return { x: pos.x, y: pos.y + 1, dir: 'v' }
      case '<':
        return { x: pos.x - 1, y: pos.y, dir: '<' }
      case '^':
        return { x: pos.x, y: pos.y - 1, dir: '^' }
    }
  }
  const rotation = ['>', 'v', '<', '^']

  let positions = new Set()
  let pos = { ...start }
  while (true) {
    positions.add(`${pos.x}:${pos.y}`)

    const forward = move(pos)
    if (get(forward.x, forward.y, map) === null) {
      break
    } else if (get(forward.x, forward.y, map) === '.') {
      pos = forward
    } else {
      pos.dir = rotation[(rotation.indexOf(pos.dir) + 1) % rotation.length]
      pos = move(pos)
    }

    if (!get(pos.x, pos.y, map)) {
      break
    }
  }

  console.log('part 1:', positions.size)

  const findLoop = (obstruction) => {
    const [ox, oy] = obstruction.split(':')
    let map2 = map.clone()
    map2[oy][ox] = 'O'

    let positions = new Set()
    let pos = { ...start }
    while (true) {
      const hash = `${pos.x}:${pos.y}:${pos.dir}`
      if (positions.has(hash)) {
        return true
      }
      positions.add(hash)

      let foundNext = false
      while (!foundNext) {
        const forward = move(pos)
        if (get(forward.x, forward.y, map2) === null) {
          // walk out of bounds
          return false
        } else if (get(forward.x, forward.y, map2) === '.') {
          // Found good position
          pos = forward
          foundNext = true
        } else {
          // Rotate clockwise
          pos.dir = rotation[(rotation.indexOf(pos.dir) + 1) % rotation.length]
        }
      }
    }
  }

  const possibleObstructions = positions
  possibleObstructions.delete(`${start.x}:${start.y}`)
  const output = Array.from(possibleObstructions).filter(findLoop).length
  console.log('part 2:', output)
}
