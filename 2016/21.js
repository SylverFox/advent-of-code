export default function (input) {
  let pass = 'abcdefgh'.split('')

  const swap = (a, b) => {
    const swap = pass[a]
    pass[a] = pass[b]
    pass[b] = swap
  }
  const rotateLeft = (r) => (pass = [...pass.slice(r), ...pass.slice(0, r)])
  const rotateRight = (r) => (pass = [...pass.slice(-r), ...pass.slice(0, -r)])
  const reverse = (a, b) =>
    (pass = [
      ...pass.slice(0, a),
      ...pass.slice(a, b / 1 + 1).reverse(),
      ...pass.slice(b / 1 + 1),
    ])
  const move = (a, b) => {
    const x = pass.splice(a, 1)
    pass.splice(b, 0, ...x)
  }

  for (let i of input) {
    if (i.startsWith('swap position')) {
      const [_, a, b] = i.match(/^swap position (.) with position (.)$/)
      swap(a, b)
    } else if (i.startsWith('swap letter')) {
      const [_, a, b] = i.match(/^swap letter (.) with letter (.)$/)
      const [ai, bi] = [a, b].map((x) => pass.indexOf(x))
      swap(ai, bi)
    } else if (i.startsWith('rotate left')) {
      const [_, r] = i.match(/^rotate left (.) steps?$/)
      rotateLeft(r)
    } else if (i.startsWith('rotate right')) {
      const [_, r] = i.match(/^rotate right (.) steps?$/)
      rotateRight(r)
    } else if (i.startsWith('rotate based')) {
      const [_, a] = i.match(/^rotate based on position of letter (.)$/)
      const r = (pass.indexOf(a) + (pass.indexOf(a) >= 4 ? 2 : 1)) % pass.length
      rotateRight(r)
    } else if (i.startsWith('reverse')) {
      const [_, a, b] = i.match(/^reverse positions (.) through (.)$/)
      reverse(a, b)
    } else if (i.startsWith('move')) {
      const [_, a, b] = i.match(/^move position (.) to position (.)$/)
      move(a, b)
    }
  }
  console.log('part 1:', pass.join(''))

  pass = 'fbgdceah'.split('')

  for (let i of input.reverse()) {
    if (i.startsWith('swap position')) {
      const [_, a, b] = i.match(/^swap position (.) with position (.)$/)
      swap(a, b)
    } else if (i.startsWith('swap letter')) {
      const [_, a, b] = i.match(/^swap letter (.) with letter (.)$/)
      const [ai, bi] = [a, b].map((x) => pass.indexOf(x))
      swap(ai, bi)
    } else if (i.startsWith('rotate left')) {
      const [_, r] = i.match(/^rotate left (.) steps?$/)
      rotateRight(r)
    } else if (i.startsWith('rotate right')) {
      const [_, r] = i.match(/^rotate right (.) steps?$/)
      rotateLeft(r)
    } else if (i.startsWith('rotate based')) {
      const [_, a] = i.match(/^rotate based on position of letter (.)$/)
      const r = [1, 1, 6, 2, 7, 3, 0, 4][pass.indexOf(a)]
      rotateLeft(r)
    } else if (i.startsWith('reverse')) {
      const [_, a, b] = i.match(/^reverse positions (.) through (.)$/)
      reverse(a, b)
    } else if (i.startsWith('move')) {
      const [_, a, b] = i.match(/^move position (.) to position (.)$/)
      move(b, a)
    }
  }
  console.log('part 2:', pass.join(''))
}
