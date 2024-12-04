export default function (input) {
  const map = {
    2: 1,
    4: 4,
    3: 7,
    7: 8,
  }

  let output = input
    .map((i) => i.split('|')[1].trim().split(' '))
    .reduce((agg, line) => [...agg, ...line], [])
    .map((x) => map[x.length])
    .filter((x) => x)
    .reduce((agg, val) => {
      agg[val] = (agg[val] || 0) + 1
      return agg
    }, [])
    .reduce((a, b) => a + b)
  console.log('Part 1:', output)

  const sortWord = (word) => word.split('').sort().join('')
  input = input
    .map((i) => i.split(' | '))
    .map((i) => ({
      in: i[0]
        .split(' ')
        .map(sortWord)
        .sort((a, b) => a.length - b.length),
      out: i[1].split(' ').map(sortWord),
    }))

  function buildMapping(input) {
    const one = input[0]
    const seven = input[1]
    const four = input[2]
    const eight = input[9]

    const three = input.find(
      (i) => i.length === 5 && [...seven].every((c) => i.includes(c))
    )
    const nine = input.find(
      (i) => i.length === 6 && [...seven, ...four].every((c) => i.includes(c))
    )
    const zero = input.find(
      (i) =>
        i.length === 6 && [...seven].every((c) => i.includes(c)) && i !== nine
    )
    const six = input.find((i) => i.length === 6 && i !== nine && i !== zero)
    const fourMinusOne = [...four].filter((c) => ![...one].includes(c)).join('')
    const five = input.find(
      (i) => i.length === 5 && [...fourMinusOne].every((c) => i.includes(c))
    )
    const two = input.find((i) => i.length === 5 && i !== five && i !== three)

    const output = {
      [zero]: 0,
      [one]: 1,
      [two]: 2,
      [three]: 3,
      [four]: 4,
      [five]: 5,
      [six]: 6,
      [seven]: 7,
      [eight]: 8,
      [nine]: 9,
    }

    return output
  }

  output = 0
  for (let line of input) {
    const map = buildMapping(line.in)
    const num = line.out.map((o) => map[o]).reduce((agg, val) => agg + val, '')
    output += Number(num)
  }

  console.log('Part 2:', output)
}
