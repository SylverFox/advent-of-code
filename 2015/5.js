export default function (input) {
  input
    .filter((i) => i.match(/[aeiou]/g)?.length >= 3)
    .filter((i) => i.match(/(.)\1/))
    .filter((i) => !i.match(/ab|cd|pq|xy/))
    .tap((o) => console.log('Part 1:', o.length))

  input
    .filter((i) => i.match(/(..).*\1/))
    .filter((i) => i.match(/(.).\1/))
    .tap((o) => console.log('Part 2:', o.length))
}
