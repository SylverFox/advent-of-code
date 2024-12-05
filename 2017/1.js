export default function (input) {
  let digits = (input[0] + input[0][0]).match(/(\d)(?=\1)/g) ?? []
  console.log('part 1:', digits.map(Number).sum())

  digits = input[0].match(
    new RegExp(`(\\d)(?=.{${input[0].length / 2 - 1}}\\1)`, 'g')
  )
  console.log('part 2:', digits.map(Number).sum() * 2)
}
