const cache = new Map()

function splits(x, input) {
  let tachions = [x]
  let splits = 0
  for (let row = 1; row < input.length; row++) {
    const splitters = input[row]
      .split('')
      .map((x, i) => (x === '^' ? i : -1))
      .filter((x) => x > -1)
    splitters.forEach((s) => {
      const t = tachions.indexOf(s)
      if (t >= 0) {
        tachions.splice(t, 1)
        tachions.push(s - 1, s + 1)
        splits++
      }
    })
    tachions = tachions.uniques()
  }
  return splits
}

function timelines(x, y, input) {
  if (y >= input.length - 1) {
    return 1
  } else if (cache.has(`${x},${y}`)) {
    return cache.get(`${x},${y}`)
  }

  let res = 0
  if (input[y + 1][x] === '.') {
    res = timelines(x, y + 1, input)
  } else {
    res = timelines(x - 1, y + 1, input) + timelines(x + 1, y + 1, input)
  }
  cache.set(`${x},${y}`, res)
  return res
}

export default function (input) {
  const start = input[0].indexOf('S')

  console.log('part 1:', splits(start, input))
  console.log('part 2:', timelines(start, 0, input))
}
