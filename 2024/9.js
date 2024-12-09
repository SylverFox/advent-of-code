export default function (input) {
  input = input[0]
    .split('')
    .flatMap((x, i) =>
      i % 2 === 0 ? { size: x / 1, id: i / 2 } : { size: x / 1, id: -1 }
    )

  const checksum = (disk) => {
    let checksum = 0
    for (let b = 0, i = 0; b < disk.length; b++) {
      if (disk[b].id < 0) {
        i += disk[b].size
        continue
      }

      for (let j = 0; j < disk[b].size; j++) {
        checksum += disk[b].id * (i + j)
      }

      i += disk[b].size
    }
    return checksum
  }

  let disk = structuredClone(input)
  while (true) {
    const firstEmpty = disk.findIndex((d) => d.id === -1)
    const lastFull = disk.findLastIndex((d) => d.id !== -1)
    if (firstEmpty > lastFull) break

    if (disk[firstEmpty].size === disk[lastFull].size) {
      disk[firstEmpty].id = disk[lastFull].id
      disk[lastFull].id = -1
    } else if (disk[firstEmpty].size < disk[lastFull].size) {
      const newBlock = structuredClone(disk[firstEmpty])
      disk[firstEmpty].id = disk[lastFull].id
      disk[lastFull].size -= disk[firstEmpty].size
      disk.splice(lastFull + 1, 0, newBlock)
    } else {
      const newBlock = structuredClone(disk[lastFull])
      disk[firstEmpty].size -= disk[lastFull].size
      disk[lastFull].id = -1
      disk.splice(firstEmpty, 0, newBlock)
    }
  }

  console.log('part 1:', checksum(disk))

  disk = structuredClone(input)
  while (true) {
    let firstEmpty, lastFull
    findBlock: for (let end = disk.length - 1; end > 0; end--) {
      if (disk[end].id === -1) continue

      for (let start = 0; start < end; start++) {
        if (disk[start].id !== -1) continue

        if (disk[start].size >= disk[end].size) {
          firstEmpty = start
          lastFull = end
          break findBlock
        }
      }
    }

    if (!firstEmpty || !lastFull) break

    if (disk[firstEmpty].size === disk[lastFull].size) {
      disk[firstEmpty].id = disk[lastFull].id
      disk[lastFull].id = -1
    } else {
      const newBlock = structuredClone(disk[lastFull])
      disk[firstEmpty].size -= disk[lastFull].size
      disk[lastFull].id = -1
      disk.splice(firstEmpty, 0, newBlock)
    }
  }

  console.log('part 2:', checksum(disk))
}
