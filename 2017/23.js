export default function (input) {
  const instructions = input
    .map((i) => i.match(/^(.+) (.+) (.*)$/))
    .map((i) => [i[1], i[2], i[3]])

  const getValue = (value, registers) =>
    isNaN(Number(value)) ? registers[value] : Number(value)

  let registers = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
  }
  let multiplies = 0
  for (let i = 0; i < instructions.length; i++) {
    const instr = instructions[i]
    if (instr[0] === 'set') {
      registers[instr[1]] = getValue(instr[2], registers)
    } else if (instr[0] == 'sub') {
      registers[instr[1]] -= getValue(instr[2], registers)
    } else if (instr[0] === 'mul') {
      registers[instr[1]] *= getValue(instr[2], registers)
      multiplies++
    } else if (instr[0] === 'jnz') {
      if (getValue(instr[1], registers) !== 0) {
        i += getValue(instr[2], registers) - 1
      }
    }
  }

  console.log('part 1:', multiplies)

  // This is by manually analyzing the program
  // The challenge is weird. With only one input, it's hard to know what to optimize in the general case
  // The following is an optimization of the input given a = 1
  var b = 81 * 100 + 100000
  var c = b + 17000
  var h = 0
  for (; b <= c; b += 17) {
    let f = 1
    for (let e = 2; e < b; e++) {
      if (b % e === 0) {
        f = 0
      }
    }
    if (f === 0) h++
  }

  console.log('part 2:', h)
}
