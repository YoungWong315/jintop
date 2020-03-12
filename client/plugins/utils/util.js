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
  getStorage = (key) => JSON.parse(localStorage.getItem(key))
  login = (data) => this.setStorage('login', data)
  logout = () => this.setStorage('login', null)
  getLoginInfo = () => {
    const loginInfo = this.getStorage('login')
    loginInfo.validationCheck = new Date().getTime() < loginInfo.expires
    return loginInfo
  }
  getValidator = () => validator
}


export default {
  install (Vue) {
    Vue.prototype.$util = Util.getSingletonInstance()
  },
}