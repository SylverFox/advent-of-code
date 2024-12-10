export default function (input) {
  input = input
    .map((i) =>
      i.match(/^p=<(.*),(.*),(.*)>, v=<(.*),(.*),(.*)>, a=<(.*),(.*),(.*)>$/)
    )
    .map((i) => ({
      position: [i[1], i[2], i[3]].map(Number),
      velocity: [i[4], i[5], i[6]].map(Number),
      acceleration: [i[7], i[8], i[9]].map(Number),
      collisions: [],
    }))

  let minAcceleration = Number.MAX_VALUE
  let minIndex = -1
  for (let i = 0; i < input.length; i++) {
    const totalAcceleration = input[i].acceleration.map(Math.abs).sum()
    if (totalAcceleration < minAcceleration) {
      minAcceleration = totalAcceleration
      minIndex = i
    }
  }
  console.log('part 1:', minIndex)

  const checkCollision = (p1, p2) => {
    // d(t) = d0 + v0t + 1/2at(t+1)
    const findRoots = (p1, p2, v1, v2, a1, a2) => {
      const A = (a1 - a2) / 2
      const B = A + (v1 - v2)
      const C = p1 - p2

      if (A === 0 && B === 0) {
        // if velocity and acceleration are the same, they always collide if the position is equal
        return p1 === p2 ? true : false
      } else if (A === 0) {
        // if the acceleration are the same the collision time depends only on position and speed
        const t = -C / B
        return t >= 0 ? t : false
      }

      const D = B ** 2 - 4 * A * C
      if (D < 0) {
        return false
      }

      const roots = [
        (-B + Math.sqrt(D)) / (2 * A),
        (-B - Math.sqrt(D)) / (2 * A),
      ].filter((r) => r >= 0 && Math.floor(r) === r)
      return roots.length ? Math.min(...roots) : false
    }

    let roots = [...Array(3)].map((_, d) =>
      findRoots(
        p1.position[d],
        p2.position[d],
        p1.velocity[d],
        p2.velocity[d],
        p1.acceleration[d],
        p2.acceleration[d]
      )
    )

    if (roots.includes(false)) {
      // Some dimension does not collide
      return false
    }

    // all remaining dimensions should have the same timing for a collision and be whole numbers
    const timings = roots
      .filter((r) => typeof r === 'number')
      .filter((e, i, a) => a.indexOf(e) === i)
    if (timings.length === 1) {
      return timings[0]
    } else {
      return false
    }
  }

  let collisions = []
  for (let i = 0; i < input.length - 1; i++) {
    for (let j = i + 1; j < input.length; j++) {
      const collision = checkCollision(input[i], input[j])
      if (collision !== false) {
        collisions.push({
          time: collision,
          particles: [i, j],
        })
      }
    }
  }
  collisions.sort((a, b) => a.time - b.time)

  let particlesLeft = [...Array(input.length).keys()]
  let time = collisions[0].time
  while (time !== undefined) {
    const collisionsAtTime = collisions.filter((c) => c.time === time)
    let particlesToRemove = []
    for (let collision of collisionsAtTime) {
      const left = collision.particles.filter((p) => particlesLeft.includes(p))
      if (left.length >= 2) {
        // need at least 2 particles to collide
        particlesToRemove.push(...collision.particles)
      }
    }

    particlesLeft = particlesLeft.filter((p) => !particlesToRemove.includes(p))
    time = collisions.find((c) => c.time > time)?.time
  }

  console.log('part 2:', particlesLeft.length)
}
