function* generatePermutations(list) {
    if (!list.length) {
        yield []
    } else {
        for (let i = 0; i < list.length; i++) {
            const newList = list.clone()
            const item = newList.splice(i, 1)[0]
            for (let p of generatePermutations(newList)) {
                yield [item, ...p]
            }
        }
    }
}

export default function (input) {
    const valves = input
        .map(i => i.match(/^Valve (\w+) .*rate=(\d+);.* valves? (.*)$/))
        .map(i => ({name: i[1], flow: i[2]/1, tunnels: i[3].split(', ')}))

    let routeMap = []
    valves.forEach(v =>
        routeMap[v.name] = valves
            .filter(v2 => v2.name !== v.name)
            .reduce((a,v) => ({...a, [v.name]: Infinity}), {})
    )

    let visited = []
    for (let valve of valves) {
        for (let tunnel of valve.tunnels) {
            routeMap[valve.name][tunnel] = routeMap[tunnel][valve.name] = 1
            for (let v of visited) {
                if (v === tunnel) continue
                routeMap[v][tunnel] = routeMap[tunnel][v] = 
                    Math.min(routeMap[v][valve.name] + 1, routeMap[v][tunnel])
            }
        }
        visited.push(valve.name)
    }

    console.log(routeMap)
    return


    const getTotalPressure = order => {
        let pressure = 0, position = 'AA', time = 0
        for (let o of order) {
            const steps = routeMap[position][o]

            time += steps + 1
            const flow = valves.find(v => v.name === o).flow
            pressure += flow * (30 - times)
            position = o
            console.log({o, time, flow, pressure, position})
        }
        return pressure
    }

    const positiveFlowNodes = valves.filter(v => v.flow > 0).map(v => v.name)

    let max = 0
    for (let perm of generatePermutations(positiveFlowNodes)) {
        max = Math.max(max, getTotalPressure(valves, perm))
    }

    console.log('Part 1:', max)
}
