const { parseNewlineSeparated, readFile } = require('../utils')
const {
  forEach,
  uniq,
  includes,
  sort,
  subtract,
  map,
  gt,
  comparator,
  lt,
  findIndex,
  reduce,
  indexOf,
  equals,
  remove,
  head,
  join,
  split,
} = require('ramda')

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

const letterComparer = comparator(lt)

const part2 = (listOfIDs) => {
  const sortedListOfIDs = sort(letterComparer, listOfIDs) // sorts list alphabetically
  const oneLetterDiffArr = []
  forEach((idString) => {
    const currIx = indexOf(idString, sortedListOfIDs)
    if (currIx < sortedListOfIDs.length - 1) {
      const nextIdString = sortedListOfIDs[currIx + 1]
      let letterIx = 0
      let stringLikeness = reduce(
        (acc, letterInString) => {
          const letterLikeness = letterInString
            .toString()
            .localeCompare(nextIdString[letterIx])
          letterIx++
          return acc + Math.abs(letterLikeness)
        },
        0,
        idString
      )
      stringLikeness === 1 && oneLetterDiffArr.push(idString, nextIdString)
      stringLikeness = 0
    }
  }, sortedListOfIDs)
  const firstWord = oneLetterDiffArr[0]
  let differingLetterIx
  let letterIx = 0
  forEach((it) => {
    if (it.localeCompare(oneLetterDiffArr[1][letterIx]) !== 0) {
      differingLetterIx = letterIx
    }
    letterIx++
  }, firstWord)
  split('', head(oneLetterDiffArr)).splice(differingLetterIx, 1) // this will modify the array
  return head(oneLetterDiffArr)
}
const main = async () => {
  const rawInput = await readFile('day2/input.txt')
  const input = parseNewlineSeparated(rawInput)
  console.log({ answer1: part1(input), answer2: part2(input) })
}

main()
