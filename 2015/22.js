export default function (input) {
  const bossHitpoints = input.shift().match(/\d+/)[0] / 1
  const bossDamage = input.shift().match(/\d+/)[0] / 1

  const spells = { mm: 53, d: 73, s: 113, p: 173, r: 229 }

  const setupGame = () => ({
    player: {
      hitpoints: 50,
      mana: 500,
      armorTimer: 0,
      manaTimer: 0,
      manaUsed: 0,
    },
    boss: {
      hitpoints: bossHitpoints,
      damage: bossDamage,
      poisonTimer: 0,
    },
    manaUsed: 0,
    spellsUsed: [],
  })

  const runTimers = ({ player, boss }) => {
    if (player.armorTimer) {
      player.armorTimer--
    }
    if (player.manaTimer) {
      player.manaTimer--
      player.mana += 101
    }
    if (boss.poisonTimer) {
      boss.poisonTimer--
      boss.hitpoints -= 3
    }
  }

  const canUseSpell = ({ player, boss }, spell) => {
    return !(
      player.mana <= spells[spell] ||
      (spell === 's' && player.armorTimer) ||
      (spell === 'p' && boss.poisonTimer) ||
      (spell === 'r' && player.manaTimer)
    )
  }

  const playPlayerRound = ({ player, boss }, s) => {
    if (s === 'mm') {
      player.mana -= 53
      boss.hitpoints -= 4
    } else if (s === 'd') {
      player.mana -= 73
      boss.hitpoints -= 2
      player.hitpoints += 2
    } else if (s === 's') {
      player.mana -= 113
      player.armorTimer = 6
    } else if (s === 'p') {
      player.mana -= 173
      boss.poisonTimer = 6
    } else if (s === 'r') {
      player.mana -= 229
      player.manaTimer = 5
    }
  }

  const playBossRound = ({ player, boss }) => {
    if (player.armorTimer) {
      player.hitpoints -= Math.max(1, boss.damage - 7)
    } else {
      player.hitpoints -= boss.damage
    }
  }

  const runGame = (mode) => {
    let games = [setupGame()],
      solution
    while (games.length) {
      const next = games.shift()

      // exit conditions
      if (solution && next.manaUsed >= solution.manaUsed) continue

      // run game with new spells
      for (let spell of Object.keys(spells)) {
        const copy = JSON.parse(JSON.stringify(next))

        if (mode === 'hard') {
          if (--copy.player.hitpoints <= 0) {
            continue
          }
        }

        runTimers(copy)
        if (copy.boss.hitpoints <= 0) {
          if (!solution || copy.manaUsed < solution.manaUsed) solution = copy
          continue
        }

        if (!canUseSpell(copy, spell)) continue
        copy.manaUsed += spells[spell]
        copy.spellsUsed = copy.spellsUsed.concat(spell)

        playPlayerRound(copy, spell)
        if (copy.boss.hitpoints <= 0) {
          if (!solution || copy.manaUsed < solution.manaUsed) solution = copy
          continue
        }

        runTimers(copy)
        if (copy.boss.hitpoints <= 0) {
          if (!solution || copy.manaUsed < solution.manaUsed) solution = copy
          continue
        }
        playBossRound(copy)
        if (copy.player.hitpoints <= 0) continue

        // Continue game
        games.push(copy)
      }
    }
    return solution
  }

  let solution = runGame('easy')
  console.log('Part 1:', solution)
  solution = runGame('hard')
  console.log('Part 2:', solution)
  // < 1302
}
