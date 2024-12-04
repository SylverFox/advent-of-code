const OP = {
  SUM: 1,
  MULT: 2,
  INPUT: 3,
  OUTPUT: 4,
  JUMP_IF_TRUE: 5,
  JUMP_IF_FALSE: 6,
  LESS: 7,
  EQ: 8,
  OFFSET: 9,
  EXIT: 99,
}

const MODE = {
  POSITION: '0',
  IMMEDIATE: '1',
  RELATIVE: '2',
}

class Program {
  constructor(programData, input = [], debug = false) {
    this.programData = programData.slice()
    this.input = input.slice()
    this.output = []
    this.debug = debug
    this.ip = 0
    this.exited = false
    this.hadOutput = false
    this.relativeBase = 0
  }

  getVal(mode) {
    let value
    if (mode === MODE.IMMEDIATE) {
      value = this.programData[this.ip++]
    } else if (mode === MODE.POSITION) {
      value = this.programData[this.programData[this.ip++]]
    } else if (mode === MODE.RELATIVE) {
      value = this.programData[this.programData[this.ip++] + this.relativeBase]
    }
    return value || 0
  }

  setVal(val, mode) {
    if (mode === MODE.IMMEDIATE) {
      this.programData[this.ip++] = val
    } else if (mode === MODE.POSITION) {
      this.programData[this.programData[this.ip++]] = val
    } else if (mode === MODE.RELATIVE) {
      this.programData[this.programData[this.ip++] + this.relativeBase] = val
    }
  }

  step() {
    if (this.exited) return
    this.hadOutput = false

    const next = this.getVal(MODE.IMMEDIATE)
    const opcode = next % 100
    const mode = ('' + (next - opcode) / 100).padStart(3, '0')

    if (this.debug)
      console.log(
        `ip: ${this.ip}, opcode: ${opcode}, mode: ${mode}, base: ${this.relativeBase}`
      )

    if (opcode === OP.EXIT) {
      this.exited = true
    } else if (opcode === OP.SUM) {
      const arg1 = this.getVal(mode[2])
      const arg2 = this.getVal(mode[1])
      this.setVal(arg1 + arg2, mode[0])
    } else if (opcode === OP.MULT) {
      const arg1 = this.getVal(mode[2])
      const arg2 = this.getVal(mode[1])
      this.setVal(arg1 * arg2, mode[0])
    } else if (opcode === OP.INPUT) {
      const input = this.input.shift()
      if (input === null) {
        throw new Error('Not input to retrieve')
      }
      this.setVal(input, mode[2])
    } else if (opcode === OP.OUTPUT) {
      const arg1 = this.getVal(mode[2])
      this.output.push(arg1)
      this.hadOutput = true
    } else if (opcode === OP.JUMP_IF_TRUE) {
      const arg1 = this.getVal(mode[2])
      const arg2 = this.getVal(mode[1])
      if (arg1 !== 0) {
        this.ip = arg2
      }
    } else if (opcode === OP.JUMP_IF_FALSE) {
      const arg1 = this.getVal(mode[2])
      const arg2 = this.getVal(mode[1])
      if (arg1 === 0) {
        this.ip = arg2
      }
    } else if (opcode === OP.LESS) {
      const arg1 = this.getVal(mode[2])
      const arg2 = this.getVal(mode[1])
      this.setVal(arg1 < arg2 ? 1 : 0, mode[0])
    } else if (opcode === OP.EQ) {
      const arg1 = this.getVal(mode[2])
      const arg2 = this.getVal(mode[1])
      this.setVal(arg1 === arg2 ? 1 : 0, mode[0])
    } else if (opcode === OP.OFFSET) {
      const arg1 = this.getVal(mode[2])
      this.relativeBase += arg1
    }

    if (this.debug)
      console.log(
        'program:',
        this.programData.join(','),
        'output:',
        this.output.join(',')
      )
  }

  run() {
    while (!this.exited) this.step()
  }
}

export function runProgram(programData, input = [], debug = false) {
  const program = new Program(programData, input, debug)
  program.run()
  return {
    program: program.programData,
    output: program.output,
  }
}

export function runPipedProgram(programData, input = [], debug = false) {
  const programs = []
  for (let i = 0; i < input.length; i++) {
    programs.push(new Program(programData, input[i], debug))
  }
  let runningProgram = 0
  while (!programs.every((p) => p.exited)) {
    programs[runningProgram].step()
    if (programs[runningProgram].hadOutput) {
      const output = programs[runningProgram].output.slice(-1)[0]
      runningProgram = (runningProgram + 1) % programs.length
      programs[runningProgram].input.push(output)
    }
    if (programs[runningProgram].exited) {
      runningProgram = (runningProgram + 1) % programs.length
    }
  }
  return programs.map((p) => ({
    program: p.programData,
    output: p.output,
  }))
}

export default function (input) {
  const program = input[0].split(',').map((c) => Number(c))

  let out = runProgram(program, [1])
  console.log('Part 1:', out.output.pop())
  out = runProgram(program, [5])
  console.log('Part 2:', out.output.pop())
}
