export default function (input) {
  let passports = [[]],
    index = 0
  for (let i of input) {
    if (i === '') {
      index++
      passports[index] = []
    } else {
      passports[index] = passports[index].concat(i.split(' '))
    }
  }

  const validPassports = passports
    .map((p) =>
      p
        .map((l) => l.split(':')[0])
        .sort()
        .join('')
    )
    .filter(
      (p) => p === 'byrcidecleyrhclhgtiyrpid' || p === 'byrecleyrhclhgtiyrpid'
    )
  console.log('Part 1:', validPassports.length)

  for (let p in passports) {
    const passport = passports[p].map((l) => l.split(':'))
    passports[p] = {}
    for (let entry of passport) {
      passports[p][entry[0]] = entry[1]
    }
  }

  const validateFields = (passport) =>
    ['byrcidecleyrhclhgtiyrpid', 'byrecleyrhclhgtiyrpid'].includes(
      Object.keys(passport).sort().join('')
    )

  const validateHeight = (p) => {
    const match = p.hgt.match(/(\d+)(cm|in)$/)
    if (!match) return false
    const [_, value, unit] = match
    if (unit === 'cm') {
      return value >= 150 && value <= 193
    } else if (unit === 'in') {
      return value >= 59 && value <= 76
    } else {
      return false
    }
  }

  const validPassports2 = passports
    .filter(validateFields)
    .filter((p) => p.byr >= 1920 && p.byr <= 2002)
    .filter((p) => p.iyr >= 2010 && p.iyr <= 2020)
    .filter((p) => p.eyr >= 2020 && p.eyr <= 2030)
    .filter(validateHeight)
    .filter((p) => p.hcl.match(/^#[0-9a-f]{6}$/))
    .filter((p) =>
      ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(p.ecl)
    )
    .filter((p) => p.pid.match(/^\d{9}$/))

  console.log('Part 2:', validPassports2.length)
}
