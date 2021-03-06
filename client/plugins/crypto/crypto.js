const CryptoJS = require('crypto-js')
const { AES, SHA1 } = CryptoJS

const NodeRSA = require('node-rsa')

class Crypto {
  constructor({ AES_SECRET, RSA_PRIV_KEY }) {
    this.AES_SECRET = AES_SECRET
    this.RSA_PRIV_ENCREPT = new NodeRSA(RSA_PRIV_KEY)
  }
  encryptAES = data =>
    AES.encrypt(JSON.stringify(data), this.AES_SECRET).toString()
  decryptAES = cipherText =>
    JSON.parse(
      AES.decrypt(cipherText, this.AES_SECRET).toString(CryptoJS.enc.Utf8),
    )
  encryptSHA1 = encryptText => SHA1(encryptText).toString()
  encryptRSA = data => this.RSA_PRIV_ENCREPT.encryptPrivate(data, 'base64')
}

const secret = {
  AES_SECRET: 'jintop_AES_secret',
  RSA_PRIV_KEY: `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQDUqauXsh1wiKZtLMIsD9z8jU3T/jhlW0t+E2/pGI71J5hQRfzK
XJpiu95tgQEmy61oQe8t6mv1mixcC4wG33HI80CtCTfGUhHJluTqWeSNLX6K6bBz
cY3DkCSsNHiip1xx6TuK01zhyuPM8+BBv4B+Qz+aeYNMCIyhfcgGYta1qwIDAQAB
AoGAEU/Klyu5t8p3+dU17U5RSAHcvxAn2SBocdf1OT11jcFuZcJ8xKBrNPRkM/fX
dygHcsBDTzKRHUoyqD+MY5bW9UXSbi3AjdFlt7Jp91sZqDFO2gts1hEqcueSwvh7
x8TB3oZD4TwpJWyZV2ONKXEsKEFk44hrcutyPpJy6TSFHbECQQDsAEXDuaZoHL4r
JdAJypDd1yKmIVwccUq5vt7/qR1/FVTxvJ8stT9NXpr7iNgMtPapndaqcwJh0jzS
fQin7M8pAkEA5q8a0pTXmlMK70ogWxbmhxMRlvZtXpZmBrwNckqW7xjXkvKi515J
G0Ic3KCvsUdbw2t/UcaRApBC80uVY9p8swJBAMk1NkW4C5MqJkxdMbCXXsl0eVsQ
iBrL0Hzqqe9o/PfzdPeg7EjOwoixRwt7UVAMHVzhcDrkUTybZTXEWlPpR3kCQQCK
Hv4oaAZP2LkLXY7R+3w8FCbMBPCnWdXs4lwKuq50qqMo0S7I6aNMNuGhGHUZ6GgB
MjQheosIxefQVMk16HQRAkA2SWLnpf00Z2mPpaCRaPgVBQKDP94OdVUZbXAKsXgy
GjpCpTKwz1v/hKRxc0SJmakWqVbcZ+qtO6eQZscjmTIm
-----END RSA PRIVATE KEY-----`,
}

export default {
  install(Vue) {
    Vue.prototype.$crypto = new Crypto(secret)
  },
}
