import { Buffer } from 'node:buffer'

export default function (input) {
  input = input[0]
    .split('')
    .map((n) => parseInt(n, 16).toString(2).padStart(4, '0'))
    .join('')

  let versionSum = 0
  const parsePacket = (input) => {
    const version = parseInt(input.slice(0, 3), 2)
    versionSum += version
    const type = parseInt(input.slice(3, 6), 2)
    let bitsRead = 6,
      output = 0

    if (type === 4) {
      let groupOffset = bitsRead
      let value = input.slice(groupOffset + 1, groupOffset + 5)
      while (input[groupOffset] !== '0') {
        groupOffset += 5
        value += input.slice(groupOffset + 1, groupOffset + 5)
      }
      bitsRead = groupOffset + 5
      output = parseInt(value, 2)
    } else {
      const lengthID = input.slice(6, 7)
      let subPackets = []
      if (lengthID === '0') {
        const packetSize = parseInt(input.slice(7, 22), 2)
        let parsed = 0
        while (parsed < packetSize) {
          const pp = parsePacket(input.slice(22 + parsed, 22 + packetSize))
          parsed += pp[0]
          subPackets.push(pp[1])
        }
        bitsRead += parsed + 16
      } else if (lengthID === '1') {
        const packetNum = parseInt(input.slice(7, 18), 2)
        let parsed = 0,
          offset = 0
        while (parsed++ < packetNum) {
          const pp = parsePacket(input.slice(18 + offset))
          offset += pp[0]
          subPackets.push(pp[1])
        }
        bitsRead += offset + 12
      }

      if (type === 0) {
        output = subPackets.reduce((a, b) => a + b)
      } else if (type === 1) {
        output = subPackets.reduce((a, b) => a * b)
      } else if (type === 2) {
        output = Math.min(...subPackets)
      } else if (type === 3) {
        output = Math.max(...subPackets)
      } else if (type === 5) {
        output = subPackets[0] > subPackets[1] ? 1 : 0
      } else if (type === 6) {
        output = subPackets[0] < subPackets[1] ? 1 : 0
      } else if (type === 7) {
        output = subPackets[0] === subPackets[1] ? 1 : 0
      }
    }

    return [bitsRead, output]
  }

  const output = parsePacket(input)
  console.log('Part 1:', versionSum)
  console.log('Part 2:', output[1])
}
