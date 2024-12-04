export default function (input) {
  input = input[0].split('')
  let output
  for (let i = 0; i < input.length - 3; i++) {
    if (
      input.slice(i, i + 4).filter((e, i, a) => a.indexOf(e) === i).length === 4
    ) {
      output = i + 4
      break
    }
  }
  console.log('Part 1:', output)

  for (let i = 0; i < input.length - 13; i++) {
    if (
      input.slice(i, i + 14).filter((e, i, a) => a.indexOf(e) === i).length ===
      14
    ) {
      output = i + 14
      break
    }
  }
}
