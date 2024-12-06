const get = (arr, i) => arr[i % arr.length]
const set = (arr, i, v) => (arr[i % arr.length] = v)
function* chunk(arr, chunkSize) {
  for (let i = 0; i < arr.length; i += chunkSize) {
    yield arr.slice(i, i + chunkSize)
  }
}
const xorArr = (arr) => arr.reduce((a, v) => a ^ v)
const condense = (hash) =>
  [...chunk(hash, 16)]
    .map((chunk) => xorArr(chunk).toString(16).padStart(2, '0'))
    .join('')
export const hash = (plaintext, rounds = 64, condenseHash = true) => {
  if (typeof plaintext === 'string') {
    plaintext = plaintext.split('').map((i) => i.charCodeAt())
    plaintext.push(17, 31, 73, 47, 23)
  }
  let hash = [...Array(256).keys()]
  let skip = 0
  let index = 0
  for (let r = 0; r < rounds; r++) {
    for (let l of plaintext) {
      ;[...Array(l)]
        .map((_, i) => get(hash, index + i))
        .reverse()
        .forEach((v, i) => set(hash, index + i, v))

      index += (l + skip) % hash.length
      skip++
    }
  }
  return condenseHash ? condense(hash) : hash
}

export default function (input) {
  let output = hash(input[0].split(',').map(Number), 1, false)
  console.log('part 1:', output[0] * output[1])

  console.log('part 2:', hash(input[0]))
}
