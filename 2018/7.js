export default function (input) {
  input = input
    .map((i) => i.match(/ ([A-Z]) .* ([A-Z])/))
    .map((i) => [i[1], i[2]])
  let nodes = {}
  for (let i of input) {
    if (!nodes[i[0]]) {
      nodes[i[0]] = {
        prev: [],
        next: [],
      }
    }
    if (!nodes[i[1]]) {
      nodes[i[1]] = {
        prev: [],
        next: [],
      }
    }
    nodes[i[0]].next.push(i[1])
    nodes[i[1]].prev.push(i[0])
  }

  let open = Object.keys(nodes)
    .filter((n) => !nodes[n].prev.length)
    .sort((a, b) => a.localeCompare(b))
  let closed = []
  while (open.length) {
    const current = open.shift()
    closed.push(current)

    const nextNodes = nodes[current].next
      .filter((n) => !closed.includes(n) && !open.includes(n))
      .filter((n) => nodes[n].prev.every((p) => closed.includes(p)))
    open.push(...nextNodes)
    open.sort((a, b) => a.localeCompare(b))
  }
  console.log('part 1:', closed.join(''))

  open = []
  closed = []
  let time = 0
  let workers = [null, null, null, null, null]
  while (true) {
    // check which jobs can be added to the queue
    const nextNodes = Object.keys(nodes)
      .filter(
        (n) =>
          !closed.includes(n) &&
          !open.includes(n) &&
          !workers.some((w) => w?.n === n)
      )
      .filter((n) => nodes[n].prev.every((p) => closed.includes(p)))
    open.push(...nextNodes)
    open.sort((a, b) => a.localeCompare(b))

    if (open.length) {
      // assign the next job
      const current = open.shift()
      const nextWorker = workers.indexOf(null)
      workers[nextWorker] = {
        n: current,
        t: 0,
        ttl: current.charCodeAt() - 4,
      }
    }

    // wait until a worker is free
    if (workers.indexOf(null) === -1 || !open.length) {
      const workerTTLs = workers.map((w) => (w ? w.ttl - w.t : Infinity))
      const delta = Math.min(...workerTTLs)
      time += delta
      for (let w = 0; w < workers.length; w++) {
        if (workers[w]) {
          workers[w].t += delta
          if (workers[w].t === workers[w].ttl) {
            closed.push(workers[w].n)
            workers[w] = null
          }
        }
      }
    }

    if (closed.length === Object.keys(nodes).length) {
      break
    }
  }

  console.log('part 2:', time)
}
