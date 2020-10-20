const {
  readFile,
  parseNewlineSeparated,
  createBaseMatrix,
  printMatrix,
} = require('../utils')
const { split, gt, head, last, reduce } = require('ramda')

const parseCoordinate = (stringifiedCoordinate) => {
  const coordinateStrArr = split(', ', stringifiedCoordinate)
  return coordinateStrArr.map((it) => parseInt(it))
}

const findLargestCoordinate = reduce(
  (prev, curr) => (gt(curr, prev) ? curr : prev),
  0
)

const getXCoordinate = head
const getYCoordinate = last

const main = async () => {
  const rawInput = await readFile('day6/input_test.txt')
  const input = parseNewlineSeparated(rawInput)
  const intInput = input.map(parseCoordinate)

  const largestX = findLargestCoordinate(intInput.map(getXCoordinate))
  const largestY = findLargestCoordinate(intInput.map(getYCoordinate))

  const matrix = createBaseMatrix(largestY, largestX)

  const valueOfA = 'A'.charCodeAt(0)

  console.log({ largestX, largestY })

  intInput.map((it, ix) => {
    matrix[getXCoordinate(it)][getYCoordinate(it)] = String.fromCharCode(
      valueOfA + ix
    )
  })
  printMatrix(matrix)
}

main()
