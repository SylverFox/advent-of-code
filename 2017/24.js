export default function (input) {
  input = input.map((i) => i.split('/').map(Number))

  const findStrongest = (components, currentEnd = 0) => {
    let strengths = [0]
    for (let c = 0; c < components.length; c++) {
      if (!components[c].includes(currentEnd)) continue

      const otherEnd =
        components[c][0] === currentEnd ? components[c][1] : components[c][0]
      const strength =
        currentEnd +
        otherEnd +
        findStrongest(
          [...components.slice(0, c), ...components.slice(c + 1)],
          otherEnd
        )
      strengths.push(strength)
    }

    return Math.max(...strengths)
  }
  console.log('part 1:', findStrongest(input))

  const findLongestStrongest = (components, currentEnd = 0) => {
    let output = [{ strength: 0, length: 0 }]
    for (let c = 0; c < components.length; c++) {
      if (!components[c].includes(currentEnd)) continue

      const otherEnd =
        components[c][0] === currentEnd ? components[c][1] : components[c][0]
      const recurOutput = findLongestStrongest(
        [...components.slice(0, c), ...components.slice(c + 1)],
        otherEnd
      )
      output.push({
        strength: recurOutput.strength + currentEnd + otherEnd,
        length: recurOutput.length + 1,
      })
    }

    return output.sort((a, b) =>
      a.length === b.length ? b.strength - a.strength : b.length - a.length
    )[0]
  }

  console.log('part 2:', findLongestStrongest(input).strength)
}
