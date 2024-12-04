const UP = 'U',
  RIGHT = 'R',
  DOWN = 'D',
  LEFT = 'L'

const path_map = (wire) => ({
  direction: wire[0],
  distance: Number(wire.slice(1)),
})

const road = (path) => {
  let points = []
  let x = 0,
    y = 0,
    steps = 1
  for (let wire of path) {
    for (let i = 0; i < wire.distance; i++, steps++) {
      y += wire.direction === UP ? 1 : wire.direction === DOWN ? -1 : 0
      x += wire.direction === RIGHT ? 1 : wire.direction === LEFT ? -1 : 0
      if (!points[y]) points[y] = []
      points[y][x] = steps
    }
  }
  return points
}

const getCrossings = (paths) => {
  const [path1, path2] = paths.map((p) => p.split(',').map(path_map)).map(road)
  let crossings = []
  for (let p1y in path1) {
    for (let p1x in path1[p1y]) {
      if (path2[p1y] && path2[p1y][p1x]) {
        crossings.push([
          Math.abs(p1y) + Math.abs(p1x),
          path1[p1y][p1x] + path2[p1y][p1x],
        ])
      }
    }
  }
  return crossings
}

const run = (paths) => getCrossings(paths).sort((c1, c2) => c1[0] - c2[0])[0][0]
const run2 = (paths) =>
  getCrossings(paths).sort((c1, c2) => c1[1] - c2[1])[0][1]

export default function (input) {
  const minDist = run(input)
  console.log('Part 1:', minDist)
  const minSteps = run2(input)
  console.log('Part 2:', minSteps)
}
