import * as common from './common.js';

const input = common.getInput('5')
    .map(l => l.split(' -> ').map(c => c.split(',').map(Number)))
    .map(l => ({a: {x: l[0][0], y: l[0][1]}, b: {x: l[1][0], y: l[1][1]}}))

let coords = {}

function pushCoord(x, y) {
    const c = x + ';' + y
    coords[c] = coords[c] || 0;
    coords[c]++;
}

function drawLine(line) {
    let min = 0, max = 0;
    if (line.a.x === line.b.x) {
        // vertical
        min = Math.min(line.a.y, line.b.y);
        max = Math.max(line.a.y, line.b.y);
        for (min; min <= max; min++) {
            pushCoord(line.a.x, min);
        }
    } else if (line.a.y === line.b.y) {
        // horizontal
        min = Math.min(line.a.x, line.b.x);
        max = Math.max(line.a.x, line.b.x);
        for (min; min <= max; min++) {
            pushCoord(min, line.a.y);
        }
    } else {
        const p1 = line.a;
        pushCoord(p1.x, p1.y)
        while(p1.x !== line.b.x && p1.y !== line.b.y) {
            p1.x = p1.x < line.b.x ? p1.x + 1 : p1.x - 1
            p1.y = p1.y < line.b.y ? p1.y + 1 : p1.y - 1
            pushCoord(p1.x, p1.y)
        }
    }
}

for (let line of input) {
    drawLine(line)
}

console.log(Object.keys(coords).filter(c => coords[c] > 1).length)
