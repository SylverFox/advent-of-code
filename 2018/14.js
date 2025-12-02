export default function (input) {
  input = input[0]

  const solve1 = () => {
    let a = 0
    let b = 1
    let recipes = [3, 7]
    const target = Number(input)
    while (recipes.length < target + 10) {
      recipes.push(...(recipes[a] + recipes[b] + '').split('').map(Number))
      a = (a + 1 + recipes[a]) % recipes.length
      b = (b + 1 + recipes[b]) % recipes.length
    }
    return recipes.slice(target, target + 10).join('')
  }

  const solve2 = () => {
    let a = 0
    let b = 1
    let recipes = [3, 7]
    while (true) {
      const newRecipe = (recipes[a] + recipes[b] + '').split('').map(Number)
      recipes.push(...newRecipe)
      a = (a + 1 + recipes[a]) % recipes.length
      b = (b + 1 + recipes[b]) % recipes.length

      const found = recipes
        .slice(-(input.length + 2))
        .join('')
        .indexOf(input)
      if (found >= 0) return recipes.join('').indexOf(input)
    }
  }

  console.log('part 1:', solve1())
  console.log('part 2:', solve2())
}
