export default function (input) {
  let reindeers = []
  for (let i of input) {
    const match = i.match(/^([\S]+)[\D]*(\d+)[\D]*(\d+)[\D]*(\d+)/)
    reindeers.push({
      name: match[1] / 1,
      speed: match[2] / 1,
      fly_time: match[3] / 1,
      rest_time: match[4] / 1,
    })
  }

  const distance = (reindeer, race_time) => {
    const distBlock = reindeer.speed * reindeer.fly_time
    const timeBlock = reindeer.fly_time + reindeer.rest_time

    let remainingDist = 0
    if (race_time % timeBlock <= reindeer.fly_time) {
      remainingDist = (race_time % timeBlock) * reindeer.speed
    } else {
      remainingDist = distBlock
    }

    return distBlock * Math.floor(race_time / timeBlock) + remainingDist
  }

  let output = reindeers.map((r) => distance(r, 2503)).sort((a, b) => b - a)[0]
  console.log('Part 1:', output)

  output = Array(reindeers.length).fill(0)
  for (let s = 1; s <= 2503; s++) {
    const distances = reindeers.map((r) => distance(r, s))
    const max = Math.max(...distances)
    distances.forEach((d, i) => {
      if (d === max) output[i]++
    })
  }

  output = output.sort((a, b) => b - a)[0]
  console.log('Part 2:', output)
}
