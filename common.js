Object.defineProperty(Array.prototype, "tap", {
    enumerable: false,
    value: function(f) {
        f(this)
        return this
    }
})

Object.defineProperty(Array.prototype, "clone", {
    enumerable: false,
    value: function() {
        return JSON.parse(JSON.stringify(this))
    }
})

Object.defineProperty(Array.prototype, "sum", {
    enumerable: false,
    value: function() {
        return this.reduce((a,v) => a + v, 0)
    }
})

Object.defineProperty(Array.prototype, "product", {
    enumerable: false,
    value: function() {
        return this.reduce((a,v) => a * v, 1)
    }
})

export const gcd = (a, b) => !b ? a : gcd(b, a % b)
export const lcm = (a, b) => (a * b) / gcd(a, b)
