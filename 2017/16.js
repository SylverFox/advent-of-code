export default function (input) {
  input = input[0].split(',')

  const dance = (programs) => {
    for (let i of input) {
      if (i.startsWith('s')) {
        const slice = i.match(/\d+/)
        programs = [...programs.slice(-slice), ...programs.slice(0, -slice)]
      } else if (i.startsWith('x')) {
        const [_, a, b] = i.match(/(\d+)\/(\d+)/)
        const swap = programs[a]
        programs[a] = programs[b]
        programs[b] = swap
      } else if (i.startsWith('p')) {
        const [_, a, b] = i.match(/p(\w+)\/(\w+)/)
        const ai = programs.indexOf(a)
        const bi = programs.indexOf(b)
        const swap = programs[ai]
        programs[ai] = programs[bi]
        programs[bi] = swap
      }
    }
    return programs
  }

  console.log('part 1:', dance('abcdefghijklmnop'.split('')).join(''))

  let programs = 'abcdefghijklmnop'.split('')
  let states = ['abcdefghijklmnop']
  for (let i = 1; i < 1_000_000_000; i++) {
    programs = dance(programs)
    states.push(programs.join(''))

    if (programs.join('') === 'abcdefghijklmnop') {
      // loop detected, the remainder is the index of already performed moves
      console.log('part 2:', states[1_000_000_000 % i])
      break
    }
  }
}
