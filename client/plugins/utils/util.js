import validator from '../../modules/validator/validate.js'

class Util {
  constructor() {
    this.instance = null
  }
  static getSingletonInstance = () => {
    if (!this.instance) {
      this.instance = new Util()
    }
    return this.instance
  }
  setStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data))
  getStorage = (key) => {
    const value = localStorage.getItem(key)
    if (value != 'undefined' && value != undefined && value != null) {
      return JSON.parse(value)
    } else {
      return false
    }
  }
  login = (data) => this.setStorage('login', data)
  logout = () => this.setStorage('login', null)
  getLoginInfo = () => {
    const loginInfo = this.getStorage('login') || {}
    // validationCheck为true，代表登录信息有效
    loginInfo.validationCheck = new Date().getTime() < loginInfo.expires
    return loginInfo
  }
  getValidator = () => validator
  /**
   * 返回数据类型的名字（字符串）
   * @param {any} arg 不明确类型的变量
   * @return {String} 返回变量的数据类型
   * String: '111'
   * Number: 111, NaN, Infinity
   * Boolean: true,
   * Undefined: undefined,
   * null: Null,
   * Array: [1,2,3],
   * Function: () => {} 函数
   * Object: { a: 'a', b: 'b' }
  */
  getVariableType = (arg) => {
    const typeStr = Object.prototype.toString.call(arg)
    return typeStr.split(' ')[1].replace(']', '')
  }
}


export default {
  install (Vue) {
    Vue.prototype.$util = Util.getSingletonInstance()
  },
}