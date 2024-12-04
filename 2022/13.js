export default function (input) {
  const compare = (A, B) => {
    if (typeof A === 'number' && typeof B === 'number') {
      return A - B
    } else if (A instanceof Array && B instanceof Array) {
      for (let i = 0; i < Math.min(A.length, B.length); i++) {
        const comp = compare(A[i], B[i])
        if (comp !== 0) {
          return comp
        }
      }
      return A.length - B.length
    } else {
      return typeof A === 'number' ? compare([A], B) : compare(A, [B])
    }
  }

  let output = 0
  for (let i = 0; i < input.length; i += 3) {
    const A = JSON.parse(input[i])
    const B = JSON.parse(input[i + 1])
    if (compare(A, B) < 1) output += i / 3 + 1
  }
  console.log('Part 1:', output)

  output = [...input, '[[2]]', '[[6]]']
    .filter((r) => r !== '')
    .map(JSON.parse)
    .sort(compare)
    .map(JSON.stringify)
  const dk1 = output.indexOf('[[2]]')
  const dk2 = output.indexOf('[[6]]')
  console.log('Part 2:', (dk1 + 1) * (dk2 + 1))
}
