export default function (input) {
  const split = input.indexOf('')
  const map = input.slice(0, split).map((r) => r.split(''))
  const moves = input
    .slice(split + 1)
    .join('')
    .split('')
  let start
  search: for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === '@') {
        start = { x, y }
        map[y][x] = '.'
        break search
      }
    }
  }

  const moveToChange = {
    '>': { x: 1, y: 0 },
    v: { x: 0, y: 1 },
    '<': { x: -1, y: 0 },
    '^': { x: 0, y: -1 },
  }

  const moveRobots1 = (map, moves, start) => {
    map = structuredClone(map)
    let pos = structuredClone(start)
    for (let move of moves) {
      const newPos = {
        x: moveToChange[move].x + pos.x,
        y: moveToChange[move].y + pos.y,
      }
      if (map[newPos.y][newPos.x] === 'O') {
        let rowOfBoxes = structuredClone(newPos)
        do {
          rowOfBoxes.x += moveToChange[move].x
          rowOfBoxes.y += moveToChange[move].y
        } while (map[rowOfBoxes.y][rowOfBoxes.x] === 'O')

        if (map[rowOfBoxes.y][rowOfBoxes.x] === '.') {
          map[rowOfBoxes.y][rowOfBoxes.x] = 'O'
          map[newPos.y][newPos.x] = '.'
          pos = newPos
        }
      } else if (map[newPos.y][newPos.x] !== '#') {
        pos = newPos
      }
    }
    return map
  }

  const score = (map) =>
    map
      .map((row, y) => row.map((i, x) => (i === 'O' ? x + 100 * y : 0)).sum())
      .sum()

  let output = score(moveRobots1(map, moves, start))
  console.log('part 1:', output)

  const moveRobots2 = (map, moves, start) => {
    map = structuredClone(map)
    let pos = structuredClone(start)
    for (let move of moves) {
      const newPos = {
        x: moveToChange[move].x + pos.x,
        y: moveToChange[move].y + pos.y,
      }
      if (['[', ']'].includes(map[newPos.y][newPos.x])) {
        if (['>', '<'].includes(move)) {
          let rowOfBoxes = structuredClone(newPos)
          do {
            rowOfBoxes.x += moveToChange[move].x
          } while (['[', ']'].includes(map[rowOfBoxes.y][rowOfBoxes.x]))

          if (map[rowOfBoxes.y][rowOfBoxes.x] === '.') {
            if (move === '>') {
              map[rowOfBoxes.y].splice(
                newPos.x,
                rowOfBoxes.x - newPos.x + 1,
                '.',
                ...map[rowOfBoxes.y].slice(newPos.x, rowOfBoxes.x)
              )
            } else {
              map[rowOfBoxes.y].splice(
                rowOfBoxes.x,
                newPos.x - rowOfBoxes.x + 1,
                ...map[rowOfBoxes.y].slice(rowOfBoxes.x + 1, newPos.x + 1),
                '.'
              )
            }

            pos = newPos
          }
        } else {
          let open = [structuredClone(newPos)]
          let boxes = []
          let wall = false
          while (open.length) {
            // find all connected boxes
            const box = open.shift()
            box.x = map[box.y][box.x] === ']' ? box.x - 1 : box.x
            const newY = box.y + moveToChange[move].y
            if (map[newY][box.x] === '#' || map[newY][box.x + 1] === '#') {
              wall = true
              break
            }
            if (map[newY][box.x] === ']') {
              open.push({ y: newY, x: box.x - 1 })
            }
            if (map[newY][box.x] === '[') {
              open.push({ y: newY, x: box.x })
            }
            if (map[newY][box.x + 1] === '[') {
              open.push({ y: newY, x: box.x + 1 })
            }

            boxes.push(box)
          }

          if (!wall) {
            // move all boxes up
            const dY = moveToChange[move].y
            for (let box of boxes.reverse()) {
              map[box.y + dY][box.x] = '['
              map[box.y + dY][box.x + 1] = ']'
              map[box.y][box.x] = '.'
              map[box.y][box.x + 1] = '.'
            }
            pos = newPos
          }
        }
      } else if (map[newPos.y][newPos.x] !== '#') {
        pos = newPos
      }
    }
    return map
  }

  const score2 = (map) =>
    map
      .map((row, y) => row.map((i, x) => (i === '[' ? x + 100 * y : 0)).sum())
      .sum()

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x += 2) {
      if (map[y][x] === 'O') {
        map[y][x] = ']'
        map[y].splice(x, 0, '[')
      } else {
        map[y].splice(x, 0, map[y][x])
      }
    }
  }
  start.x = start.x * 2

  const newMap = moveRobots2(map, moves, start)
  output = score2(newMap)
  console.log('part 2:', output)
}
