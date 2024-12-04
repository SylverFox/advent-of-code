export default function (input) {
  const bossHitpoints = input.shift().match(/\d+/)[0] / 1
  const bossDamage = input.shift().match(/\d+/)[0] / 1
  const bossArmor = input.shift().match(/\d+/)[0] / 1
  const playerHitpoints = 100

  const victory = (damage, armor) =>
    Math.ceil(bossHitpoints / Math.max(damage - bossArmor, 1)) <=
    Math.ceil(playerHitpoints / Math.max(bossDamage - armor, 1))

  const shop = {
    weapons: [
      [8, 4, 0],
      [10, 5, 0],
      [25, 6, 0],
      [40, 7, 0],
      [74, 8, 0],
    ],
    armor: [
      [0, 0, 0],
      [13, 0, 1],
      [31, 0, 2],
      [53, 0, 3],
      [75, 0, 4],
      [102, 0, 5],
    ],
    rings: [
      [0, 0, 0],
      [25, 1, 0],
      [50, 2, 0],
      [100, 3, 0],
      [20, 0, 1],
      [40, 0, 2],
      [80, 0, 3],
    ],
  }

  let min = Infinity,
    max = 0
  for (let w of shop.weapons) {
    for (let a of shop.armor) {
      for (let r1 of shop.rings) {
        for (let r2 of shop.rings) {
          const damage = w[1] + a[1] + r1[1] + r2[1]
          const armor = w[2] + a[2] + r1[2] + r2[2]
          const cost = w[0] + a[0] + r1[0] + r2[0]
          if (victory(damage, armor)) {
            min = Math.min(min, cost)
          } else {
            max = Math.max(max, cost)
          }
        }
      }
    }
  }
  console.log('Part 1:', min)
  console.log('Part 2:', max)
}
