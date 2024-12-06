export default function (input) {
  input = input[0].split(',')

  // map sum of directions
  let initial = {
    n: 0,
    ne: 0,
    se: 0,
    s: 0,
    sw: 0,
    nw: 0,
  }
  let directions = input.reduce((a, v) => ({ ...a, [v]: a[v] + 1 }), initial)

  const steps = (directions) => {
    // remove opposites
    directions = {
      n: Math.max(0, directions.n - directions.s),
      s: Math.max(0, directions.s - directions.n),
      ne: Math.max(0, directions.ne - directions.sw),
      sw: Math.max(0, directions.sw - directions.ne),
      se: Math.max(0, directions.se - directions.nw),
      nw: Math.max(0, directions.nw - directions.se),
    }

    // reduce combinations of two vectors
    let skip = Math.min(directions.se, directions.n)
    directions.ne += skip
    directions.se -= skip
    directions.n -= skip
    skip = Math.min(directions.ne, directions.s)
    directions.se += skip
    directions.ne -= skip
    directions.s -= skip
    skip = Math.min(directions.sw, directions.n)
    directions.nw += skip
    directions.sw -= skip
    directions.n -= skip
    skip = Math.min(directions.nw, directions.s)
    directions.sw += skip
    directions.nw -= skip
    directions.s -= skip

    return Object.values(directions).sum()
  }

  console.log('part 1:', steps(directions))

  let position = initial
  let maxDistance = 0
  for (let i of input) {
    position[i]++
    maxDistance = Math.max(maxDistance, steps(position))
  }

  console.log('part 2:', maxDistance)
  // > 827
}
