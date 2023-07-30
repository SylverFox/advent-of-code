export default function (input) {
    const OPEN = ['(', '[', '{', '<']
    const CLOSE = [')', ']', '}', '>']
    const ERRORS = { ')': 3, ']': 57, '}': 1197, '>': 25137 }

    function validate(left, current) {
        let out
        if (!left || !left.length) {
            out = false
        } else if (!current) {
            out = OPEN.includes(left[0]) && validate(left.slice(1), left[0])
        } else if (CLOSE.includes(left[0])) {
            if (CLOSE.indexOf(left[0]) === OPEN.indexOf(current)) {
                out = left.slice(1)
            } else {
                throw new Error(left[0])
            }
        } else {
            return validate(validate(left.slice(1), left[0]), current)
        }
        return out
    }

    function check(input) {
        try {
            const valid = validate(input.slice(1), input[0])
            return 0
        } catch (e) {
            return ERRORS[e.message]
        }
    }

    const output = input.map(i => check(i)).reduce((a, b) => a + b)
    console.log('Part 1:', output)

    class ExpectedError extends Error { }
    class CorruptedError extends Error { }

    function validate2(left, current) {
        let out;
        if (!left || !left.length) {
            throw new ExpectedError(CLOSE[OPEN.indexOf(current)])
        } else if (!current) {
            while (left.length) {
                left = validate2(left.slice(1), left[0])
            }
        } else if (CLOSE.includes(left[0])) {
            if (CLOSE.indexOf(left[0]) === OPEN.indexOf(current)) {
                out = left.slice(1)
            } else {
                throw new CorruptedError(left[0])
            }
        } else {
            out = validate2(validate2(left.slice(1), left[0]), current)
        }
        return out;
    }

    function check2(input) {
        let errorScore = 0
        let done = false
        while (!done) {
            try {
                validate2(input)
                done = true
            } catch (e) {
                if (e instanceof CorruptedError) {
                    done = true
                } else if (e instanceof ExpectedError) {
                    errorScore = (errorScore * 5) + CLOSE.indexOf(e.message) + 1
                    input += e.message
                } else {
                    throw e
                }
            }
        }

        return errorScore
    }

    const scores = input.map(i => check2(i)).filter(s => s > 0)
    scores.sort((a, b) => a - b)
    console.log('Part 2:', scores[(scores.length - 1) / 2])

}
