export default function (input) {
  let dial = 50,
    output1 = 0,
    output2 = 0

  for (let i of input) {
    let r = Number(i.slice(1)) * (i.startsWith('R') ? 1 : -1)
    output2 += Math.floor(Math.abs(r) / 100)
    r %= 100

    if (dial !== 0 && (dial + r <= 0 || dial + r > 99)) {
      output2 += 1
    }

    dial = (dial + r + 100) % 100
    if (dial === 0) {
      output1 += 1
    }
  }

  console.log('part 1:', output1)
  console.log('part 2:', output2)
}
