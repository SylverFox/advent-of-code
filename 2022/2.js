export default function (input) {
  let score = 0
  for (let i of input) {
    const split = i.split(' ')
    switch (split[1]) {
      case 'Z':
        score++
      case 'Y':
        score++
      case 'X':
        score++
    }
    if (['A X', 'B Y', 'C Z'].includes(i)) {
      score += 3
    } else if (['A Y', 'B Z', 'C X'].includes(i)) {
      score += 6
    }
  }
  console.log('Part 1:', score)

  score = 0
  const choiceMap = {
    'A X': 'Z',
    'A Y': 'X',
    'A Z': 'Y',
    'B X': 'X',
    'B Y': 'Y',
    'B Z': 'Z',
    'C X': 'Y',
    'C Y': 'Z',
    'C Z': 'X',
  }
  for (let i of input) {
    const choice = choiceMap[i]
    switch (choice) {
      case 'Z':
        score++
      case 'Y':
        score++
      case 'X':
        score++
    }
    if (['A Y', 'B Y', 'C Y'].includes(i)) {
      score += 3
    } else if (['A Z', 'B Z', 'C Z'].includes(i)) {
      score += 6
    }
  }
  console.log('Part 2:', score)
}
