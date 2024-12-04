export default function (input) {
  let rules = input.slice(),
    vars = {}
  for (let r = 0; r < rules.length; r++) {
    const match = rules[r].match(/^(\d+) -> (\w+)$/)
    if (match) {
      vars[match[2]] = match[1] / 1
      rules.splice(r--, 1)
    }
  }

  const parse = () => {
    let r = -1
    while (rules.length) {
      r = (r + 1) % rules.length

      let [_, arg1, op, arg2, out] = rules[r].match(
        /(?:(?:(.*) )?(.*) )?(.*) -> (.*)/
      )

      if (arg1 && isNaN(arg1 / 1) && !(arg1 in vars)) continue
      arg1 = vars[arg1] || arg1 / 1
      if (arg2 && isNaN(arg2 / 1) && !(arg2 in vars)) continue
      arg2 = vars[arg2] || arg2 / 1
      if (!op) op = 'NOOP'

      vars[out] = {
        NOT: (a, b) => ~b >>> 0,
        AND: (a, b) => a & b,
        OR: (a, b) => a | b,
        LSHIFT: (a, b) => a << b,
        RSHIFT: (a, b) => a >>> b,
        NOOP: (a, b) => b,
      }[op](arg1, arg2)

      rules.splice(r--, 1)
    }
  }

  parse()
  let output = vars['a']
  console.log('Part 1:', output)

  ;(rules = input.slice()), (vars = {})
  for (let r = 0; r < rules.length; r++) {
    const match = rules[r].match(/^(\d+) -> (\w+)$/)
    if (match) {
      vars[match[2]] = match[1] / 1
      rules.splice(r--, 1)
    }
  }
  vars['b'] = output

  parse()
  console.log('Part 2:', vars['a'])
}
