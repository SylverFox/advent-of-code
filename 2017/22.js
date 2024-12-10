export default function (input) {
  input = input.map((i) => i.split(''))
  const start = {
    x: (input[0].length - 1) / 2,
    y: (input.length - 1) / 2,
    dir: '^',
  }
  const directions = ['^', '<', 'v', '>']
  const rotateLeft = (dir) =>
    directions[(directions.indexOf(dir) + 1) % directions.length]
  const rotateRight = (dir) =>
    directions[(directions.indexOf(dir) + 3) % directions.length]
  const move = (pos) => {
    switch (pos.dir) {
      case '^':
        return { ...pos, y: pos.y - 1 }
      case '<':
        return { ...pos, x: pos.x - 1 }
      case 'v':
        return { ...pos, y: pos.y + 1 }
      case '>':
        return { ...pos, x: pos.x + 1 }
    }
  }

  let infections = 0
  let pos = structuredClone(start)
  let map = structuredClone(input)
  for (let i = 0; i < 10000; i++) {
    if (map[pos.y]?.[pos.x] === '#') {
      pos.dir = rotateRight(pos.dir)
      map[pos.y][pos.x] = '.'
    } else {
      pos.dir = rotateLeft(pos.dir)
      if (!map[pos.y]) map[pos.y] = []
      map[pos.y][pos.x] = '#'
      infections++
    }

    pos = move(pos)
  }
  console.log('part 1:', infections)

  infections = 0
  pos = structuredClone(start)
  map = structuredClone(input)
  for (let i = 0; i < 10000000; i++) {
    if (map[pos.y]?.[pos.x] === '#') {
      pos.dir = rotateRight(pos.dir)
      map[pos.y][pos.x] = 'F'
    } else if (map[pos.y]?.[pos.x] === 'W') {
      map[pos.y][pos.x] = '#'
      infections++
    } else if (map[pos.y]?.[pos.x] === 'F') {
      pos.dir = rotateRight(rotateRight(pos.dir))
      map[pos.y][pos.x] = '.'
    } else {
      pos.dir = rotateLeft(pos.dir)
      if (!map[pos.y]) map[pos.y] = []
      map[pos.y][pos.x] = 'W'
    }

    pos = move(pos)
  }
  console.log('part 2:', infections)
}
