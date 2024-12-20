export default function (input) {
  const robots = input
    .map((i) => i.match(/^p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)$/))
    .map((i) => ({
      px: i[1] / 1,
      py: i[2] / 1,
      vx: i[3] / 1,
      vy: i[4] / 1,
    }))

  const WIDTH = 101
  const HEIGHT = 103
  const SECONDS = 100

  const moved = robots.map((r) => ({
    ...r,
    px: (r.px + r.vx * SECONDS + WIDTH * SECONDS) % WIDTH,
    py: (r.py + r.vy * SECONDS + HEIGHT * SECONDS) % HEIGHT,
  }))

  const getScore = (robots) => {
    let tr = 0,
      tl = 0,
      bl = 0,
      br = 0
    for (let robot of robots) {
      if (robot.px < (WIDTH - 1) / 2) {
        if (robot.py < (HEIGHT - 1) / 2) {
          tl++
        } else if (robot.py > (HEIGHT - 1) / 2) {
          bl++
        }
      } else if (robot.px > (WIDTH - 1) / 2) {
        if (robot.py < (HEIGHT - 1) / 2) {
          tr++
        } else if (robot.py > (HEIGHT - 1) / 2) {
          br++
        }
      }
    }
    return { tr, tl, bl, br }
  }
  console.log('part 1:', Object.values(getScore(moved)).product())

  // The strategy is to find a picture frame on the grid, with x robots on a row and column
  // This numbers has been determined by trial and error
  const ROBOTS_ON_BORDER = 30
  let image = 0
  search: for (let i = 0; ; i++) {
    const moved = robots.map((r) => ({
      ...r,
      px: (r.px + r.vx * i + WIDTH * i) % WIDTH,
      py: (r.py + r.vy * i + HEIGHT * i) % HEIGHT,
    }))

    for (let y = 0; y < HEIGHT; y++) {
      const l = moved.filter((m) => m.py === y).length
      if (l > ROBOTS_ON_BORDER) {
        for (let x = 0; x < WIDTH; x++) {
          const r = moved.filter((m) => m.px === x).length
          if (r > ROBOTS_ON_BORDER) {
            image = i
            break search
          }
        }
      }
    }
  }

  console.log('part 2:', image)
}
