import { gcd } from '../common.js'

export default function (input) {
  let machines = []
  for (let i = 0; i < input.length; i += 4) {
    const A = input[i].match(/Button A: X(.*), Y(.*)/)
    const B = input[i + 1].match(/Button B: X(.*), Y(.*)/)
    const prize = input[i + 2].match(/Prize: X=(\d+), Y=(\d+)/)
    machines.push({
      A: { x: A[1] / 1, y: A[2] / 1 },
      B: { x: B[1] / 1, y: B[2] / 1 },
      prize: { x: prize[1] / 1, y: prize[2] / 1 },
    })
  }

  const round = (num, p = 100) => Math.round(num * p) / p

  let output = 0,
    output2 = 0
  for (let machine of machines) {
    const D = machine.A.y / machine.A.x
    const B = round(
      (machine.prize.y - D * machine.prize.x) / (machine.B.y - D * machine.B.x)
    )
    const A = round((machine.prize.x - B * machine.B.x) / machine.A.x)
    if (Math.floor(A) === A && Math.floor(B) === B) {
      output += 3 * A + B
    }
  }
  console.log('part 1:', output)

  output = 0
  for (let machine of machines) {
    const D = machine.A.y / machine.A.x

    const B2 = round(
      (machine.prize.y + 1e13 - D * (machine.prize.x + 1e13)) /
        (machine.B.y - D * machine.B.x)
    )
    const A2 = round((machine.prize.x + 1e13 - B2 * machine.B.x) / machine.A.x)
    if (Math.floor(A2) === A2 && Math.floor(B2) === B2) {
      output2 += 3 * A2 + B2
    }
  }
  console.log('part 2:', output2)
}
