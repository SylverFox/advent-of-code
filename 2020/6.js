const UNIQUES = (e, i, a) => a.indexOf(e) === i
const GROUP_BY_COUNT = (agg, val) => ({ ...agg, [val]: (agg[val] || 0) + 1 })

export default function (input) {
  let groups = [[]],
    gi = 0
  for (let i of input) {
    if (i === '') {
      groups[++gi] = []
    } else {
      groups[gi].push(i)
    }
  }
  const counts = groups
    .map((g) => g.join('').split('').filter(UNIQUES).length)
    .reduce((a, v) => a + v)
  console.log('Part 1:', counts)

  groups = groups.map((g) => ({
    people: g.length,
    answers: g.join('').split('').sort().reduce(GROUP_BY_COUNT, {}),
  }))
  let result = 0
  for (let g of groups) {
    for (let a in g.answers) {
      if (g.answers[a] === g.people) {
        result++
      }
    }
  }

  console.log('Part 2:', result)
}
