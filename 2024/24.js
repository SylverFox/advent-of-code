export default function (input) {
  const split = input.indexOf('')
  const wires = input
    .slice(0, split)
    .map((i) => i.split(': '))
    .reduce((a, v) => ({ ...a, [v[0]]: v[1] / 1 }), {})
  const gates = input
    .slice(split + 1)
    .map((i) => i.match(/^(\S+) (\S+) (\S+) -> (\S+)$/))
    .map((i) => ({ a: i[1], b: i[3], op: i[2], out: i[4] }))

  const run = (wires) => {
    wires = structuredClone(wires)
    let update
    do {
      update = false
      for (let g of gates) {
        if (
          wires[g.out] === undefined &&
          wires[g.a] !== undefined &&
          wires[g.b] !== undefined
        ) {
          if (g.op === 'AND') {
            wires[g.out] = wires[g.a] & wires[g.b]
          } else if (g.op === 'OR') {
            wires[g.out] = wires[g.a] | wires[g.b]
          } else if (g.op === 'XOR') {
            wires[g.out] = wires[g.a] ^ wires[g.b]
          }
          update = true
        }
      }
    } while (update)

    return Object.keys(wires)
      .filter((w) => w.match(/^z/))
      .sort()
      .reverse()
      .reduce((a, v) => a + wires[v], '')
  }

  console.log('part 1:', parseInt(run(wires), 2))

  const h = (g) => `${g.a} ${g.op} ${g.b} -> ${g.out}`
  const swap = (g1, g2) => {
    const swap = gates[g1].out
    gates[g1].out = gates[g2].out
    gates[g2].out = swap
  }

  // determine output overflow on b == 0
  let IC = gates.find(
    (g) =>
      ((g.a === 'x00' && g.b === 'y00') || (g.a === 'y00' && g.b === 'x00')) &&
      g.op === 'AND'
  ).out

  // loop over adders and fix gates
  let swaps = []
  for (let b = 1; b < 45; b++) {
    let X = 'x' + (b + '').padStart(2, '0')
    let Y = 'y' + (b + '').padStart(2, '0')
    let Z = 'z' + (b + '').padStart(2, '0')

    // Every adder step needs the following gates (ic => input overflow, oc => output overflow)
    // g1: X XOR Y -> abc
    // g2: X AND Y -> def
    // g3: abc XOR IC -> Z
    // g4: abc AND IC -> ghi
    // g5: def OR ghi -> OC
    const g1 = gates.find(
      (g) =>
        ((g.a === X && g.b === Y) || (g.a === Y && g.b === X)) && g.op === 'XOR'
    )
    const g2 = gates.find(
      (g) =>
        ((g.a === X && g.b === Y) || (g.a === Y && g.b === X)) && g.op === 'AND'
    )
    const g3 = gates.find(
      (g) =>
        ((g.a === g1.out && g.b === IC) || (g.a === IC && g.b === g1.out)) &&
        g.op === 'XOR'
    )
    const g4 = gates.find(
      (g) =>
        ((g.a === g1.out && g.b === IC) || (g.a === IC && g.b === g1.out)) &&
        g.op === 'AND'
    )
    const g5 = gates.find(
      (g) =>
        ((g.a === g2?.out && g.b === g4?.out) ||
          (g.a === g4?.out && g.b === g2?.out)) &&
        g.op === 'OR'
    )

    // repair broken states
    if (!g3) {
      // g1 or g2 is incorrect
      // try replacing g1, only 1 other gate should be able to go to Z
      const correct_g3 = gates.find(
        (g) => (g.a === IC || g.b === IC) && g.op === 'XOR' && g.out === Z
      )
      // the wire that is not IC is the the actual output of g1
      const g1out = correct_g3.a === IC ? correct_g3.b : correct_g3.a
      const swap_g1 = gates.find((g) => g.out === g1out)
      swaps.push(g1.out, g1out)
      swap(gates.indexOf(g1), gates.indexOf(swap_g1))
      b--
      continue
    } else if (g3.out !== Z) {
      const correct_g3 = gates.find((g) => g.out === Z)
      if (correct_g3) {
        swaps.push(g3.out, correct_g3.out)
        swap(gates.indexOf(g3), gates.indexOf(correct_g3))
        b--
        continue
      }
    }

    if (!g1 || !g2 || !g3 || !g4 || !g5) {
      return
    }

    IC = g5.out
  }

  console.log('part 2:', swaps.sort().join(','))
}
