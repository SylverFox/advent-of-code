export default function (input) {
    const [_, xMin, xMax, yMin, yMax] = input[0].match(/target area: x=(.*)\.\.(.*), y=(.*)\.\.(.*)/)

    const decreasingSum = n => n === 1 ? n : decreasingSum(n - 1) + n
    const maxHeight = decreasingSum(Math.abs(yMin) - 1)
    console.log('Part 1:', maxHeight)

    const xVMin = Math.ceil(-1 / 2 + Math.sqrt(1 / 4 + 2 * xMin))
    const xVMax = xMax/1
    const yVMin = yMin/1
    const yVMax = Math.abs(yMin) - 1

    const hit = (xv, yv) => {
        let x = 0, y = 0
        while (x < xMax && y > yMin) {
            x+=xv
            y+=yv
            if (xv > 0) xv--
            yv--
            if (x >= xMin && x <= xMax && y >= yMin && y <= yMax) return true
        }
        return false
    }

    let output = []
    for (let xv = xVMin; xv <= xVMax; xv++) {
        for (let yv = yVMin; yv <= yVMax; yv++) {
            if (hit(xv, yv)) output.push(xv + ',' + yv)
        }
    }
    console.log('Part 2:', output.length)
}