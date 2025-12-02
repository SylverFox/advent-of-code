export default function (input) {
  input = input
    .map((i) => i.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/))
    .map((i) => ({
      id: i[1] / 1,
      x: i[2] / 1 + 1,
      y: i[3] / 1 + 1,
      w: i[4] / 1,
      h: i[5] / 1,
    }))

  let map = []
  for (let i of input) {
    for (let a = 0; a < i.h; a++) {
      for (let b = 0; b < i.w; b++) {
        if (!map[i.y + a]) map[i.y + a] = []
        if (!map[i.y + a][i.x + b]) map[i.y + a][i.x + b] = 0
        map[i.y + a][i.x + b]++
      }
    }
  }
  const overlap = map.map((row) => row.filter((x) => x > 1).length).sum()
  console.log('part 1:', overlap)

  const checkOverlap = (a, b) =>
    a.x <= b.x + b.w && b.x <= a.x + a.w && a.y <= b.y + b.h && b.y <= a.y + a.h

  let output
  search: for (let a = 0; a < input.length; a++) {
    for (let b = 0; b < input.length; b++) {
      if (a === b) continue

      if (checkOverlap(input[a], input[b])) {
        continue search
      }
    }
    output = input[a].id
  }

  console.log('part 2:', output)
}
