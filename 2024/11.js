export default function (input) {
  const findExpansion = (stones, cache, max, i = 0) => {
    if (i === max) return stones.length

    let sum = 0
    for (let s = 0; s < stones.length; s++) {
      const hash = stones[s] + ':' + i
      if (cache.has(hash)) {
        sum += cache.get(hash)
        continue
      }

      let newStones = []
      if (stones[s] == 0) {
        newStones = ['1']
      } else if (stones[s].length % 2 === 0) {
        const i = stones[s].length / 2
        newStones = [
          stones[s].slice(0, i),
          stones[s].slice(i).replace(/^0+(?=.)/, ''),
        ]
      } else {
        newStones = [(stones[s] * 2024).toString()]
      }

      const result = findExpansion(newStones, cache, max, i + 1)

      cache.set(hash, result)
      sum += result
    }
    return sum
  }

  const stones = input[0].split(' ')
  let cache = new Map()
  console.log('part 1:', findExpansion(stones, cache, 25))
  cache = new Map()
  console.log('part 2:', findExpansion(stones, cache, 75))
}
