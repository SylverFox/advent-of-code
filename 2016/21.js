export default function (input) {
    input = input.map(i => {
        if (i.startsWith('swap letter')) {
            const [_, a, b] = i.match(/swap letter (\w) with letter (\w)/)
            return (p) => {
                const ai = p.indexOf(a)
                const bi = p.indexOf(b)
                p.splice(bi, 1, p.splice(ai, 1, p[bi])[0])
                return p
            }
        } else if (i.startsWith('swap position')) {
            const [_, a, b] = i.match(/swap position (\d) with position (\d)/)
            return (p) => {
                p.splice(a, 1, p.splice(b, 1, p[a])[0])
                return p
            }
        } else if (i.startsWith('rotate based')) {
            const [_, x] = i.match(/rotate based on position of letter (\w)/)
            return (p) => {
                const i = p.indexOf(x)
                return [...p.slice(i), ...p.slice(0, i)]
            }
        } else if (i.startsWith('rotate')) {
            const [_, dir, c] = i.match(/rotate (left|right) (\d) steps?/)
            return (p) => {
                const x = dir === 'left' ? c : p.length - c
                return [...p.slice(x), ...p.slice(0, x)]
            }
        } else if (i.startsWith('reverse')) {
            const [_, a, b] = i.match(/reverse positions (\d) through (\d)/)
            return (p) => [...p.slice(0, a), ...p.slice(a, b + 1).reverse(), ...p.slice(b + 2)]
        } else if (i.startsWith('move position')) {
            const [_, a, b] = i.match(/move position (\d) to position (\d)/)
            return (p) => {
                p.splice(b, 0, p.splice(a, 1)[0])
                return p
            }
        }
    })

    let text = 'abcdefgh'.split('')
    // input.reduce((a,f) => f(a), text)
    for (let f of input) {
        text = f(text)
        console.log(text.join(''))
    }
    // faecgbdh
}
