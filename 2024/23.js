export default function (input) {
  input = input.map((i) => i.split('-'))

  let connections = {}
  for (let i of input) {
    connections[i[0]] = [...(connections[i[0]] || []), i[1]]
    connections[i[1]] = [...(connections[i[1]] || []), i[0]]
  }

  let circles = []
  for (let a in connections) {
    for (let b = 0; b < connections[a].length - 1; b++) {
      for (let c = b; c < connections[a].length; c++) {
        if (connections[connections[a][b]].includes(connections[a][c])) {
          circles.push([a, connections[a][b], connections[a][c]])
        }
      }
    }
  }
  circles = circles
    .map((c) => c.sort())
    .filter((c) => c.some((e) => e.startsWith('t')))
    .map((c) => c.join(','))
    .filter((e, i, a) => a.indexOf(e) === i)
  console.log('part 1:', circles.length)

  let cache = new Map()
  const largestCircle = (connectionsLeft, used = []) => {
    if (!connectionsLeft.length) return used

    const hash = connectionsLeft.sort().join(',') + ':' + used.sort().join(',')
    if (cache.has(hash)) return cache.get(hash)

    let max = used
    for (let c = 0; c < connectionsLeft.length; c++) {
      if (used.every((n) => connections[connectionsLeft[c]].includes(n))) {
        const maxCircle = largestCircle(
          [...connectionsLeft.slice(0, c), ...connectionsLeft.slice(c + 1)],
          [...used, connectionsLeft[c]]
        )
        if (maxCircle.length > max.length) max = maxCircle
      }
    }
    cache.set(hash, max)
    return max
  }

  let largestGroup = []
  for (let key in connections) {
    const group = largestCircle(connections[key], [key])
    if (group.length > largestGroup.length) largestGroup = group
  }
  console.log('part 2:', largestGroup.join(','))
}
