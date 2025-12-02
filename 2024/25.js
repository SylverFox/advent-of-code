export default function (input) {
  let keylocks = [[]]
  let index = 0

  for (let i of input) {
    if (i === '') {
      index++
      keylocks[index] = []
    } else {
      keylocks[index].push(i.split(''))
    }
  }

  let keys = []
  let locks = []
  for (let kl of keylocks) {
    const top = kl[0].filter((k) => k === '#').length
    const bottom = kl[6].filter((k) => k === '#').length
    if (top > bottom) {
      locks.push(kl.transpose2D().map((r) => r.indexOf('.') - 1))
    } else {
      keys.push(kl.transpose2D().map((r) => r.reverse().indexOf('.') - 1))
    }
  }

  let fits = 0
  for (let lock of locks) {
    for (let key of keys) {
      const summed = lock.map((l, i) => l + key[i])

      if (summed.every((s) => s < 6)) {
        fits++
      }
    }
  }
  console.log('part 1:', fits)
}
