export default function (input) {
  input = input[0]

  const collapse = (polymer) => {
    let output = polymer
    while (true) {
      const replaced = output.replace(/(.)(?!\1)(?i:\1)/g, '')
      if (replaced.length === output.length) break
      output = replaced
    }
    return output.length
  }

  console.log('part 1:', collapse(input))

  let best = Number.MAX_VALUE
  for (let x = 0; x < 26; x++) {
    const char = String.fromCharCode(x + 65)
    const improved = collapse(input.replace(new RegExp(char, 'gi'), ''))
    best = Math.min(best, improved)
  }
  console.log('part 2:', best)
}
