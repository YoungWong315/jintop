const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
const { AES_SECRET, JWT_SECRET } = require('./config')
const { AES, SHA1 } = CryptoJS

class Crypto {
  constructor({ AES_SECRET, JWT_SECRET }) {
    this.AES_SECRET = AES_SECRET
    this.JWT_SECRET = JWT_SECRET
  }
  encryptAES(data) {
    return AES.encrypt(JSON.stringify(data), this.AES_SECRET).toString()
  }
  decryptAES(cipherText) {
    return JSON.parse(
      AES.decrypt(cipherText, this.AES_SECRET).toString(CryptoJS.enc.Utf8),
    )
  }
  encryptSHA1(encryptText) {
    return SHA1(encryptText).toString()
  }
  jwtSign(data, expiresIn) {
    return this.encryptAES(jwt.sign(data, this.JWT_SECRET, { expiresIn }))
  }
  jwtVerify(token) {
    return jwt.verify(this.decryptAES(token), this.JWT_SECRET)
  }
}

const crypto = new Crypto({ AES_SECRET, JWT_SECRET })

module.exports = crypto
