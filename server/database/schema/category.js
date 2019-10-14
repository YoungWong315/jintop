const { generateId } = require('../../modules/util')

class CategorySchema {
  constructor(model) {
    this.model = model
  }
  postCategory(categoryData) {
    const { name, parent, root } = categoryData

    this.model.create({
      articleId: generateId(),
      parentId: '',
      rootId: '',
      name: '',
    })
  }

  async getCategoryByCategoryId(categoryId) {
    return this.model.findAll({
      where: { categoryId },
    })
  }
}

module.exports = CategorySchema
