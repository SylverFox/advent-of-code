export default function (input) {
  const initial = input[0].slice(15)
  const notes = Object.fromEntries(input.slice(2).map((i) => i.split(' => ')))

  const grow = (pots, gens) => {
    let index = 0
    let cache = new Map()
    for (let g = 0; g < gens; g++) {
      pots = pots.replace(/(?<!\.)\.*$/, '....').replace(/^\.*/, (m) => {
        index += 4 - m.length
        return '....'
      })
      let newGen = ''
      for (let i = 2; i < pots.length - 2; i++) {
        newGen += notes[pots.slice(i - 2, i + 3)] ?? '.'
      }
      pots = '..' + newGen + '..'

      if (cache.has(pots)) {
        // loop found, fast forward the remainder
        index += (gens - g - 1) * (index - cache.get(pots))
        break
      } else {
        cache.set(pots, index)
      }
    }
    return pots
      .split('')
      .map((p, i) => (p === '#' ? i - index : 0))
      .sum()
  }

  console.log('part 1:', grow(initial, 20))
  console.log('part 2:', grow(initial, 50000000000))
}
