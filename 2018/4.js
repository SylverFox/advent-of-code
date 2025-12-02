import moment from 'moment'

export default function (input) {
  input = input
    .map((i) => i.match(/^\[(.*)\] (.*)$/))
    .map((i) => ({
      time: moment(i[1]),
      event: i[2],
    }))
    .sort((a, b) => a.time - b.time)

  let guards = {},
    guard,
    sleep
  for (let i of input) {
    if (i.event.startsWith('Guard')) {
      guard = i.event.match(/#(\d+)/)[1] / 1
      guards[guard] = guards[guard] || Array(60).fill(0)
    } else if (i.event === 'falls asleep') {
      sleep = i.time
    } else if (i.event === 'wakes up') {
      while (sleep < i.time) {
        guards[guard][sleep.minute()]++
        sleep.add(1, 'minute')
      }
    }
  }

  const sleepyGuard = Object.keys(guards)
    .sort((a, b) => guards[b].sum() - guards[a].sum())
    .first()
  const minute = guards[sleepyGuard].indexOf(Math.max(...guards[sleepyGuard]))
  console.log('part 1:', sleepyGuard * minute)

  let maxTotalSleep = 0,
    chosenMinute,
    chosenGuard
  for (let g in guards) {
    let maxSleep = 0,
      maxMinute
    for (let m = 0; m < guards[g].length; m++) {
      if (guards[g][m] > maxSleep) {
        maxSleep = guards[g][m]
        maxMinute = m
      }
    }

    if (maxSleep > maxTotalSleep) {
      maxTotalSleep = maxSleep
      chosenMinute = maxMinute
      chosenGuard = g
    }
  }

  console.log('part 2:', chosenMinute * chosenGuard)
}
