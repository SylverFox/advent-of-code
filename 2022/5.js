export default function (input) {
  let stacks = [...Array((input[0].length + 1) / 4)].map(() => [])
  let line = 0
  while (!input[line].startsWith(' 1 ')) {
    const match = input[line].match(/.{3,4}/g).map((c) => c.slice(0, 3))
    for (let m in match) {
      if (match[m] !== '   ') {
        stacks[m].unshift(match[m])
      }
    }
    line++
  }
  line++

  const stacksPart1 = JSON.parse(JSON.stringify(stacks))
  const stacksPart2 = stacks
  while (input[++line] !== undefined) {
    const [_, amount, from, to] = input[line].match(
      /^move (\d+) from (\d+) to (\d+)$/
    )
    stacksPart1[to - 1].push(...stacksPart1[from - 1].splice(-amount).reverse())
    stacksPart2[to - 1].push(...stacksPart2[from - 1].splice(-amount))
  }
  const output = (stacks) =>
    stacks.map((s) => s.slice(-1)[0].slice(1, 2)).join('')
  console.log('Part 1:', output(stacksPart1))
  console.log('Part 2:', output(stacksPart2))
}
