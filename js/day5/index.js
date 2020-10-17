const {
  readFile,
  parseNewlineSeparated,
  prettyPrintArr,
  castStringArrToInt,
} = require('../utils')
const { split, length, remove, join, filter } = require('ramda')

const pt1 = (originalInput) => {
  let input = originalInput
  let ix = 0
  while (ix < length(input) - 1) {
    const l = input[ix] // left
    const r = input[ix + 1] // right

    if (l === r) {
      ix++
      continue
    }

    const lLow = l.toLowerCase() // left lower case
    const rLow = r.toLowerCase() // right lower case

    if (lLow === rLow) {
      input = remove(ix, 2, input)
      if (ix !== 0) ix-- // decrement to retry previous char with new right side
    } else {
      // not equal, just move on
      ix++
    }
  }

  return input
}

const main = async () => {
  const rawInput = await readFile('day5/input.txt')
  const inputStr = split('', rawInput)
  const valueOfA = 'a'.charCodeAt(0)
  let ix = 0
  let leastUnits

  while (ix < 28) {
    const char = String.fromCharCode(valueOfA + ix)
    const inputWithoutChar = filter(
      (it) => it !== char && it !== char.toUpperCase(),
      inputStr
    )
    const ans = pt1(inputWithoutChar).length
    if (!leastUnits || ans < leastUnits) {
      leastUnits = ans
    }
    ix++
  }

  const part1 = pt1(inputStr)
  console.log({
    units: part1.length,
    pt2: leastUnits,
  })
}

main()
