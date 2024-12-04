export default function (input) {
  input = input
    .map((i) => i.split('~').map((b) => b.split(',').map(Number)))
    .sort((a, b) => a[0][2] - b[0][2]) // sort by z
  const { X, Y, Z } = input
    .reduce((a, v) => [...a, v[0], v[1]], [])
    .reduce(
      (a, v) => ({
        X: Math.max(a.X, v[0] + 1),
        Y: Math.max(a.Y, v[1] + 1),
        Z: Math.max(a.Z, v[2]),
      }),
      { X: 0, Y: 0, Z: 0 }
    )

  let map = [...Array(Z)].map(() =>
    [...Array(Y)].map(() => [...Array(X)].fill('.'))
  )

  let blockSupports = {}
  for (let i = 0; i < input.length; i++) {
    const block = input[i]
    let [x, y, z] = block[0],
      [xmax, ymax, zmax] = block[block.length - 1]
    const zmin = z
    let chunks = [[xmax, ymax, zmax]]
    while (x !== xmax || y !== ymax || z !== zmax) {
      chunks.unshift([x, y, z])
      x = Math.min(xmax, x + 1)
      y = Math.min(ymax, y + 1)
      z = Math.min(zmax, z + 1)
    }
    // try to fit the block top down
    for (let level = zmin; level >= 0; level--) {
      const fits =
        level > 0 &&
        chunks.every((chunk) => map[level - 1][chunk[1]][chunk[0]] === '.')
      if (!fits) {
        // block doesn't fit on next level, place here
        chunks.forEach(
          (chunk) =>
            (map[level + (chunk[2] - zmin)][chunk[1]][chunk[0]] =
              String.fromCharCode(65 + i))
        )
        // and tag supporting blocks
        if (level > 0) {
          const supports = chunks
            .map((chunk) => map[level - 1][chunk[1]][chunk[0]])
            .filter((chunk, i, a) => chunk !== '.' && a.indexOf(chunk) === i)
          blockSupports[String.fromCharCode(65 + i)] = supports
        } else {
          blockSupports[String.fromCharCode(65 + i)] = ['FLOOR']
        }
        break
      }
    }
  }

  // All blocks that support something
  const allSupports = Object.values(blockSupports)
    .reduce((a, v) => a.concat(v))
    .filter((e, i, a) => a.indexOf(e) === i)

  let output = 0,
    output2 = 0
  for (let block in blockSupports) {
    if (!allSupports.includes(block)) {
      // block does not support anything, can be removed safely
      output++
    } else {
      // find blocks that are uniquely supported by this block
      let supports = Object.keys(blockSupports).filter(
        (bs) => blockSupports[bs].length === 1 && blockSupports[bs][0] === block
      )

      if (!supports.length) {
        output++
      } else {
        let falling = [block]
        while (supports.length) {
          falling.push(...supports)
          // Find new blocks where all of its support are removed
          supports = Object.keys(blockSupports).filter(
            (bs) =>
              !falling.includes(bs) &&
              blockSupports[bs].every((s) => falling.includes(s))
          )
        }
        output2 += falling.length - 1
      }
    }
  }

  console.log('part 1:', output)
  console.log('part 2:', output2)
}
