export default function (input) {
  input = input.map((i) => i.split(' ').map(Number))

  const diff = (arr) =>
    arr.reduce((o, v, i, a) => (i === 0 ? o : [...o, v - a[i - 1]]), [])
  const getNext = (arr) =>
    arr.every((n) => n === 0) ? 0 : getNext(diff(arr)) + arr[arr.length - 1]
  const getPrevious = (arr) =>
    arr.every((n) => n === 0) ? 0 : arr[0] - getPrevious(diff(arr))

  console.log('part 1:', input.map(getNext).sum())
  console.log('part 2:', input.map(getPrevious).sum())
}
