export default function (input) {
  const check = (pass) => {
    const split = pass.split(' ')
    return split.filter((e, i, a) => a.indexOf(e) === i).length === split.length
  }
  console.log('part 1:', input.filter(check).length)

  const check2 = (pass) => {
    const split = pass.split(' ').map((w) =>
      w
        .split('')
        .sort((a, b) => a.localeCompare(b))
        .join('')
    )
    return split.filter((e, i, a) => a.indexOf(e) === i).length === split.length
  }
  console.log('part 2:', input.filter(check2).length)
}
