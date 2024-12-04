export default function (input) {
  let folders = {},
    location = []
  for (let i of input) {
    if (i === '$ cd ..') {
      location.pop()
    } else if (i.startsWith('$ cd')) {
      location.push(i.slice(5) + '/')
    } else if (i === '$ ls') {
      //
    } else if (i.startsWith('dir')) {
      //
    } else {
      for (let l = 1; l <= location.length; l++) {
        folders[location.slice(0, l).join('')] =
          (folders[location.slice(0, l).join('')] || 0) + i.split(' ')[0] / 1
      }
    }
  }

  let output = 0
  for (let dir of Object.keys(folders)) {
    if (folders[dir] <= 100000) {
      output += folders[dir]
    }
  }
  console.log('Part 1:', output)

  const spaceNeeded = 30000000 - (70000000 - folders['//'])
  output = Number.MAX_VALUE
  for (let dir of Object.keys(folders)) {
    if (folders[dir] >= spaceNeeded && folders[dir] < output) {
      output = folders[dir]
    }
  }
  console.log('Part 2:', output)
}
