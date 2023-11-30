Object.defineProperty(Array.prototype, "tap", {
    enumerable: false,
    value: function(f) {
        f(this)
        return this
    }
})

Object.defineProperty(Array.prototype, "clone", {
    enumerable: false,
    value: function(f) {
        return JSON.parse(JSON.stringify(this))
    }
})


export const gcd = (a, b) => !b ? a : gcd(b, a % b)
export const lcm = (a, b) => (a * b) / gcd(a, b)
