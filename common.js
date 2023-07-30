Object.defineProperty(Array.prototype, "tap", {
    enumerable: false,
    value: function(f) {
        f(this)
        return this
    }
});
