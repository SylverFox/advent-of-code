export default function (input) {
  input = input[0].split(' ').map(Number)

  const parseInput = (input) => {
    let children = []
    let i = 2
    for (let c = 0; c < input[0]; c++) {
      const child = parseInput(input.slice(i))
      children.push(child)
      i += child.size
    }

    return {
      children,
      meta: input.slice(i, i + input[1]),
      size: i + input[1],
    }
  }

  const tree = parseInput(input)
  const sumMeta = (tree) =>
    [tree.meta.sum(), ...tree.children.map(sumMeta)].sum()
  console.log('part 1:', sumMeta(tree))

  const value = (tree) =>
    tree
      ? tree.children.length
        ? tree.meta.map((c) => value(tree.children[c - 1])).sum()
        : tree.meta.sum()
      : 0
  console.log('part 2:', value(tree))
}
