export default function (input) {
  input
    .map((i) => [
      i.match(/(\w)(?!\1)(\w)\2\1/g),
      i.match(/\[\w*(\w)(?!\1)(\w)\2\1\w*\]/),
    ])
    .filter((i) => i[0] && !i[1])
    .tap((arr) => console.log('Part 1:', arr.length))

  input
    .map((i) => [
      i.match(/(\w)(?!\1)(\w)\1.*\[\w*(\2\1\2)\w*\]/),
      i.match(/\[\w*(\w)(?!\1)(\w)\1\w*\].*(\2\1\2)/),
    ])
    .filter((i) => i[0] || i[1])
    .tap((arr) => console.log('Part 2:', arr.length))
  // < 289
}
