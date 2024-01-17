export default function (input) {
    input = input.map(i => i.split('-').map(Number))
    input.sort((a,b) => a[0] - b[0])

    let ranges = []
    for (let i of input) {
        const [start, end] = i
        const index = ranges.findIndex(r => end + 1 >= r.start && start - 1 <= r.end)
        if (index >= 0) {
            ranges[index].start = Math.min(ranges[index].start, start)
            ranges[index].end = Math.max(ranges[index].end, end)
        } else {
            ranges.push({start, end})
        }
    }
    console.log('part 1:', ranges[0].end + 1)

    let gaps = 4294967295 - ranges[ranges.length - 1].end
    for (let r = 1; r < ranges.length; r++) {
        gaps += ranges[r].start - ranges[r - 1].end - 1
    }
    console.log('part 2:', gaps)
}
