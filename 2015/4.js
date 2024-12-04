import { createHash } from 'crypto'

export default function (input) {
  input = input[0]

  console.log()

  let x = 0
  while (true) {
    const md5 = createHash('md5')
      .update(input + ++x)
      .digest('hex')
    if (md5.startsWith('00000')) {
      console.log('Part 1:', x)
      break
    }
  }

  x = 0
  while (true) {
    const md5 = createHash('md5')
      .update(input + ++x)
      .digest('hex')
    if (md5.startsWith('000000')) {
      console.log('Part 1:', x)
      break
    }
  }
}
