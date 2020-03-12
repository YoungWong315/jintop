const { generateId } = require('../../../modules/util')

class ArticleSchema {
  constructor(model) {
    this.model = model
  }
  postArticle (articleData) {
    const { uid, content } = articleData

    this.model.create({
      articleId: generateId(),
      uid,
      content,
    })
  }

  getArticleByUid (uid) {
    return this.model.findAll({
      where: { uid },
    })
  }

  getArticleByArticleId (articleId) {
    this.model.findAll({
      where: { articleId },
    })
  }

  getArticleAll () {
    return this.model.findAll()
  }
}

module.exports = ArticleSchema
