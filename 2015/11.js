export default function (input) {
  input = input[0]

  const increment = (pass) => {
    const nums = pass.split('').map((p) => p.codePointAt() - 97)
    for (let n = nums.length - 1; n > 0; n--) {
      nums[n] = (nums[n] + 1) % 26
      if (nums[n] > 0) break
      if (n === 0) nums.unshift(1)
    }
    return nums.map((n) => String.fromCodePoint(n + 97)).join('')
  }

  const valid = (pass) =>
    pass
      .split('')
      .map((p) => p.codePointAt() - 97)
      .find((e, i, a) => a[i + 2] - a[i + 1] === 1 && a[i + 1] - a[i] === 1) !==
      undefined &&
    !pass.match(/[iol]/) &&
    pass.match(/(.)\1/g)?.filter((e, i, a) => a.indexOf(e) === i).length >= 2

  let output = input
  while (!valid(output)) {
    output = increment(output)
  }
  console.log('Part 1:', output)

  output = increment(output)
  while (!valid(output)) {
    output = increment(output)
  }
  console.log('Part 2:', output)
}
