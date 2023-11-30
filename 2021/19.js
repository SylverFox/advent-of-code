export default function (input) {
    let scanners = [], s = -1
    for (let i of input) {
        if (i === '') continue
        else if (i.startsWith('---')) { scanners[++s] = [] }
        else scanners[s].push(i.split(','))
    }

    console.log(scanners.length)
}