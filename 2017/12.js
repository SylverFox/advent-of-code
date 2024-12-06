export default function (input) {
  input = input
    .map((i) => i.split(' <-> '))
    .map((i) => ({ root: i[0], nodes: i[1].split(', ') }))

  const findGroup = (node) => {
    let nodes = [node],
      output = new Set()
    while (nodes.length) {
      const next = nodes.pop()
      if (output.has(next)) {
        continue
      }
      output.add(next)
      nodes.push(...input.find((i) => i.root === next).nodes)
    }
    return output
  }

  let output = findGroup('0')
  console.log('part 1:', output.size)

  let groups = 1
  while (output.size !== input.length) {
    const nextRoot = input.find((i) => !output.has(i.root)).root
    const group = findGroup(nextRoot)
    output = new Set([...output, ...group])
    groups++
  }
  console.log('part 2:', groups)
}
