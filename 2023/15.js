export default function (input) {
    input = input[0]
    const hash = text => text.split('').reduce((a,v) => ((a + v.charCodeAt()) * 17) % 256, 0)

    console.log('part 1:', input.split(',').map(hash).sum())

    let boxes = [...Array(256)].map(() => [])
    input.split(',').forEach(i => {
        const [_, label, op, focal] = i.match(/(\w+)([-=])(\d+)?/)
        const box = hash(label)
        const existing = boxes[box].findIndex(b => b.label === label)
        if (op === '=' && existing >= 0) {
            boxes[box][existing] = {label, focal}
        } else if (op === '=') {
            boxes[box].push({label, focal})
        } else if (existing >= 0) {
            boxes[box].splice(existing, 1)
        }
    })
    const output = boxes.map((b, bi) => b.map((l,li) => (bi + 1) * (li + 1) * l.focal).sum()).sum()
    console.log('part 2:', output)
}
