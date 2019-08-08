const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
const {
  AES_SECRET,
  JWT_SECRET,
  RSA_PRIV_KEY,
  RSA_PUB_KEY,
} = require('./config')
const { AES, SHA1 } = CryptoJS

const NodeRSA = require('node-rsa')

class Crypto {
  constructor({ AES_SECRET, JWT_SECRET, RSA_PRIV_KEY, RSA_PUB_KEY }) {
    this.AES_SECRET = AES_SECRET
    this.JWT_SECRET = JWT_SECRET
    this.RSA_PRIV_ENCREPT = new NodeRSA(RSA_PRIV_KEY)
    this.RSA_PUB_DECREPT = new NodeRSA(RSA_PUB_KEY)
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
  encryptRSA(data) {
    return this.RSA_PRIV_ENCREPT.encryptPrivate(data, 'base64')
  }
  decryptRSA(cipherText) {
    return this.RSA_PUB_DECREPT.decryptPublic(cipherText, 'json')
  }
}

const secret = {
  AES_SECRET,
  JWT_SECRET,
  RSA_PRIV_KEY,
  RSA_PUB_KEY,
}

module.exports = new Crypto(secret)
