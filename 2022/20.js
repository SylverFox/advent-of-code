export default function (input) {
    input = input.map((e, i) => ({index: i, value: e/1, move: e/1 >= 0 ? e/1 : e/1 + input.length - 1 }))

    let decrypted = JSON.parse(JSON.stringify(input))
    for (let i = 0; i < input.length; i++) {
        const oldIndex = decrypted.findIndex(d => d.index === input[i].index)
        let newIndex = oldIndex + input[i].move
        if (newIndex >= input.length) {
            decrypted.splice(oldIndex, 1)
            decrypted.splice(newIndex - (input.length - 1), 0, input[i].value)
        } else {
            decrypted.splice(newIndex + 1, 0, input[i].value)
            decrypted.splice(oldIndex, 1)
        }
    }

    console.log(decrypted)

    const z = decrypted.indexOf(0)
    const a = decrypted[(z + 1000) % decrypted.length]
    const b = decrypted[(z + 2000) % decrypted.length]
    const c = decrypted[(z + 3000) % decrypted.length]
    console.log({a, b, c, sum: a+b+c})
}