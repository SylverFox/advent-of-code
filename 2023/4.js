export default function (input) {
  let output = 0

  for (let i of input) {
    const [_, win, have] = i.match(/^Card\s+\d+:(.*?)\| (.*)$/)
    const winningNums = have
      .trim()
      .split(/\s+/)
      .filter((num) => win.includes(' ' + num + ' '))
    if (winningNums.length) output += 2 ** (winningNums.length - 1)
  }

  console.log('part 1:', output)

  let cards = Array(input.length).fill(1)
  for (let i = 0; i < input.length; i++) {
    const [_, win, have] = input[i].match(/^Card\s+\d+:(.*?)\| (.*)$/)
    const winningNums = have
      .trim()
      .split(/\s+/)
      .filter((num) => win.includes(' ' + num + ' '))
    for (let x = 0; x < winningNums.length && i + x + 1 < input.length; x++) {
      cards[i + x + 1] += cards[i]
    }
  }
  console.log(
    'part 2:',
    cards.reduce((a, b) => a + b)
  )
}
