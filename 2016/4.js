export default function (input) {
  const isValid = (room) => {
    let [name, hash] = room.split(/\d+/)
    name = name
      .match(/[a-z]/g)
      .sort()
      .reduce((a, e) => ({ ...a, [e]: (a[e] || 0) + 1 }), {})
    let something = []
    for (let k of Object.keys(name)) {
      something.push(k.repeat(name[k]))
    }
    something.sort((a, b) =>
      a.length !== b.length ? b.length - a.length : a - b
    )
    return (
      something.reduce((a, e) => a + e[0], '').slice(0, 5) === hash.slice(1, -1)
    )
  }

  let output = input
    .filter(isValid)
    .map((i) => i.match(/\d+/) / 1)
    .reduce((a, b) => a + b)
  console.log('Part 1:', output)

  for (let i of input) {
    let [_, name, ID] = i.match(/^(\D+)-(\d+)/)
    name = name
      .split('')
      .map((c) =>
        c === '-'
          ? ' '
          : String.fromCharCode(((c.charCodeAt() - 97 + ID / 1) % 26) + 97)
      )
      .join('')
    if (name.includes('north') || name.includes('pole')) {
      console.log('Part 2:', ID)
    }
  }
}
