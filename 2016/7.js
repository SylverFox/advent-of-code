export default function (input) {
  input
    .map((i) => [
      i.match(/(\w)(?!\1)(\w)\2\1/g),
      i.match(/\[\w*(\w)(?!\1)(\w)\2\1\w*\]/),
    ])
    .filter((i) => i[0] && !i[1])
    .tap((arr) => console.log('part 1:', arr.length))

  input
    .map((i) =>
      Array.from(i.matchAll(/(?<=\[\w*?)((\w)(?!\2)(?=(\w)\2))/g))
        .map((match) => match[3] + match[2] + match[3])
        .filter((match) => i.match(new RegExp(`(^|])\\w*${match}`)))
    )
    .filter((i) => i.length)
    .tap((arr) => console.log('part 2:', arr.length))
}
