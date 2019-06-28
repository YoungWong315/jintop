const CryptoJS = require('crypto-js')
const { AES, SHA1 } = CryptoJS

class Crypto {
  constructor({ AES_SECRET }) {
    this.AES_SECRET = AES_SECRET
  }
  encryptAES = data =>
    AES.encrypt(JSON.stringify(data), this.AES_SECRET).toString()
  decryptAES = cipherText =>
    JSON.parse(
      AES.decrypt(cipherText, this.AES_SECRET).toString(CryptoJS.enc.Utf8),
    )
  encryptSHA1 = encryptText => SHA1(encryptText).toString()
}

const secret = {
  AES_SECRET: 'jintop_AES_secret',
}

const crypto = new Crypto(secret)

export default {
  install(Vue) {
    Vue.prototype.$crypto = crypto
  },
}
