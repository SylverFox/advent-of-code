export default async function (input) {
  let buckets = [],
    index = 0
  for (let i of input) {
    if (i === '') {
      index++
    } else if (!buckets[index]) {
      buckets[index] = [i / 1]
    } else {
      buckets[index].push(i / 1)
    }
  }

  buckets = buckets.map((b) => b.reduce((a, v) => a + v)).sort((a, b) => b - a)

  console.log('Part 1:', buckets[0])
  console.log(
    'Part 2:',
    buckets.slice(0, 3).reduce((a, b) => a + b)
  )
}
