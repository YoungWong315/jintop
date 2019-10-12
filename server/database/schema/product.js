const shortid = require('shortid')
const { transTimeStamp, upsertWithModel } = require('../../modules/util')

class ProductSchema {
  constructor(model) {
    this.model = model
  }
  async putInProduct(productData) {
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

    const upsertProduct = upsertWithModel(this.model)
    upsertProduct('uniqueId', data)
  }

  async getProductAll() {
    return this.model.findAll()
  }
}

module.exports = ProductSchema
