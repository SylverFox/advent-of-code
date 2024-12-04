export default function (input) {
  const MAX_FLOOR = 3
  // Prune branches that have this score distance
  const PRUNE_DIST = 4

  const cloneState = (state) => JSON.parse(JSON.stringify(state))
  const hashState = (state) =>
    [
      state.elevator,
      ...state.floors.map((f) =>
        f
          .map((x) => x.name[0] + x.name[1] + x.type[0])
          .sort((a, b) => a.localeCompare(b))
      ),
    ].join(';')
  const scoreState = (state) =>
    state.floors.map((f, i) => f.length * (i + 1)).sum()

  // if a floor contains at least one generator, then every microchip needs an accompanying generator
  const checkFloor = (floor) =>
    floor.some((f) => f.type === 'generator')
      ? floor
          .filter((f) => f.type === 'microchip')
          .every((m) =>
            floor.some((g) => g.type === 'generator' && g.name === m.name)
          )
      : true

  const calculateSteps = (initialState) => {
    let states = [initialState],
      steps = 0,
      cache = new Set(),
      minScore = scoreState(initialState)
    main: while (states.length) {
      let newStates = []
      let newMinScore = minScore

      layer: while (states.length) {
        const next = states.shift()

        // Duplicate state
        const hash = hashState(next)
        next.log.push(hash)
        if (cache.has(hash)) {
          continue
        } else {
          cache.add(hash)
        }

        // Score state
        const score = scoreState(next)
        if (score < minScore - PRUNE_DIST) {
          continue
        } else {
          newMinScore = Math.max(newMinScore, score)
        }

        // Success state
        if (next.floors.slice(0, -1).every((floor) => !floor.length)) {
          return steps
        }

        // Expand state
        let directions = []
        if (next.elevator > 0) directions.push(-1)
        if (next.elevator < MAX_FLOOR) directions.push(1)

        const availableItems = next.floors[next.elevator]
        let itemSet = []
        // move single items
        itemSet.push(...availableItems.map((i) => [i]))
        // move two items
        for (let i = 0; i < availableItems.length - 1; i++) {
          for (let j = i + 1; j < availableItems.length; j++) {
            // A combination of a generator and microchip of different types is never possible
            if (
              availableItems[i].type !== availableItems[j].type &&
              availableItems[i].name !== availableItems[j].name
            ) {
              continue
            }

            itemSet.push([availableItems[i], availableItems[j]])
          }
        }

        for (let dir of directions) {
          for (let set of itemSet) {
            const resultCurFloor = next.floors[next.elevator].filter((f) =>
              set.every((s) => s.name !== f.name || s.type !== f.type)
            )
            const resultNextFloor = [
              ...next.floors[next.elevator + dir],
              ...set,
            ]

            if (!checkFloor(resultCurFloor) || !checkFloor(resultNextFloor)) {
              // invalid states for some floor
              continue
            }

            const newState = cloneState(next)
            // remove set items from floor
            newState.floors[newState.elevator] = resultCurFloor
            // add set items to new floor
            newState.floors[newState.elevator + dir] = resultNextFloor
            // set new floor
            newState.elevator += dir
            newStates.push(newState)
          }
        }
      }

      states = newStates
      minScore = newMinScore
      steps++
      console.log(steps, states.length)
    }
  }

  let initialState = {
    floors: input
      .map((i) => i.match(/\S+ (microchip|generator)/g) || [])
      .map((i) => i.map((x) => x.split(/(-compatible)?\s/)))
      .map((i) => i.map((x) => ({ name: x[0], type: x[2] }))),
    elevator: 0,
    log: [],
  }

  console.log('part 1:', calculateSteps(initialState))
  // 33

  initialState.floors[0].push(
    { name: 'elerium', type: 'microchip' },
    { name: 'elerium', type: 'generator' },
    { name: 'dilithium', type: 'microchip' },
    { name: 'dilithium', type: 'generator' }
  )

  console.log('part 2:', calculateSteps(initialState))
  // 57
}
