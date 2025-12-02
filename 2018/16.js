export default function (input) {
  const instructions = {
    addr: { opcode: null, func: (reg, a, b, c) => (reg[c] = reg[a] + reg[b]) },
    addi: { opcode: null, func: (reg, a, b, c) => (reg[c] = reg[a] + b) },
    mulr: { opcode: null, func: (reg, a, b, c) => (reg[c] = reg[a] * reg[b]) },
    muli: { opcode: null, func: (reg, a, b, c) => (reg[c] = reg[a] * b) },
    banr: { opcode: null, func: (reg, a, b, c) => (reg[c] = reg[a] & reg[b]) },
    bani: { opcode: null, func: (reg, a, b, c) => (reg[c] = reg[a] & b) },
    borr: { opcode: null, func: (reg, a, b, c) => (reg[c] = reg[a] | reg[b]) },
    bori: { opcode: null, func: (reg, a, b, c) => (reg[c] = reg[a] | b) },
    setr: { opcode: null, func: (reg, a, b, c) => (reg[c] = reg[a]) },
    seti: { opcode: null, func: (reg, a, b, c) => (reg[c] = a) },
    gtir: {
      opcode: null,
      func: (reg, a, b, c) => (reg[c] = a > reg[b] ? 1 : 0),
    },
    gtri: {
      opcode: null,
      func: (reg, a, b, c) => (reg[c] = reg[a] > b ? 1 : 0),
    },
    gtrr: {
      opcode: null,
      func: (reg, a, b, c) => (reg[c] = reg[a] > reg[b] ? 1 : 0),
    },
    eqir: {
      opcode: null,
      func: (reg, a, b, c) => (reg[c] = a === reg[b] ? 1 : 0),
    },
    eqri: {
      opcode: null,
      func: (reg, a, b, c) => (reg[c] = reg[a] === b ? 1 : 0),
    },
    eqrr: {
      opcode: null,
      func: (reg, a, b, c) => (reg[c] = reg[a] === reg[b] ? 1 : 0),
    },
  }

  const regEqual = (reg1, reg2) => reg1.join(',') === reg2.join(',')

  let tests = []
  let index = 0
  do {
    tests.push({
      before: input[index]
        .match(/^Before:\s+\[(.*)\]$/)[1]
        .split(', ')
        .map(Number),
      instruction: input[index + 1].split(' ').map(Number),
      after: input[index + 2]
        .match(/^After:\s+\[(.*)\]$/)[1]
        .split(', ')
        .map(Number),
    })
    index += 4
  } while (input[index] !== '')

  index += 2
  let program = input.slice(index).map((i) => i.split(' ').map(Number))

  let output = 0
  let opcodeMap = [...Array(Object.keys(instructions).length)].map((i) =>
    Object.keys(instructions)
  )
  for (let test of tests) {
    let matchingInstr = 0
    for (let instr of Object.keys(instructions)) {
      const reg = structuredClone(test.before)
      instructions[instr].func(
        reg,
        test.instruction[1],
        test.instruction[2],
        test.instruction[3]
      )
      if (regEqual(reg, test.after)) {
        matchingInstr++
      } else {
        opcodeMap[test.instruction[0]] = opcodeMap[test.instruction[0]].filter(
          (m) => m !== instr
        )
      }
    }
    if (matchingInstr >= 3) {
      output++
    }
  }

  console.log('part 1:', output)

  while (opcodeMap.filter((o) => o).length > 0) {
    const next = opcodeMap.findIndex((o) => o?.length === 1)
    instructions[opcodeMap[next][0]].opcode = next
    opcodeMap = opcodeMap.map((o) => o.filter((i) => i !== opcodeMap[next][0]))
    delete opcodeMap[next]
  }

  const reg = [0, 0, 0, 0]
  for (let p of program) {
    Object.values(instructions)
      .find((i) => i.opcode === p[0])
      .func(reg, p[1], p[2], p[3])
  }
  console.log('part 2:', reg[0])
}
