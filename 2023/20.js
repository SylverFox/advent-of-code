export default function (input) {
    let machines = {}
    for (let i of input) {
        const [name, outputs] = i.split(' -> ')
        if (i.startsWith('broadcaster')) {
            machines['broadcaster'] = {
                state: false,
                outputs: outputs.split(', '),
                f: function(name, input) {
                    this.state = input
                    return true
                }
            }
        } else if (i.startsWith('%')) {
            machines[name.slice(1)] = {
                state: false,
                outputs: outputs.split(', '),
                f: function(name, input) {
                    if(input) return false
                    this.state = !this.state
                    return true
                }
            }
        } else if (i.startsWith('&')) {
            machines[name.slice(1)] = {
                inputs: {},
                state: false,
                outputs: outputs.split(', '),
                f: function(name, input) {
                    this.inputs[name] = input
                    this.state = (Object.values(this.inputs).every(i => i) ? this.state = false : this.state = true)
                    return true
                }
            }
        }
    }
    // add machine input names
    for (let i of input) {
        const outputs = i.split(' -> ')[1].split(', ')
        for (let o of outputs) {
            const conjuction = input.findIndex(i => i.startsWith('&'+o))
            if (conjuction >= 0) {
                const name = i.split(' -> ')[0].slice(1)
                machines[o].inputs[name] = false
            }
        }
    }

    const press = (machines) => {
        let pulses = {low: 0, high: 0}
        const nodes = [{m: 'broadcaster', i: '', p: false}]
        while (nodes.length) {
            const node = nodes.shift()
            pulses[node.p ? 'high' : 'low']++

            if (node.m === 'output' || node.m === 'rx') continue

            const propagates = machines[node.m].f(node.i, node.p)
            if (propagates) {
                machines[node.m].outputs.forEach(o => nodes.push({
                    m: o,
                    i: node.m,
                    p: machines[node.m].state
                }))
            }
        }
        return pulses
    }

    let output = {low: 0, high: 0}
    for (let i = 0; i < 1000; i++) {
        const pulses = press(machines)
        output.low += pulses.low
        output.high += pulses.high
    }
    console.log('part 1:', output.low * output.high)

    // reset
    for (let m of Object.keys(machines)) {
        machines[m].state = false
    }

    // rx is reached by a nand gate with several inputs, optimize by finding out when these are hit
    const rxGate = Object.keys(machines).find(m => machines[m].outputs.includes('rx'))
    const rxGateInputs = Object.keys(machines).filter(m => machines[m].outputs.includes(rxGate))

    let pressCycles = {}, presses = 0
    output = 0
    while (output === 0) {
        presses++
        const nodes = [{m: 'broadcaster', i: '', p: false}]
        while (nodes.length) {
            const node = nodes.shift()
            if (node.m === 'rx') continue

            if (node.m === rxGate && node.p && !pressCycles[node.i]) {
                // We hit one input of rxGate with a positive signal for the first time
                pressCycles[node.i] = presses
                if (Object.keys(pressCycles).length === rxGateInputs.length) {
                    output = rxGateInputs.map(i => pressCycles[i]).product()
                    break
                }
            }

            const propagates = machines[node.m].f(node.i, node.p)
            if (propagates) {
                machines[node.m].outputs.forEach(o => nodes.push({
                    m: o,
                    i: node.m,
                    p: machines[node.m].state
                }))
            }
        }
    }
    console.log('part 2:', output)
}
