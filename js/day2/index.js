const { parseNewlineSeparated, readFile } = require('../utils')
const { forEach, uniq, includes } = require('ramda')

const part1 = (listOfIDs) => {
  let twice = 0
  let thrice = 0
  forEach((id) => {
    let letterAggr = {}
    forEach((letter) => {
      const letterCount = letterAggr[letter] || 0
      letterAggr = { ...letterAggr, [letter]: letterCount + 1 }
    }, id)
    const values = Object.values(letterAggr)
    const uniqueValues = uniq(values)
    includes(2, uniqueValues) && twice++ // check for duplicates
    includes(3, uniqueValues) && thrice++ // check for triplicates
  }, listOfIDs)
  return twice * thrice
}

const main = async () => {
  const rawInput = await readFile('day2/input.txt')
  const input = parseNewlineSeparated(rawInput)
  console.log({ answer1: part1(input) })
}

main()
