const {
  parseNewlineSeparated,
  readFile,
  castStringArrToInt,
} = require('../utils')

const { reduce, add, length, equals } = require('ramda')

const getInput = async (filename) => {
  const rawInput = await readFile(filename)
  const stringInput = parseNewlineSeparated(rawInput)
  return castStringArrToInt(stringInput)
}

const firstPart = reduce(add, 0)

const isListOutOfBounds = (list, index) => equals(index, length(list) - 1)

const secondPart = (input) => {
  let value = input[0]
  const foundValues = {}
  let index = 1
  while (!foundValues[value]) {
    foundValues[value] = true
    value = add(value, input[index])
    index = isListOutOfBounds(input, index) ? 0 : add(1, index)
  }
  return value
}

async function main() {
  const input = await getInput('day1/input.txt')
  const firstPartAnswer = await firstPart(input)
  const secondPartAnswer = secondPart(input)
  console.log({ firstPartAnswer, secondPartAnswer })
}

main()
