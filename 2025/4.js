function getRemovableRolls(input) {
  let rolls = []
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (input[y][x] !== '@') continue

      const neighbors = [
        { x: -1, y: -1 },
        { x: 0, y: -1 },
        { x: 1, y: -1 },
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: -1, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ].map((n) => ({ x: x + n.x, y: y + n.y }))

      if (neighbors.filter((n) => input[n.y]?.[n.x] === '@').length < 4) {
        rolls.push({ x, y })
      }
    }
  }
  return rolls
}

function removeRolls(input, rolls) {
  rolls.forEach((roll) => (input[roll.y][roll.x] = '.'))
}

export default function (input) {
  input = input.map((row) => row.split(''))

  let removableRolls = getRemovableRolls(input)
  console.log('part 1:', removableRolls.length)

  let removed = 0
  while (removableRolls.length > 0) {
    removeRolls(input, removableRolls)
    removed += removableRolls.length
    removableRolls = getRemovableRolls(input)
  }

  console.log('part 2:', removed)
}
