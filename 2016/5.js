import { createHash } from 'crypto'

export default function (input) {
  input = input[0]

  let password = '',
    password2 = Array(8).fill('.')
  for (let i = 0; ; i++) {
    const hash = createHash('md5')
      .update(input + i)
      .digest()
      .toString('hex')
    if (hash.startsWith('00000')) {
      if (password.length < 8) password += hash[5]
      if (parseInt(hash[5], 16) < 8 && password2[hash[5] / 1] === '.')
        password2[hash[5] / 1] = hash[6]
      console.log(i, hash, password, password2.join(''))
      if (password.length === 8 && !password2.includes('.')) {
        password2 = password2.join('')
        break
      }
    }
  }
  console.log('Part 1:', password)
  console.log('Part 2:', password2)
  // ! 1550c4bd
}
