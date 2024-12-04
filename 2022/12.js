export default function (input) {
  input = input.map((i) => i.split(''))

  let start, end
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === 'S') {
        start = { x, y }
        input[y][x] = String.fromCharCode(96)
      } else if (input[y][x] === 'E') {
        end = { x, y }
        input[y][x] = String.fromCharCode(123)
      }
    }
  }
  input = input.map((i) => i.map((x) => x.charCodeAt() - 96))

  let nodes = [{ pos: start, dist: 0 }],
    visited = [{ pos: start, dist: 0 }]
  main: while (nodes.length) {
    const next = nodes.shift()
    const neighbours = [
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
    ]
      .map((n) => ({ x: n.x + next.pos.x, y: n.y + next.pos.y }))
      .filter(
        (n) =>
          n.x >= 0 && n.y >= 0 && n.y < input.length && n.x < input[0].length
      )
      .filter((n) => input[n.y][n.x] - input[next.pos.y][next.pos.x] <= 1)

    for (let neighbour of neighbours) {
      if (neighbour.y === end.y && neighbour.x === end.x) {
        console.log('Part 1:', next.dist + 1)
        break main
      }
      const visit = visited.find(
        (n) => n.pos.x === neighbour.x && n.pos.y === neighbour.y
      )
      if (visit && visit.dist > next.dist + 1) {
        visit.dist = next.dist + 1
      } else if (!visit) {
        visited.push({
          pos: { x: neighbour.x, y: neighbour.y },
          dist: next.dist + 1,
        })
        nodes.push({
          pos: { x: neighbour.x, y: neighbour.y },
          dist: next.dist + 1,
        })
      }
    }
  }

  ;(nodes = [{ pos: end, dist: 0 }]), (visited = [{ pos: end, dist: 0 }])
  main: while (nodes.length) {
    const next = nodes.shift()
    const neighbours = [
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
    ]
      .map((n) => ({ x: n.x + next.pos.x, y: n.y + next.pos.y }))
      .filter(
        (n) =>
          n.x >= 0 && n.y >= 0 && n.y < input.length && n.x < input[0].length
      )
      .filter((n) => input[next.pos.y][next.pos.x] - input[n.y][n.x] <= 1)

    for (let neighbour of neighbours) {
      if (input[neighbour.y][neighbour.x] <= 1) {
        console.log('Part 2:', next.dist + 1)
        break main
      }
      const visit = visited.find(
        (n) => n.pos.x === neighbour.x && n.pos.y === neighbour.y
      )
      if (visit && visit.dist > next.dist + 1) {
        visit.dist = next.dist + 1
      } else if (!visit) {
        visited.push({
          pos: { x: neighbour.x, y: neighbour.y },
          dist: next.dist + 1,
        })
        nodes.push({
          pos: { x: neighbour.x, y: neighbour.y },
          dist: next.dist + 1,
        })
      }
    }
  }
}
