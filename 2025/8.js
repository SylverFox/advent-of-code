export default function (input) {
  input = input.map((row) => row.split(',').map(Number))

  const dist = (pos1, pos2) =>
    Math.sqrt(
      (pos2[0] - pos1[0]) ** 2 +
        (pos2[1] - pos1[1]) ** 2 +
        (pos2[2] - pos1[2]) ** 2
    )

  let distanceMap = []
  for (let i = 0; i < input.length - 1; i++) {
    for (let j = i + 1; j < input.length; j++) {
      const distance = dist(input[i], input[j])
      distanceMap.push([`${i},${j}`, distance])
    }
  }
  distanceMap.sort((a, b) => a[1] - b[1])

  let circuits = []
  for (let d = 0; d < distanceMap.length; d++) {
    let nodes = distanceMap[d][0].split(',')
    const circuitWithNode0 = circuits.findIndex((c) => c.has(nodes[0]))
    const circuitWithNode1 = circuits.findIndex((c) => c.has(nodes[1]))

    if (circuitWithNode0 === -1 && circuitWithNode1 === -1) {
      // make new circuit
      circuits.push(new Set([nodes[0], nodes[1]]))
    } else if (circuitWithNode0 === circuitWithNode1) {
      // already in the same circuit
      continue
    } else if (circuitWithNode0 === -1) {
      // add left to right
      circuits[circuitWithNode1].add(nodes[0])
    } else if (circuitWithNode1 === -1) {
      // add right to left
      circuits[circuitWithNode0].add(nodes[1])
    } else {
      // merge two circuits
      circuits[circuitWithNode1].forEach((v) =>
        circuits[circuitWithNode0].add(v)
      )
      circuits = circuits.filter((_, i) => i !== circuitWithNode1)
    }

    if (d + 1 === 1000) {
      const output1 = circuits
        .map((c) => c.size)
        .sort((c1, c2) => c2 - c1)
        .slice(0, 3)
        .product()
      console.log('part 1:', output1)
    }
    if (circuits.length === 1 && circuits[0].size === input.length) {
      const output2 = input[nodes[0]][0] * input[nodes[1]][0]
      console.log('part 2:', output2)
      break
    }
  }
}
