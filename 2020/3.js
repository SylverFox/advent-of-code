export default function (input) {
    let trees = 0, x = 0, y = 0
    while (y < input.length) {
        if (input[y][x] === '#') trees++
        x = (x + 3) % input[0].length
        y++;
    }
    console.log(trees)

    const numTrees = (right = 1, down = 1) => {
        let trees = 0, x = 0, y = 0
        while (y < input.length) {
            if (input[y][x] === '#') trees++
            x = (x + right) % input[0].length
            y += down
        }
        return trees
    }

    const total = [[1], [3], [5], [7], [1, 2]]
        .map(([r, d]) => numTrees(r, d))
        .reduce((a, v) => a * v)
    console.log(total)
}




