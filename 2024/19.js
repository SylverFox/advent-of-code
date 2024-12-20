export default function (input) {
  const towels = input[0].split(', ')
  const patterns = input.slice(2)

  let cache = new Map()
  const makeDesign = (pattern, towels) => {
    if (pattern === '') {
      return 1
    }

    let output = 0
    for (let t = 0; t < towels.length; t++) {
      if (pattern.startsWith(towels[t])) {
        const newPattern = pattern.slice(towels[t].length)
        if (!cache.has(newPattern)) {
          const out = makeDesign(newPattern, towels)
          cache.set(newPattern, out)
          output += out
        } else {
          output += cache.get(newPattern)
        }
      }
    }
    return output
  }

  let output = patterns.map((p) => makeDesign(p, towels))
  console.log('part 1:', output.filter((o) => o > 0).length)
  console.log('part 2:', output.sum())
}
