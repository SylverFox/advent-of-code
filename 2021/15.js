function getLowestPath(map) {
  let riskMap = Array(map.length)
    .fill()
    .map(() => Array(map[0].length).fill(Infinity))
  riskMap[0][0] = 0

  let nodes = [{ x: 0, y: 0 }]
  while (nodes.length) {
    const { x, y } = nodes.shift()
    const risk = riskMap[y][x]
    if (x > 0 && risk + map[y][x - 1] < riskMap[y][x - 1]) {
      riskMap[y][x - 1] = risk + map[y][x - 1]
      nodes.push({ x: x - 1, y: y })
    }
    if (y > 0 && risk + map[y - 1][x] < riskMap[y - 1][x]) {
      riskMap[y - 1][x] = risk + map[y - 1][x]
      nodes.push({ x: x, y: y - 1 })
    }
    if (y < map.length - 1 && risk + map[y + 1][x] < riskMap[y + 1][x]) {
      riskMap[y + 1][x] = risk + map[y + 1][x]
      nodes.push({ x: x, y: y + 1 })
    }
    if (x < map[y].length - 1 && risk + map[y][x + 1] < riskMap[y][x + 1]) {
      riskMap[y][x + 1] = risk + map[y][x + 1]
      nodes.push({ x: x + 1, y: y })
    }
  }

  return riskMap[map.length - 1][map[0].length - 1]
}

export default function (input) {
  const map = input.map((l) => l.split('').map(Number))
  console.log('Part 1:', getLowestPath(map))

  let map2 = []
  for (let i = 0; i < 5; i++) {
    for (let l = 0; l < input.length; l++) {
      map2[i * input.length + l] = []
      const line = input[l].split('').map(Number)
      for (let j = 0; j < 5; j++) {
        const upLine = line.map((c) => ((c + i + j - 1) % 9) + 1)
        map2[i * input.length + l].push(...upLine)
      }
    }
  }
  console.log('Part 2:', getLowestPath(map2))
}
