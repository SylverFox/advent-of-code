export default function (input) {
    const nodes = input.slice(2)
        .map(i => i.match(/x(\d+)-y(\d+).*?(\d+)T.*?(\d+)T.*?(\d+)T/))
        .map(i => ({x: i[1]/1, y: i[2]/1, size: i[3]/1, used: i[4]/1, avail: i[5]/1}))
    
    const WIDTH = nodes.reduce((a,v) => Math.max(a, v.x), 0) + 1
    const HEIGHT = nodes.reduce((a,v) => Math.max(a, v.y), 0) + 1
    console.log({WIDTH, HEIGHT})

    let output = 0
    for (let nodeA of nodes) {
        for (let nodeB of nodes) {
            if (nodeA !== nodeB && nodeA.used > 0 && nodeA.used <= nodeB.avail) {
                output++
            }
        }
    }
    console.log(output)
}
