export default function (input) {
  let start = { y: 0, x: input[0].indexOf('|'), dir: 'v' }

  const move = (position) => {
    switch (position.dir) {
      case 'v':
        return { ...position, y: position.y + 1 }
      case '<':
        return { ...position, x: position.x - 1 }
      case '^':
        return { ...position, y: position.y - 1 }
      case '>':
        return { ...position, x: position.x + 1 }
    }
  }

  const findNext = (position) => {
    switch (position.dir) {
      case 'v':
        return input[position.y][position.x + 1] !== ' '
          ? { x: position.x + 1, y: position.y, dir: '>' }
          : { x: position.x - 1, y: position.y, dir: '<' }
      case '<':
        return input[position.y + 1][position.x] !== ' '
          ? { x: position.x, y: position.y + 1, dir: 'v' }
          : { x: position.x, y: position.y - 1, dir: '^' }
      case '^':
        return input[position.y][position.x - 1] !== ' '
          ? { x: position.x - 1, y: position.y, dir: '<' }
          : { x: position.x + 1, y: position.y, dir: '>' }
      case '>':
        return input[position.y - 1][position.x] !== ' '
          ? { x: position.x, y: position.y - 1, dir: '^' }
          : { x: position.x, y: position.y + 1, dir: 'v' }
    }
  }

  let output = '',
    steps = 0
  let position = structuredClone(start)
  while (true) {
    const charAtPos = input[position.y][position.x]
    if (['|', '-'].includes(charAtPos)) {
      position = move(position)
    } else if (charAtPos === '+') {
      position = findNext(position)
    } else if (charAtPos.match(/[A-Z]/)) {
      output += charAtPos
      position = move(position)
    } else {
      break
    }
    steps++
  }

  console.log('part 1:', output)
  console.log('part 2:', steps)
}
