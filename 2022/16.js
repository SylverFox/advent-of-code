export default function (input) {
    const valves = input
        .map(i => i.match(/^Valve (\w+) .*rate=(\d+);.* valves? (.*)$/))
        .reduce((a, i) => ({...a, [i[1]]: {flow_rate: i[2]/1, valves: i[3].split(', '), open: false} }), {})

    console.log(valves)

    const maxFlow = (currentValve, valves, minutes = 0, pressure = 0, flow = 0) => {
        // console.log(currentValve, minutes, pressure, flow)
        if (minutes === 30) {
            // console.log('here', valves, pressure, flow)
            return flow
        } else if (minutes > 30) {
            return flow - pressure
        }

        const connected = valves[currentValve].valves
        let max = 0
        for (let v of connected) {
            const newValves = JSON.parse(JSON.stringify(valves))
            if (!valves[v].open) {
                newValves[v].open = true
                const totalFlow = maxFlow(v, newValves, minutes + 2, pressure + valves[v].flow_rate, flow + pressure * 2)
                max = Math.max(max, totalFlow)
            } else {
                const totalFlow = maxFlow(v, newValves, minutes + 1, pressure, flow + pressure * 2)
                max = Math.max(max, totalFlow)
            }
        }
        return flow
    }

    console.log('Part 1:', maxFlow('AA', valves))
}
