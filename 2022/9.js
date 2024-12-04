export default function (input) {
  let knots = Array(2)
    .fill()
    .map((k) => ({ x: 0, y: 0, visited: ['0,0'] }))

  const moveKnots = (knot, dx, dy) => {
    knots[knot].x += dx
    knots[knot].y += dy
    knots[knot].visited.push(`${knots[knot].x},${knots[knot].y}`)
    if (knot === knots.length - 1) return

    const dxNext = knots[knot].x - knots[knot + 1].x
    const dyNext = knots[knot].y - knots[knot + 1].y
    const dist = Math.sqrt(dyNext ** 2 + dxNext ** 2)
    if (dist >= 2) {
      const moveX = dxNext > 0 ? Math.ceil(dxNext / 2) : Math.floor(dxNext / 2)
      const moveY = dyNext > 0 ? Math.ceil(dyNext / 2) : Math.floor(dyNext / 2)
      moveKnots(knot + 1, moveX, moveY)
    }
  }

  const dxMap = { U: 0, R: 1, D: 0, L: -1 }
  const dyMap = { U: -1, R: 0, D: 1, L: 0 }
  for (let i of input) {
    const [_, dir, count] = i.match(/(\w) (\d+)/)
    for (let c = 0; c < count / 1; c++) {
      moveKnots(0, dxMap[dir], dyMap[dir])
    }
  }

  let output = knots[knots.length - 1].visited.filter(
    (e, i, a) => a.indexOf(e) === i
  )
  console.log('Part 1:', output.length)

  knots = Array(10)
    .fill()
    .map((k) => ({ x: 0, y: 0, visited: ['0,0'] }))

  for (let i of input) {
    const [_, dir, count] = i.match(/(\w) (\d+)/)
    for (let c = 0; c < count / 1; c++) {
      moveKnots(0, dxMap[dir], dyMap[dir])
    }
  }
  output = knots[knots.length - 1].visited.filter(
    (e, i, a) => a.indexOf(e) === i
  )
  console.log('Part 2:', output.length)
}
