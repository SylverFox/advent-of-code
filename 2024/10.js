export default function (input) {
  input = input.map((i) => i.split('').map(Number))

  let starts = []
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === 0) {
        starts.push({ x, y })
      }
    }
  }

  let score = 0
  for (let start of starts) {
    let states = [start]
    for (let h = 1; h <= 9; h++) {
      let newStates = []
      for (let state of states) {
        const neighbors = [
          { x: 0, y: 1 },
          { x: 1, y: 0 },
          { x: 0, y: -1 },
          { x: -1, y: 0 },
        ]
          .map((n) => ({ x: state.x + n.x, y: state.y + n.y }))
          .filter((n) => input[n.y]?.[n.x] === h)
        newStates.push(...neighbors)
      }
      newStates = newStates.filter(
        (e, i, a) => a.findIndex((n) => n.x === e.x && n.y === e.y) === i
      )
      states = newStates
    }
    score += states.length
  }

  console.log('part 1:', score)

  const trailScore = (start, height = 0) => {
    if (height === 9) return 0

    const neighbors = [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: -1, y: 0 },
    ]
      .map((n) => ({ x: start.x + n.x, y: start.y + n.y }))
      .filter((n) => input[n.y]?.[n.x] === height + 1)

    return (
      neighbors.length -
      1 +
      neighbors.map((n) => trailScore(n, height + 1)).sum()
    )
  }

  score = starts.map((s) => trailScore(s) + 1).sum()
  console.log('part 2:', score)
}
