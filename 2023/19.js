export default function (input) {
  let instructions = {},
    i = 0
  for (; i < input.length; i++) {
    if (input[i] === '') break

    const [_, name, nodes] = input[i].match(/(\w+)\{(.+)\}/)
    let rules = []
    for (let n of nodes.split(',')) {
      if (n.includes(':')) {
        const [_, param, op, value, next] = n.match(
          /^([xmas])([<>])(\d+):(\w+)$/
        )
        rules.push({
          f: (obj) =>
            op === '<' ? obj[param] < value / 1 : obj[param] > value / 1,
          n: next,
        })
      } else if (n === 'A') {
        rules.push({ f: () => true, n })
      } else if (n === 'R') {
        rules.push({ f: () => true, n })
      } else {
        rules.push({ f: () => true, n })
      }
    }
    instructions[name] = rules
  }
  let parts = []
  for (i++; i < input.length; i++) {
    const values = input[i]
      .slice(1, -1)
      .split(',')
      .map((v) => v.split('='))
      .reduce((a, v) => ({ ...a, [v[0]]: v[1] / 1 }), {})
    parts.push(values)
  }

  const checkPart = (part) => {
    let instr = 'in'
    loop: while (!['A', 'R'].includes(instr)) {
      for (let rule of instructions[instr]) {
        if (rule.f(part)) {
          instr = rule.n
          continue loop
        }
      }
      instr = 'R'
    }
    return instr === 'A'
  }

  let output = parts
    .filter(checkPart)
    .map((p) => Object.values(p).sum())
    .sum()
  console.log('part 1:', output)

  instructions = []
  for (let i = 0; input[i] !== ''; i++) {
    const [_, name, instr] = input[i].match(/^(\w+)\{(.*)\}$/)
    // replace last rule with catch all equation
    const instruction = instr
      .split(',')
      .map((i) =>
        i.includes(':') ? i.replace(/^(.*?):/, '"$1":') : '"*":' + i
      )
      .join(',')
      .replace(/([AR])/g, '"$1"')
    instructions.push({
      name,
      instr: '{' + instruction + '}',
    })
  }

  // reduce rules back to first node
  while (instructions.length > 1) {
    const nodeNames = instructions.map((i) => '\\b' + i.name + '\\b').join('|')
    let next = instructions.findIndex(
      (i) => i.name !== 'in' && !i.instr.match(nodeNames)
    )
    next = instructions.splice(next, 1)[0]
    instructions = instructions.map((i) => ({
      ...i,
      instr: i.instr.replace(new RegExp('\\b' + next.name + '\\b'), next.instr),
    }))
  }

  instructions = JSON.parse(instructions[0].instr)

  // split rule into decision nodes with constraints
  let nodes = [
      {
        rules: instructions,
        constraint: { x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000] },
      },
    ],
    acceptedConstraints = []
  while (nodes.length) {
    const next = nodes.pop()
    const nodeConstraint = next.constraint
    const nodeRules = Object.keys(next.rules)
    for (let rule of nodeRules) {
      if (rule === '*') {
        // Last rule
        if (next.rules[rule] === 'A') {
          acceptedConstraints.push(nodeConstraint)
        } else if (next.rules[rule] !== 'R') {
          // continue with compiled constraint
          nodes.push({
            rules: next.rules[rule],
            constraint: nodeConstraint,
          })
        }
      } else {
        const param = rule[0],
          op = rule[1],
          value = rule.slice(2) / 1
        if (next.rules[rule] === 'A') {
          const acceptedConstraint = JSON.parse(JSON.stringify(nodeConstraint))
          if (op === '<') {
            acceptedConstraint[param][1] = Math.min(
              acceptedConstraint[param][1],
              value - 1
            )
            nodeConstraint[param][0] = Math.max(nodeConstraint[param][0], value)
          } else {
            acceptedConstraint[param][0] = Math.max(
              acceptedConstraint[param][0],
              value + 1
            )
            nodeConstraint[param][1] = Math.min(nodeConstraint[param][1], value)
          }
          acceptedConstraints.push(acceptedConstraint)
        } else if (next.rules[rule] === 'R') {
          if (op === '<') {
            nodeConstraint[param][0] = Math.max(nodeConstraint[param][0], value)
          } else {
            nodeConstraint[param][1] = Math.min(nodeConstraint[param][1], value)
          }
        } else {
          const continueConstraint = JSON.parse(JSON.stringify(nodeConstraint))
          if (op === '<') {
            continueConstraint[param][1] = Math.min(
              continueConstraint[param][1],
              value - 1
            )
            nodeConstraint[param][0] = Math.max(nodeConstraint[param][0], value)
          } else {
            continueConstraint[param][0] = Math.max(
              continueConstraint[param][0],
              value + 1
            )
            nodeConstraint[param][1] = Math.min(nodeConstraint[param][1], value)
          }
          nodes.push({
            rules: next.rules[rule],
            constraint: continueConstraint,
          })
        }
      }
    }
  }

  output = acceptedConstraints
    .map((c) =>
      Object.values(c)
        .map((v) => v[1] - v[0] + 1)
        .product()
    )
    .sum()

  console.log('part 2:', output)
}
