export default function (input) {
  const initialState = input[0].match(/state (\w+)/)[1]
  const steps = Number(input[1].match(/after (\d+) steps/)[1])
  let states = {}
  for (let l = 3; l < input.length; l += 10) {
    const stateKey = input[l].match(/In state (\w+):/)[1]
    const valOn0 = Number(input[l + 2].match(/Write the value ([01])/)[1])
    const moveOn0 = input[l + 3].match(/Move one slot to the (right|left)/)[1]
    const continueOn0 = input[l + 4].match(/Continue with state (\w+)/)[1]
    const valOn1 = Number(input[l + 6].match(/Write the value ([01])/)[1])
    const moveOn1 = input[l + 7].match(/Move one slot to the (right|left)/)[1]
    const continueOn1 = input[l + 8].match(/Continue with state (\w+)/)[1]
    states[stateKey] = [
      { write: valOn0, move: moveOn0 === 'right' ? 1 : -1, next: continueOn0 },
      { write: valOn1, move: moveOn1 === 'right' ? 1 : -1, next: continueOn1 },
    ]
  }

  let tape = [0]
  let cursor = 0
  let state = initialState
  for (let step = 0; step < steps; step++) {
    const read = tape[cursor] ?? 0
    tape[cursor] = states[state][read].write
    cursor += states[state][read].move
    state = states[state][read].next

    if (cursor < 0) {
      tape.unshift(0)
      cursor++
    }
  }

  console.log('part 1:', tape.sum())
}
