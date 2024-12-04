export default function (input) {
  function paths(node) {
    return input
      .map((i) => i.split('-'))
      .map((s) => (s[0] === node ? s[1] : s[1] === node ? s[0] : null))
      .filter((n) => n && n !== 'start')
  }

  function brutePaths(node = 'start', used = ['start'], path = ['start']) {
    if (node === 'end') {
      return 1
    }

    let reachable = paths(node)
    reachable = reachable.filter((l) => !used.includes(l))
    let score = 0
    for (let n = 0; n < reachable.length; n++) {
      const newNode = reachable[n]

      // Check if we've been here already without getting to small caves
      if (
        path.includes(newNode) &&
        path
          .slice(path.lastIndexOf(newNode) + 1)
          .every((p) => p.toLowerCase() !== p)
      ) {
        continue
      }

      const newPath = [...path.slice(), newNode]
      let newUsed = used.slice()
      if (newNode.toLowerCase() === newNode) {
        // remove node once visited
        newUsed.push(newNode)
      }

      if (newNode === 'd') {
        console.log(reachable)
      }

      score += brutePaths(newNode, newUsed, newPath)
    }
    return score
  }

  console.log('Part 1', brutePaths())

  function paths2(node) {
    return input
      .map((i) => i.split('-'))
      .map((s) => (s[0] === node ? s[1] : s[1] === node ? s[0] : null))
      .filter((n) => n && n !== 'start')
      .sort()
  }

  function brutePaths2(node = 'start', used = ['start'], path = ['start']) {
    if (node === 'end') {
      return 1
    }

    let reachable = paths2(node)
    reachable = reachable.filter((l) => !used.includes(l))
    let score = 0
    for (let n = 0; n < reachable.length; n++) {
      const newNode = reachable[n]

      // Check if we've been here already without getting to small caves to prevent circular refs
      if (path.includes(newNode)) {
        const circle = path.slice(path.lastIndexOf(newNode))
        const noCaves = circle.every((p) => p.toLowerCase() !== p)
        if (noCaves) {
          console.log('skipping', newNode, circle, hasCave)
          continue
        }
      }

      const newPath = [...path.slice(), newNode]
      let newUsed = used.slice()
      if (newNode.toLowerCase() === newNode) {
        // remove node once visited
        if (used.includes('*')) {
          newUsed.push(newNode)
        } else if (used.includes(newNode + '*')) {
          newUsed = newUsed.map((nu) =>
            nu.endsWith('*') ? nu.slice(0, -1) : nu
          )
          newUsed.push('*')
        } else {
          newUsed.push(newNode + '*')
        }
      }

      score += brutePaths2(newNode, newUsed, newPath)
    }
    return score
  }

  console.log('Part 2:', brutePaths2())
}
