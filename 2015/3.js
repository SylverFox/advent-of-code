export default function (input) {
    input = input[0].split('')

    let visited = {'0,0': 1}, x = 0, y = 0
    for (let i of input) {
        if (i === '>') x++
        else if (i === 'v') y++
        else if (i === '<') x--
        else if (i === '^') y--

        visited[`${x},${y}`] = (visited[`${x},${y}`] || 0) + 1
    }
    console.log('Part 1:', Object.keys(visited).length)

    visited = {'0,0': 2}, x = 0, y = 0
    let rx = 0, ry = 0
    for (let i = 0; i < input.length; i++) {
        if (i % 2 === 0) {
            if (input[i] === '>') x++
            else if (input[i] === 'v') y++
            else if (input[i] === '<') x--
            else if (input[i] === '^') y--

            visited[`${x},${y}`] = (visited[`${x},${y}`] || 0) + 1
        } else {
            if (input[i] === '>') rx++
            else if (input[i] === 'v') ry++
            else if (input[i] === '<') rx--
            else if (input[i] === '^') ry--

            visited[`${rx},${ry}`] = (visited[`${rx},${ry}`] || 0) + 1
        }
    }

    console.log('Part 2:', Object.keys(visited).length)
}
