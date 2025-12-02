export default function (input) {
  input = input
    .map((i) => i.match(/^position=<(.*),\s+(.*)> velocity=<(.*),\s+(.*)>$/))
    .map((i) => ({
      p: { x: i[1] / 1, y: i[2] / 1 },
      v: { x: i[3] / 1, y: i[4] / 1 },
    }))

  const points = structuredClone(input)
  let minSize = Infinity
  let solution
  let i = 0
  while (true) {
    const height =
      Math.max(...points.map((p) => p.p.y)) -
      Math.min(...points.map((p) => p.p.y))
    const width =
      Math.max(...points.map((p) => p.p.x)) -
      Math.min(...points.map((p) => p.p.x))
    if (height * width < minSize) {
      minSize = height * width
      solution = structuredClone(points)
    } else {
      break
    }

    // update points
    for (let p = 0; p < points.length; p++) {
      points[p].p.x += points[p].v.x
      points[p].p.y += points[p].v.y
    }
    i++
  }

  const yMax = Math.max(...solution.map((p) => p.p.y))
  const yMin = Math.min(...solution.map((p) => p.p.y))
  const xMax = Math.max(...solution.map((p) => p.p.x))
  const xMin = Math.min(...solution.map((p) => p.p.x))
  const map = [...Array(yMax - yMin + 1)].map(() =>
    Array(xMax - xMin + 1).fill(' ')
  )
  solution.forEach((s) => (map[s.p.y - yMin][s.p.x - xMin] = '#'))
  console.log('part 1:')
  map.forEach((row) => console.log(row.join('')))

  console.log('part 2:', i - 1)
}
