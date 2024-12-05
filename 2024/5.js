export default function (input) {
  const split = input.findIndex((i) => i === '')
  const rules = input.slice(0, split).map((i) => i.split('|').map(Number))
  const updates = input.slice(split + 1).map((i) => i.split(',').map(Number))

  const check = (update) => {
    for (let u = 0; u < update.length; u++) {
      const before = rules
        .filter((r) => r[1] === update[u])
        .every((r) => update.indexOf(r[0]) === -1 || update.indexOf(r[0]) < u)
      const after = rules
        .filter((r) => r[0] === update[u])
        .every((r) => update.indexOf(r[1]) === -1 || update.indexOf(r[1]) > u)
      if (!before || !after) return false
    }
    return true
  }
  const middle = (update) => update[Math.floor(update.length / 2)]
  const fix = (update) => {
    for (let u = 0; u < update.length; u++) {
      let moveFront = rules.filter(
        (r) =>
          r[0] === update[u] &&
          update.indexOf(r[1]) >= 0 &&
          update.indexOf(r[1]) < u
      )
      if (moveFront.length) {
        const moveIndex = update.indexOf(moveFront[0][1])
        update.splice(u, 1)
        update.splice(moveIndex, 0, moveFront[0][0])
        return fix(update)
      }
    }
    return update
  }

  let output = updates.filter(check).map(middle).sum()
  console.log('part 1:', output)
  output = updates
    .filter((u) => !check(u))
    .map(fix)
    .map(middle)
    .sum()
  console.log('part 2:', output)
}
