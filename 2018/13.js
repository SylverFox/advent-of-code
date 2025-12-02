export default function (input) {
  const DIRECTIONS = ['^', '>', 'v', '<']
  const CHOICES = ['l', 's', 'r']

  const map = input.map((i) => i.split(''))

  let initialCarts = []
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (['^', '>', 'v', '<'].includes(map[y][x])) {
        initialCarts.push({ x, y, dir: map[y][x], next: 'l' })

        // replace carts with correct track
        const top = ['|', '\\', '/', '+'].includes(map[y - 1]?.[x])
        const right = ['-', '\\', '/', '+'].includes(map[y]?.[x + 1])
        const bottom = ['|', '\\', '/', '+'].includes(map[y + 1]?.[x])
        const left = ['-', '\\', '/', '+'].includes(map[y]?.[x - 1])
        if (top + right + bottom + left >= 3) {
          map[y][x] = '+'
        } else if (top && bottom) {
          map[y][x] = '|'
        } else if (right && left) {
          map[y][x] = '-'
        } else if ((top && right) || (bottom && left)) {
          map[y][x] = '\\'
        } else if ((right && bottom) || (left && top)) {
          map[y][x] = '/'
        }
      }
    }
  }

  const rotateRight = (dir) =>
    DIRECTIONS[(DIRECTIONS.indexOf(dir) + 1) % DIRECTIONS.length]
  const rotateLeft = (dir) =>
    DIRECTIONS[(DIRECTIONS.indexOf(dir) + 3) % DIRECTIONS.length]
  const nextChoice = (next) =>
    CHOICES[(CHOICES.indexOf(next) + 1) % CHOICES.length]
  const dirToCoord = (dir) => {
    switch (dir) {
      case '^':
        return { x: 0, y: -1 }
      case '>':
        return { x: 1, y: 0 }
      case 'v':
        return { x: 0, y: 1 }
      case '<':
        return { x: -1, y: 0 }
    }
  }

  const nextPosition = (cart) => {
    let dir = cart.dir
    let next = cart.next
    if (
      (map[cart.y][cart.x] === '\\' && ['>', '<'].includes(cart.dir)) ||
      (map[cart.y][cart.x] === '/' && ['^', 'v'].includes(cart.dir))
    ) {
      dir = rotateRight(dir)
    } else if (
      (map[cart.y][cart.x] === '\\' && ['^', 'v'].includes(cart.dir)) ||
      (map[cart.y][cart.x] === '/' && ['>', '<'].includes(cart.dir))
    ) {
      dir = rotateLeft(dir)
    } else if (map[cart.y][cart.x] === '+') {
      if (next === 'l') {
        dir = rotateLeft(dir)
      } else if (next === 'r') {
        dir = rotateRight(dir)
      }
      next = nextChoice(next)
    }

    const dirCoord = dirToCoord(dir)
    return {
      x: cart.x + dirCoord.x,
      y: cart.y + dirCoord.y,
      dir,
      next,
    }
  }

  let carts = structuredClone(initialCarts)
  let collision = null
  while (!collision) {
    for (let c = 0; c < carts.length; c++) {
      carts[c] = nextPosition(carts[c])

      collision = carts.find(
        (oc, i) => i !== c && oc.x === carts[c].x && oc.y === carts[c].y
      )
      if (collision) break
    }
  }

  console.log('part 1:', `${collision.x},${collision.y}`)

  carts = structuredClone(initialCarts)
  while (carts.length > 1) {
    const collided = []
    for (let c = 0; c < carts.length; c++) {
      if (collided.includes(c)) continue

      carts[c] = nextPosition(carts[c])

      for (let c2 = 0; c2 < carts.length; c2++) {
        if (
          c !== c2 &&
          carts[c].x === carts[c2].x &&
          carts[c].y === carts[c2].y
        ) {
          collided.push(c, c2)
        }
      }
    }
    carts = carts.filter((_, i) => !collided.includes(i))
    carts.sort((a, b) => (a.y === b.y ? a.x - b.x : a.y - b.y))
  }
  console.log('part 2:', `${carts[0].x},${carts[0].y}`)
}
