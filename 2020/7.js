export default function (input) {
  const rules = input
    .map((i) => i.match(/^(.*) contain (.*).$/))
    .map((r) => ({
      node: r[1].match(/^(.*) bags/)[1],
      children:
        r[2] === 'no other bags'
          ? []
          : r[2]
              .split(', ')
              .map((c) => c.match(/^(\d+) (.*) bag/))
              .map((c) => ({
                node: c[2],
                count: c[1],
              })),
    }))

  let output = []
  let nodes = ['shiny gold']
  while (nodes.length) {
    const next = nodes.shift()
    for (let r of rules) {
      if (r.children.find((c) => c.node === next) && !output.includes(r.node)) {
        output.push(r.node)
        nodes.push(r.node)
      }
    }
  }
  console.log('Part 1:', output.length)

  const getRecursiveBags = (node) => {
    let bags = 1
    const r = rules.find((r) => r.node === node)
    for (let c of r.children) {
      bags += c.count * getRecursiveBags(c.node)
    }
    return bags
  }

  output = getRecursiveBags('shiny gold')
  console.log('Part 2:', output - 1)
}
