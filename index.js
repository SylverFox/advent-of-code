import moment from 'moment'
import fs from 'fs'
import os from 'os'
import path from 'path'
import { fileURLToPath } from 'url'
import './common.js'

const DIRNAME = path.dirname(fileURLToPath(import.meta.url))

function parseInput() {
    let year, puzzle
    if (process.argv.length === 3) {
        puzzle = Number(process.argv[2])
        year = moment().year()
    } else if (process.argv.length === 4) {
        puzzle = Number(process.argv[3])
        year = Number(process.argv[2])
    } else {
        year = moment().year()
        const files = fs.readdirSync(path.resolve(DIRNAME, year.toString()))
            .filter(f => f.endsWith('.js'))
            .map(f => f.slice(0, -3))
            .sort((a, b) => a - b)
        puzzle = files.pop()
    }
    return [year, puzzle];
}

function getInputFile(year, puzzle) {
    const file = path.resolve(DIRNAME, year.toString(), puzzle + '.txt')
    return fs.existsSync(file) ? fs.readFileSync(file).toString().split('\r\n') : ''
}

const [year, puzzle] = parseInput()
const input = getInputFile(year, puzzle)
const solver = path.resolve(DIRNAME, year + '', puzzle + '.js')

console.log(`Running puzzle ${year}/${puzzle}`)
const time = Date.now()
import(os.platform() === 'win32' ? 'file://' + solver : solver)
    .then(puzzle => puzzle.default(input))
    .then(() => console.log('Solution took', Date.now() - time, 'ms'))
