const { generateId } = require('../../modules/util')

class CategorySchema {
  constructor(model) {
    this.model = model
  }
  postCategory (categoryData) {
    // 批量入库
  }

  getCategoryByCategoryId (categoryId) {
    return this.model.findAll({
      where: { categoryId },
    })
  }
}

module.exports = CategorySchema
