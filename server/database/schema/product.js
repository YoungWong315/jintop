const Product = require('../model/product')
const shortid = require('shortid')
const { transTimeStamp, upsertWithModel } = require('../../modules/util')

const putInProduct = async productData => {
  const { title, imgurl, plink, pid: uniqueId } = productData
  const { year, month, day, hour, minute, second } = transTimeStamp(
    new Date().getTime(),
  )

  const data = {
    pid: shortid.generate() + year + month + day + hour + minute + second,
    uniqueId,
    title,
    imgurl,
    plink,
  }

  const upsertProduct = upsertWithModel(Product)
  upsertProduct('uniqueId', data)
}

const getProductAll = async () => {
  return Product.findAll()
}

module.exports = {
  putInProduct,
  getProductAll,
}
