export default function (input) {
  input = Number(input[0])

  let ans = 1,
    num = input
  for (let it = 1; num > 1; it++) {
    if (num % 2 === 0) {
      num /= 2
    } else {
      ans += 2 ** it
      num = (num - 1) / 2
    }
  }
  console.log('part 1:', ans)

  let l = 1,
    w = 1
  for (let i = 0; i < input; i++) {
    if (w + 1 > i) {
      l = w
      w = 1
    } else {
      w += w < l ? 1 : 2
    }
  }
  console.log('part 2:', w)
}
