export default function (input) {
  let programs = input
    .map((i) => i.match(/^(\w+) \((\d+)\)( -> (.*))?$/))
    .map((m) => ({
      name: m[1],
      weight: m[2] / 1,
      nodes: m[4]?.split(', ') ?? [],
    }))

  let root = programs[0].name
  while (true) {
    const node = programs.find((p) => p.nodes.includes(root))?.name
    if (!node) break
    root = node
  }
  console.log('part 1:', root)

  const solution = (name) => {
    const program = programs.find((p) => p.name === name)
    const children = program.nodes.map(solution)

    if (children.filter((e, i, a) => a.indexOf(e) === i).length > 1) {
      // determine which child needs fixing
      const occurrences = {}
      for (let c = 0; c < children.length; c++) {
        occurrences[children[c]] = (occurrences[children[c]] || 0) + 1
      }
      const correctWeight = Object.keys(occurrences).find(
        (o) => occurrences[o] > 1
      )
      const wrongWeight = Object.keys(occurrences).find(
        (o) => occurrences[o] === 1
      )
      const wrongChildName =
        program.nodes[children.indexOf(Number(wrongWeight))]

      const fixedWeight =
        programs.find((p) => p.name === wrongChildName).weight +
        (correctWeight - wrongWeight)
      console.log('part 2:', fixedWeight)

      return correctWeight * children.length + program.weight
    }

    const weight = children.sum() + program.weight
    return weight
  }

  solution(root)
}
