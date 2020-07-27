const {
  parseNewlineSeparated,
  readFile,
  castStringArrToInt,
} = require('../utils')

const { reduce, add } = require('ramda')

const getInput = async (filename) => {
  const rawInput = await readFile(filename)
  const stringInput = parseNewlineSeparated(rawInput)
  return castStringArrToInt(stringInput)
}

const firstPart = reduce(add, 0)

async function main() {
  const input = await getInput('day1/input.txt')
  console.log({ firstPart: await firstPart(input) })
}

main()
