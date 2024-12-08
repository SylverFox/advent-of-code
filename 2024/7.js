export default function (input) {
  input = input
    .map((i) => i.split(': '))
    .map((i) => ({
      ans: Number(i[0]),
      values: i[1].split(' ').map(Number),
    }))

  const solve = (result, values) => {
    if (values.length === 1) {
      return values[0] === result
    }

    if (result % values[0] === 0) {
      return (
        solve(result / values[0], values.slice(1)) ||
        solve(result - values[0], values.slice(1))
      )
    } else {
      return solve(result - values[0], values.slice(1))
    }
  }

  let output = input
    .filter((i) => solve(i.ans, i.values.slice().reverse()))
    .map((i) => i.ans)
    .sum()
  console.log('part 1:', output)

  const solve2 = (result, values) => {
    let calculations = values.splice(0, 1)
    for (let v of values) {
      let newCalculations = []
      for (let c of calculations) {
        newCalculations.push(c + v)
        newCalculations.push(c * v)
        newCalculations.push(Number(`${c}${v}`))
      }
      calculations = newCalculations
    }

    return calculations.includes(result)
  }

  output = input
    .filter((i) => solve2(i.ans, i.values))
    .map((i) => i.ans)
    .sum()
  console.log('part 2:', output)
}
