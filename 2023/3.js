export default function (input) {
  // Get part numbers
  let partNumbers = []
  for (let y = 0; y < input.length; y++) {
    const re = /\d+/g
    let match
    while ((match = re.exec(input[y]))) {
      partNumbers.push({ x: match.index, y, l: match[0].length, v: match[0] })
    }
  }

  const hasPart = (y, x1, x2) =>
    y >= 0 && y < input.length && input[y].slice(x1, x2).match(/[^\.\d]/)

  // Filter on having a part close by
  partNumbers = partNumbers.filter(
    (pn) =>
      hasPart(pn.y, Math.max(pn.x - 1, 0), pn.x + pn.l + 1) ||
      hasPart(pn.y - 1, Math.max(pn.x - 1, 0), pn.x + pn.l + 1) ||
      hasPart(pn.y + 1, Math.max(pn.x - 1, 0), pn.x + pn.l + 1)
  )

  console.log(
    'part 1:',
    partNumbers.map((pn) => pn.v / 1).reduce((a, v) => a + v)
  )

  // List all valid gears and their surrounding part values
  let gears = {}
  const gearPart = (y, x1, x2) => [
    ...(input[y].slice(x1, x2).matchAll(/\*/g) || []),
  ]
  const addGear = (gx, gy, val) =>
    (gears[gx + ':' + gy] = (gears[gx + ':' + gy] || []).concat([val]))

  for (let pn of partNumbers) {
    if (pn.y > 0) {
      for (let gear of gearPart(
        pn.y - 1,
        Math.max(pn.x - 1, 0),
        pn.x + pn.l + 1
      )) {
        addGear(Math.max(pn.x - 1, 0) + gear.index, pn.y - 1, pn.v)
      }
    }
    for (let gear of gearPart(pn.y, Math.max(pn.x - 1, 0), pn.x + pn.l + 1)) {
      addGear(Math.max(pn.x - 1, 0) + gear.index, pn.y, pn.v)
    }
    if (pn.y < input.length - 1) {
      for (let gear of gearPart(
        pn.y + 1,
        Math.max(pn.x - 1, 0),
        pn.x + pn.l + 1
      )) {
        addGear(Math.max(pn.x - 1, 0) + gear.index, pn.y + 1, pn.v)
      }
    }
  }

  // Filter those with two parts and calculate result
  let output = 0
  for (let g of Object.keys(gears)) {
    if (gears[g].length === 2) {
      output += ((gears[g][0] / 1) * gears[g][1]) / 1
    }
  }

  console.log('part 2:', output)
}
