export default function (input) {
  let fishies = input[0].split(',').map(Number)

  for (let d = 0; d < 80; d++) {
    for (let f = 0, last = fishies.length; f < last; f++) {
      if (fishies[f] === 0) {
        fishies[f] = 6
        fishies.push(8)
      } else {
        fishies[f]--
      }
    }
  }

  console.log('Part 1:', fishies.length)

  const fishiesInput = input[0].split(',').map(Number)
  // Group by amount
  fishies = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  for (let f of fishiesInput) {
    fishies[f]++
  }

  for (let d = 0; d < 256; d++) {
    let born = fishies[0]
    fishies = [...fishies.slice(1), born]
    fishies[6] += born
  }

  console.log(
    'Part 2:',
    fishies.reduce((a, b) => a + b)
  )
}
