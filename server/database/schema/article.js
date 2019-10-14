const { generateId } = require('../../modules/util')

class ArticleSchema {
  constructor(model) {
    this.model = model
  }
  postArticle(articleData) {
    const { uid, content } = articleData

    this.model.create({
      articleId: generateId(),
      uid,
      content,
    })
  }

  async getArticleByUid(uid) {
    return this.model.findAll({
      where: { uid },
    })
  }

  async getArticleByArticleId(articleId) {
    return this.model.findAll({
      where: { articleId },
    })
  }

  async getArticleAll() {
    return this.model.findAll()
  }
}

module.exports = ArticleSchema
