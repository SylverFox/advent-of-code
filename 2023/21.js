export default function (input) {
  input = input.map((i) => i.split(''))
  const HEIGHT = input.length
  const WIDTH = input[0].length

  let start
  findstart: for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      if (input[y][x] === 'S') {
        start = { x, y }
        break findstart
      }
    }
  }

  const getTargets = (start, targetSteps) => {
    let steps = 0,
      nodes = [start],
      visited = [],
      targets = []
    while (steps <= targetSteps) {
      let newNodes = []
      for (let node of nodes) {
        visited[`${node.x},${node.y},${steps % 2}`] = true
        if (steps % 2 === targetSteps % 2) {
          targets.push({ ...node, steps })
        }
        newNodes.push({ x: node.x - 1, y: node.y })
        newNodes.push({ x: node.x, y: node.y - 1 })
        newNodes.push({ x: node.x + 1, y: node.y })
        newNodes.push({ x: node.x, y: node.y + 1 })
      }

      nodes = newNodes
        .filter((n) => n.x >= 0 && n.y >= 0 && n.x < WIDTH && n.y < HEIGHT)
        .filter((n) => input[n.y][n.x] !== '#')
        .filter((n) => !visited[`${n.x},${n.y},${(steps + 1) % 2}`])
        .filter(
          (e, i, a) => a.findIndex((n) => n.x === e.x && n.y === e.y) === i
        )
      steps++
    }
    return targets
  }

  console.log('part 1:', getTargets(start, 64).length)

  const STEPS_TARGET = 26501365
  const BLOCKS = Math.floor((STEPS_TARGET - 66) / 131)

  const evenSuperBlock = getTargets(start, HEIGHT + WIDTH)
  const oddSuperBlock = getTargets(start, HEIGHT + WIDTH + 1)

  let output =
    BLOCKS ** 2 * oddSuperBlock.length +
    (BLOCKS + 1) ** 2 * evenSuperBlock.length

  const longAngles = BLOCKS
  const shortAngles = longAngles + 1

  const r = getTargets({ x: 0, y: start.y }, 130)
  const dbrs = getTargets({ x: 0, y: 0 }, 64)
  const dbrl = getTargets({ x: 0, y: 0 }, 195)
  output += r.length + shortAngles * dbrs.length + longAngles * dbrl.length

  const b = getTargets({ x: start.x, y: 0 }, 130)
  const dbls = getTargets({ x: WIDTH - 1, y: 0 }, 64)
  const dbll = getTargets({ x: WIDTH - 1, y: 0 }, 195)
  output += b.length + shortAngles * dbls.length + longAngles * dbll.length

  const l = getTargets({ x: WIDTH - 1, y: start.y }, 130)
  const dtls = getTargets({ x: WIDTH - 1, y: HEIGHT - 1 }, 64)
  const dtll = getTargets({ x: WIDTH - 1, y: HEIGHT - 1 }, 195)
  output += l.length + shortAngles * dtls.length + longAngles * dtll.length

  const t = getTargets({ x: start.x, y: HEIGHT - 1 }, 130)
  const dtrs = getTargets({ x: 0, y: HEIGHT - 1 }, 64)
  const dtrl = getTargets({ x: 0, y: HEIGHT - 1 }, 195)
  output += t.length + shortAngles * dtrs.length + longAngles * dtrl.length

  console.log('part 2:', output)
}
