const CryptoJS = require("crypto-js");
const { AES, SHA1 } = CryptoJS;
const { AES_SECRET } = require("./config");

class Crypto {
  constructor({ AES_SECRET }) {
    this.AES_SECRET = AES_SECRET;
  }
  encryptAES(data) {
    return AES.encrypt(JSON.stringify(data), this.AES_SECRET).toString();
  }
  decryptAES(cipherText) {
    return JSON.parse(AES.decrypt(cipherText, this.AES_SECRET).toString(CryptoJS.enc.Utf8));
  }
  encryptSHA1(encryptText) {
    return SHA1(encryptText).toString();
  }
}

module.exports = new Crypto({ AES_SECRET });
