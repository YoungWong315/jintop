const { upsertWithModel, generateId } = require('../../modules/util')

class ProductSchema {
  constructor(model) {
    this.model = model
  }
  async putInProduct(productData) {
    const { title, imgurl, plink, pid: uniqueId } = productData

    const data = {
      pid: generateId(),
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
