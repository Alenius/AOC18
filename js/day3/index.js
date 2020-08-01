const {
  readFile,
  parseNewlineSeparated,
  printMatrix,
  createBaseMatrix,
} = require('../utils')
const {
  reduce,
  split,
  forEach,
  compose,
  pipe,
  reject,
  equals,
  tail,
  append,
  flatten,
  join,
  dropLast,
  filter,
  not,
  uniq,
} = require('ramda')

const parseInstructions = (instruction) => {
  // instruction for reference: #13 @ 11,13: 14x41
  const toArr = split(' ')
  const removeAt = reject(equals('@' || ':'))
  const cleanedArr = pipe(toArr, removeAt)(instruction)
  const startCoords = split(',', dropLast(1, cleanedArr[1]))
  const size = split('x', cleanedArr[2])
  const startX = Number(startCoords[0])
  const startY = Number(startCoords[1])
  const sizeX = Number(size[0])
  const sizeY = Number(size[1])
  const instructionObject = {
    sign: tail(split('#', cleanedArr[0])),
    start: { x: startX, y: startY },
    size: { x: sizeX, y: sizeY },
  }
  return instructionObject
}
const part1 = (input) => {
  const instructions = reduce(
    (acc, it) => append(parseInstructions(it), acc),
    [],
    input
  )
  const baseMatrix = createBaseMatrix(1000, 1000)
  forEach((instruction) => {
    for (let i = 0; i < instruction.size.x; i++) {
      for (let j = 0; j < instruction.size.y; j++) {
        const xval = instruction.start.x + i
        const yval = instruction.start.y + j
        if (baseMatrix[xval][yval] === '.')
          baseMatrix[xval][yval] = instruction.sign
        else baseMatrix[xval][yval] = 'X'
      }
    }
  }, instructions)
  const flattened = flatten(baseMatrix) // last item is undefined for whatever reason
  const noOfOverlap = reduce(
    (acc, symbol) => {
      return symbol === 'X' ? acc + 1 : acc
    },
    0,
    flattened
  )
  const trimmedFlattened = filter(
    (val) => not(val === 'X' || val === '.'),
    flattened
  )
  const uniqueTrimmed = uniq(trimmedFlattened)
  let notOverlapped
  // not exactly optimized, takes ish 2 min to run
  forEach((value) => {
    if (value === 'X' || value === '.' || !value) return
    const ix = value - 1
    const instructionSize = instructions[ix].size
    const actualSize = instructionSize.x * instructionSize.y
    const noOfOccurrances = filter(equals(value), trimmedFlattened).length
    if (noOfOccurrances === actualSize) notOverlapped = { value, actualSize }
  }, uniqueTrimmed)
  return { noOfOverlap, notOverlapped }
}

const main = async () => {
  const rawInput = await readFile('day3/input.txt')
  const input = parseNewlineSeparated(rawInput)
  const pt1 = part1(input)
  console.log({ pt1 })
}

main()
