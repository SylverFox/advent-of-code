import { createHash } from 'crypto'

export default function (input) {
  input = input[0]

  let hashCache = {}
  const md5hash = (plain, rounds) => {
    if (rounds === 0) {
      return plain
    } else if (!hashCache[plain]) {
      let hash = plain
      for (let i = 0; i < rounds; i++) {
        hash = createHash('md5').update(hash).digest().toString('hex')
      }
      hashCache[plain] = hash
    }
    return hashCache[plain]
  }

  const findKeys = (rounds) => {
    let keys = []
    main: for (let i = 0; ; i++) {
      let hash = md5hash(input + i, rounds)
      const match = hash.match(/(.)\1\1/)
      if (!match) continue

      for (let j = 1; j < 1000; j++) {
        hash = md5hash(input + (i + j), rounds)
        if (hash.includes(match[1].repeat(5))) {
          keys.push(i)
          if (keys.length === 64) break main
          continue main
        }
      }
    }
    return keys
  }

  console.log('Part 1:', findKeys(1).slice(-1)[0])
  hashCache = {}
  console.log('Part 2:', findKeys(2017).slice(-1)[0])
}
