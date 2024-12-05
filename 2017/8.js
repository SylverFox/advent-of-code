export default function (input) {
  const instructions = input
    .map((i) => i.match(/^(\w+) (dec|inc) (-?\d+) if (\w+) (.*?) (-?\d+)$/))
    .map((i) => ({
      reg: i[1],
      inc: (i[2] === 'dec' ? -1 : 1) * Number(i[3]),
      condition: `registers.${i[4]} ${i[5]} ${i[6]}`,
    }))
  const registers = Object.fromEntries(
    instructions
      .map((i) => i.reg)
      .filter((e, i, a) => a.indexOf(e) === i)
      .sort()
      .map((r) => [r, 0])
  )

  const getHighestRegister = () =>
    Object.values(registers).sort((a, b) => b - a)[0]

  let highestValue = getHighestRegister()
  for (let instr of instructions) {
    if (eval(instr.condition)) {
      registers[instr.reg] += instr.inc
      highestValue = Math.max(highestValue, getHighestRegister())
    }
  }

  console.log('part 1:', getHighestRegister())
  console.log('part 2:', highestValue)
}
