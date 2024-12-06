export default function (input) {
  const groups = input[0]
    .replace(/!./g, '')
    .replace(/<.*?>/g, '')
    .replace(/[^\{\}]/g, '')

  let score = 0
  for (let i = 0, depth = 0; i < groups.length; i++) {
    if (groups[i] === '{') {
      depth++
    } else if (groups[i] === '}') {
      score += depth
      depth--
    }
  }
  console.log('part 1:', score)

  const garbage = input[0]
    .replace(/!./g, '')
    .match(/<.*?>/g)
    .map((g) => g.length - 2)
    .sum()
  console.log('part 2:', garbage)
}
