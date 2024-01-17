export default function (input) {
    input = input.map(i => i.match(/(\d+)/g).map(Number))
        .map(i => ({x: i[0], y: i[1], z: [2], dx: i[3], dy: i[4], dz: i[5]}))

    const MIN = 7
    const MAX = 27

    let output = 0
    for (let i = 0; i < input.length - 1; i++) {
        const P1 = {x: input[i].x + MIN * input[i].dx, y: input[i].y + MIN * input[i].dy}
        const P2 = {x: input[i].x + MAX * input[i].dx, y: input[i].y + MAX * input[i].dy}
        for (let j = i; j < input.length; j++) {
            const P3 = {x: input[j].x + MIN * input[j].dx, y: input[j].y + MIN * input[j].dy}
            const P4 = {x: input[j].x + MAX * input[j].dx, y: input[j].y + MAX * input[j].dy}
            if (collide) {
                output++
            }
        }
    }

    // 1: adx * x + ax = bdx * x + bx
    // 2: ady * y + ay = bdy * y + by
    // 19, 13, -2, 1
    // 17, 14
    // 15, 13
    // 13, 12

    // x = (bx - ax) / (adx - bdx)
    // y = ady * 

    // console.log('part 1:', output)
    // console.log('part 2:', output)
}
