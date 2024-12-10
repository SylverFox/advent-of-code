class Machine1 {
  constructor(instructions) {
    this.instructions = structuredClone(instructions)
    this.registers = this.instructions
      .map((i) => i.reg)
      .filter((i) => isNaN(Number(i)))
      .reduce((a, v) => ({ ...a, [v]: 0 }), {})
  }

  run() {
    let lastFrequency = 0
    for (let i = 0; i < this.instructions.length; i++) {
      const instr = this.instructions[i]
      if (instr.command === 'snd') lastFrequency = this.getReg(instr)
      else if (instr.command === 'set')
        this.registers[instr.reg] = this.getParam(instr)
      else if (instr.command === 'add')
        this.registers[instr.reg] += this.getParam(instr)
      else if (instr.command === 'mul')
        this.registers[instr.reg] *= this.getParam(instr)
      else if (instr.command === 'mod')
        this.registers[instr.reg] %= this.getParam(instr)
      else if (instr.command === 'rcv' && this.getReg(instr) > 0)
        return lastFrequency
      else if (instr.command === 'jgz' && this.registers[instr.reg] > 0)
        i += this.getParam(instr) - 1
    }
  }

  getReg(instruction) {
    return isNaN(Number(instruction.reg))
      ? this.registers[instruction.reg]
      : Number(instruction.reg)
  }

  getParam(instruction) {
    return typeof instruction.param === 'number'
      ? instruction.param
      : this.registers[instruction.param]
  }
}

class Machine2 {
  constructor(instructions, id) {
    this.instructions = structuredClone(instructions)
    this.registers = this.instructions
      .map((i) => i.reg)
      .filter((i) => isNaN(Number(i)))
      .reduce((a, v) => ({ ...a, [v]: 0 }), {})
    this.registers.p = id
    this.outbox = []
    this.inbox = []
    this.index = 0
    this.ended = false
  }

  run() {
    while (this.index < this.instructions.length) {
      const instr = this.instructions[this.index]
      if (instr.command === 'snd') this.outbox.push(this.getReg(instr))
      else if (instr.command === 'set')
        this.registers[instr.reg] = this.getParam(instr)
      else if (instr.command === 'add')
        this.registers[instr.reg] += this.getParam(instr)
      else if (instr.command === 'mul')
        this.registers[instr.reg] *= this.getParam(instr)
      else if (instr.command === 'mod')
        this.registers[instr.reg] %= this.getParam(instr)
      else if (instr.command === 'jgz' && this.getReg(instr) > 0)
        this.index += this.getParam(instr) - 1
      else if (instr.command === 'rcv') {
        if (this.inbox.length) {
          this.registers[instr.reg] = this.inbox.shift()
        } else {
          // There is nothing in the inbox, we exit the run state, and resume once we have messages
          return
        }
      }

      this.index++
    }
    // Signal end of instructions
    this.ended = true
  }

  getReg(instruction) {
    return isNaN(Number(instruction.reg))
      ? this.registers[instruction.reg]
      : Number(instruction.reg)
  }

  getParam(instruction) {
    return typeof instruction.param === 'number'
      ? instruction.param
      : this.registers[instruction.param]
  }
}

export default function (input) {
  const instructions = input
    .map((i) => i.match(/(\w+) (\S+)( (\S+))?/))
    .map((i) => ({
      command: i[1],
      reg: i[2],
      param: isNaN(Number(i[4])) ? i[4] : Number(i[4]),
    }))

  const simpleMachine = new Machine1(instructions)
  console.log('part 1:', simpleMachine.run())

  const machineA = new Machine2(instructions, 0)
  const machineB = new Machine2(instructions, 1)
  let output = 0

  while (true) {
    // Run both machine until they stop (either end of instructions or receiving messages)
    machineA.run()
    machineB.run()

    output += machineB.outbox.length

    // Exchange message queue
    machineA.inbox = [...machineA.inbox, ...machineB.outbox]
    machineB.outbox = []
    machineB.inbox = [...machineB.inbox, ...machineA.outbox]
    machineA.outbox = []

    // machines are idle on end of instructions or if there are no messages to process
    const machineAIdle = machineA.ended || !machineA.inbox.length
    const machineBIdle = machineB.ended || !machineB.inbox.length
    if (machineAIdle && machineBIdle) break
  }
  console.log('part 2:', output)
}
