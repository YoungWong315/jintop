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
   * 对比两个obj的不同
   * @param {Object} objPre 之前的对象
   * @param {Object} objAft 修改后的对象
   * @return {Object} 两个对象的区别
   * key增加，type = 'add'
   * key减少，type = 'delete'
   * key不变，内容修改 type = 'modify'
  */
  // 再学一下dom-diff怎么实现的
  diffObj = (objPre, objAft) => {

  }
}


export default {
  install (Vue) {
    Vue.prototype.$util = Util.getSingletonInstance()
  },
}