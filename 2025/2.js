const isInvalid = (id) => id.match(/^(.*)\1$/)
const isInvalid2 = (id) => id.match(/^(.*)\1+$/)

export default function (input) {
  const ranges = input[0].split(',').map((id) => id.split('-'))
  let output = 0
  let output2 = 0
  for (const range of ranges) {
    for (let r = Number(range[0]); r <= Number(range[1]); r++) {
      if (isInvalid(r.toString())) {
        output += r
      }

      if (isInvalid2(r.toString())) {
        output2 += r
      }
    }
  }

  console.log('part 1:', output)
  console.log('part 2:', output2)
}
