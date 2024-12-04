const decompress = (input, recursive) => {
  const marker = /\((\d+)x(\d+)\)/g
  let next,
    lastIndex = 0,
    output = 0
  while ((next = marker.exec(input))) {
    const [length, count] = next.slice(1, 3).map(Number)
    // regex position - the last match - previous index + size of decompressed output
    const decompressedSlice = recursive
      ? count *
        decompress(
          input.slice(marker.lastIndex, marker.lastIndex + length),
          recursive
        )
      : count * length
    output += marker.lastIndex - next[0].length - lastIndex + decompressedSlice
    // skip regex position to index after decompression
    lastIndex = marker.lastIndex = marker.lastIndex + length
  }
  output += input.length - lastIndex
  return output
}

export default function (input) {
  console.log('part 1:', decompress(input[0], false))
  console.log('part 2:', decompress(input[0], true))
}
