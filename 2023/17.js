export default function (input) {
  input = input.map((r) => r.split('').map(Number))
  part1(input)
  part2(input)
}

function part1(input) {
  const HEIGHT = input.length
  const WIDTH = input[0].length

  const getDirection = (p1, p2) =>
    p1.x < p2.x ? '>' : p1.x > p2.x ? '<' : p1.y > p2.y ? '^' : 'v'
  const getDirectionPattern = (path) =>
    path.reduce(
      (a, v, i, p) => (i === 0 ? '' : a + getDirection(p[i - 1], v)),
      ''
    )

  const nodeCache = {}
  let paths = [[{ x: 0, y: 0 }]]
  let maxCost =
    input[0].slice(1).sum() +
    input
      .slice(1)
      .map((i) => i[i.length - 1])
      .sum()
  while (paths.length) {
    const newPaths = []

    branch: while (paths.length) {
      const path = paths.pop()
      // last position
      const { x, y } = path[path.length - 1]
      // cost for this path
      const cost = path
        .slice(1)
        .map((p) => input[p.y][p.x])
        .sum()
      // approach vector of this path onto this node

      if (cost > maxCost) {
        // no need to evaluate further, this branch has already exceeded the cost of another branch
        continue branch
      }
      if (x === WIDTH - 1 && y === HEIGHT - 1) {
        // This is the end node, keep the cost on this path to reduce other branches
        maxCost = Math.min(maxCost, cost)
      }

      const approachVector =
        path.length < 2
          ? ''
          : getDirectionPattern(path.slice(-4)).match(/(.)\1*$/)[0] // Match only the last repeating characters

      if (nodeCache[`${x},${y}`]) {
        // Check if we want to continue this node
        for (let nc in nodeCache[`${x},${y}`]) {
          if (nodeCache[`${x},${y}`][nc].approachVector === approachVector) {
            // this node is a duplicate
            if (nodeCache[`${x},${y}`][nc].cost > cost) {
              // replace this path in cache
              nodeCache[`${x},${y}`][nc] = {
                path,
                cost,
                approachVector,
              }
              // continue branch
            } else {
              // it is not faster, stop this branch
              continue branch
            }
          }
        }
      }

      nodeCache[`${x},${y}`] = [
        ...(nodeCache[`${x},${y}`] || []),
        {
          path,
          cost,
          approachVector,
        },
      ]

      // Explore new nodes
      const directions = [
        { x: x + 1, y },
        { x, y: y + 1 },
        { x: x - 1, y },
        { x, y: y - 1 },
      ]
      for (let dir of directions) {
        // out of bounds
        if (dir.x < 0 || dir.y < 0 || dir.x >= WIDTH || dir.y >= HEIGHT)
          continue
        // no loops or reversal
        if (path.find((p) => p.x === dir.x && p.y === dir.y)) continue
        // skip invalid paths of 3+ in the same direction
        if (path.length >= 4) {
          const dx = Math.abs(dir.x - path[path.length - 4].x)
          const dy = Math.abs(dir.y - path[path.length - 4].y)
          if (dx === 4 || dy === 4) continue
        }

        // push new paths on the stack
        newPaths.push([...path, dir])
      }
    }

    paths = newPaths
  }

  console.log('part 1:', maxCost)
}

function part2(input) {
  const HEIGHT = input.length
  const WIDTH = input[0].length

  const getDirection = (p1, p2) =>
    p1.x < p2.x ? '>' : p1.x > p2.x ? '<' : p1.y > p2.y ? '^' : 'v'
  const getDirectionPattern = (path) =>
    path.reduce(
      (a, v, i, p) => (i === 0 ? '' : a + getDirection(p[i - 1], v)),
      ''
    )
  const directionToCoordinate = (dir, x, y) => {
    const { dx, dy } = {
      '>': { dx: 1, dy: 0 },
      v: { dx: 0, dy: 1 },
      '<': { dx: -1, dy: 0 },
      '^': { dx: 0, dy: -1 },
    }[dir]
    return { x: x + dx, y: dy + y }
  }
  const pathToCoordinates = (path) => {
    let x = 0,
      y = 0,
      out = [{ x, y }]
    for (let p of path.split('')) {
      ;({ x, y } = directionToCoordinate(p, x, y))
      out.push({ x, y })
    }
    return out
  }

  const nodeCache = {}
  let paths = ['']
  let maxCost = (WIDTH + HEIGHT) * 9
  main: while (paths.length) {
    const path = paths.shift()

    // last position
    const coordinates = pathToCoordinates(path)
    const { x, y } = coordinates[coordinates.length - 1]
    const approachVector =
      path.length === 0 ? '' : path.slice(-10).match(/(.)\1*$/)[0] // Match only the last repeating characters

    // out of bounds
    if (x < 0 || y < 0 || x >= WIDTH || y >= HEIGHT) continue
    // no loops or reversal
    const uniqueCoordinates = coordinates
      .map((c) => `${c.x},${c.y}`)
      .filter((c, i, a) => i === a.indexOf(c))
    if (uniqueCoordinates.length !== coordinates.length) continue

    // cost for this path
    const cost = coordinates
      .slice(1)
      .map((c) => input[c.y][c.x])
      .sum()

    if (cost > maxCost) {
      // no need to evaluate further, this branch has already exceeded the cost of another branch
      continue
    }
    if (x === WIDTH - 1 && y === HEIGHT - 1) {
      // This is the end node, keep the cost on this path to reduce other branches
      maxCost = Math.min(maxCost, cost)
    }

    // Check if we want to continue this node
    const cacheHash = `${x},${y},${approachVector}`
    if (nodeCache[cacheHash]) {
      if (cost < nodeCache[cacheHash]) {
        // replace this path in cache
        nodeCache[cacheHash] = cost
      } else {
        // it is not faster, stop this branch
        continue
      }
    } else {
      // add this node with this approachVector and cost
      nodeCache[cacheHash] = cost
    }

    // prune branch if cost on one of our other coordinates was lowered
    for (let c = 1; c < coordinates.length - 1; c++) {
      const av = path.slice(0, c).match(/(.)\1*$/)[0]
      const ch = `${coordinates[c].x},${coordinates[c].y},${av}`
      const cost = coordinates
        .slice(1, c + 1)
        .map((p) => input[p.y][p.x])
        .sum()
      if (nodeCache[ch] < cost) {
        continue main
      }
    }

    // Explore new nodes
    if (path === '') {
      paths.push(path + 'vvvv', path + '>>>>')
    } else {
      // angles
      if (['>', '<'].includes(path.slice(-1))) {
        paths.push(path + '^^^^', path + 'vvvv')
      } else {
        paths.push(path + '<<<<', path + '>>>>')
      }
      // going straight
      if (approachVector.length < 10) {
        paths.push(path + path.slice(-1))
      }
    }
  }

  console.log('part 2:', maxCost)
}
