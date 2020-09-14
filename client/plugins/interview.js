let arr = [['1-7', '2-6'], '4-6', [['2-0', '1-4'], ['3-9'], '4-5']]

/* console.log([...[['1-7', '2-6'], '4-6']])
    console.log([].concat(...[['1-7', '2-6'], '4-6'])) */

// Q1: 完成数组 flat 函数
function flat(arr) {
  let parentArr = []
  let childArr = []
  arr.forEach((item, index) => {
    if (typeof item == 'string') {
      parentArr.push(item)
    } else if (typeof item == 'object') {
      childArr = [...childArr, ...flat(item)]
    }
  })
  return [...parentArr, ...childArr]
}

function flat2(arr) {
  return [].concat(
    ...arr.map(item => {
      if (typeof item == 'string') {
        return item
      } else if (typeof item == 'object') {
        return flat2(item)
      }
    }),
  )
}

function cal(arr) {
  return [].concat(
    ...arr.map(item => {
      if (typeof item == 'string') {
        const numbers = item.split('-')
        return numbers[0] * numbers[1]
      } else if (typeof item == 'object') {
        return cal(item)
      }
    }),
  )
}

console.log(flat2(arr))
console.log(cal(arr))
