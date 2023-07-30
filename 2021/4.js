const DEEP_SUM = (agg, val) => agg + (typeof val === 'object' ? val.reduce(DEEP_SUM) : val)

export default function (input) {

    const numbers = input[0].split(',').map(Number)
    let boards = []

    const parseBoardLine = line => line.slice().trim().split(/\s+/).map(Number)

    for (let i = 2; i < input.length; i += 6) {
        boards.push([
            parseBoardLine(input[i]),
            parseBoardLine(input[i + 1]),
            parseBoardLine(input[i + 2]),
            parseBoardLine(input[i + 3]),
            parseBoardLine(input[i + 4])
        ])
    }
    let boards2 = JSON.parse(JSON.stringify(boards))

    function cross(board, num) {
        for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 5; c++) {
                if (board[r][c] === num) {
                    board[r][c] = 0;
                }
            }
        }
    }

    function check(board) {
        // row crossed
        for (let row of board) {
            if (row.reduce(DEEP_SUM) === 0) {
                return true;
            }
        }

        // column crossed
        for (let c = 0; c < 5; c++) {
            if (board.map(r => r[c]).reduce(DEEP_SUM) === 0) {
                return true;
            }
        }

        // diagonal
        const d1 = board[0][0] + board[1][1] + board[2][2] + board[3][3] + board[4][4];
        const d2 = board[0][4] + board[1][3] + board[2][2] + board[3][1] + board[4][0];
        if (d1 === 0 || d2 === 0) {
            return true;
        }

        return false;
    }

    main: for (let n of numbers) {
        for (let b of boards) {
            cross(b, n)
            if (check(b)) {
                console.log('Part 1:', n * b.reduce(DEEP_SUM, 0))
                break main
            }
        }
    }

    boards = boards2

    main: for (let n = 0; n < numbers.length; n++) {
        for (let b = 0; b < boards.length; b++) {
            if (boards[b]) {
                cross(boards[b], numbers[n]);
                if (check(boards[b])) {
                    if (boards.filter(b => b).length === 1) {
                        // last board is checked
                        console.log('Part 2:', numbers[n] * boards[b].reduce(DEEP_SUM, 0))
                        break main
                    }
                    boards[b] = null;
                }
            }
        }
    }
}
