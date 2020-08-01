const fs = require('fs')
const { split, map, forEach, join, append } = require('ramda')

const createBaseMatrix = (height, width) => {
  const appendDot = append('.')
  const base = [[], []]
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      base[i] = appendDot(base[i])
    }
  }
  return base
}

async function readFile(filename) {
  const data = await fs.promises.readFile(filename, 'utf8')
  return data
}

const parseNewlineSeparated = split('\n')

const castStringArrToInt = map(parseInt)

const printMatrix = (matrix) => {
  forEach((row) => console.log(join('', row)), matrix)
}

module.exports = {
  readFile,
  parseNewlineSeparated,
  castStringArrToInt,
  printMatrix,
  createBaseMatrix,
}
