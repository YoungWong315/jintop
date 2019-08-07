const patterns = require('./pattern.js')
const validatesArr = patterns.patternArr()

// 按序认证
function validate(validates) {
  // validates参数合法性(认证参数)
  if (!(validates instanceof Array)) {
    console.error('parameter error: first parameter should be an Array')
    return
  }
  /*-------------------------------------------------------------------------------------------------*/
  return new Promise((resolve, reject) => {
    for (var i in validates) {
      // 使用自定义正则(如果传入function)
      if (
        patterns.isFn(validates[i].requirement) &&
        !validates[i].requirement(validates[i].value)
      ) {
        validates[i].cb()
        reject({
          result: false,
        })
        return
      } else {
        // 使用内置正则
        for (var j in validatesArr) {
          if (validates[i].requirement == validatesArr[j]) {
            if (!patterns[validatesArr[j]](validates[i].value)) {
              validates[i].cb()
              reject({ result: false })
              return
            }
          }
        }
      }
    }
    resolve({ result: true })
  })
  /*-------------------------------------------------------------------------------------------------*/
}

// 一次性认证全部，返回错误参数key值
let validateAll_Arr = []
function validateAll(validates) {
  // validates参数合法性(认证参数)
  if (!(validates instanceof Array)) {
    console.error('parameter error: parameter should be an Array')
    return
  }
  /*-------------------------------------------------------------------------------------------------*/
  return new Promise((resolve, reject) => {
    // 每次调用，先清空数组
    validateAll_Arr = []
    for (var i in validates) {
      // 使用自定义正则(如果传入function)
      if (
        patterns.isFn(validates[i].requirement) &&
        !validates[i].requirement(validates[i].value)
      ) {
        validateAll_Arr.push(validates[i].key)
        continue
      } else {
        // 使用内置正则
        for (var j in validatesArr) {
          if (validates[i].requirement == validatesArr[j]) {
            if (!patterns[validatesArr[j]](validates[i].value)) {
              validateAll_Arr.push(validates[i].key)
              continue
            }
          }
        }
      }
    }
    if (validateAll_Arr.length != 0) {
      // 失败返回参数错误的数组
      reject({
        result: false,
        errKey: validateAll_Arr,
      })
    } else {
      // 成功回调
      resolve({ result: true })
    }
  })
}

export default {
  install(Vue) {
    Vue.prototype.$validate = validate
    Vue.prototype.$validateAll = validateAll
  },
}
