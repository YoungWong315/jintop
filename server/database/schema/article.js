const shortid = require('shortid')
const { transTimeStamp } = require('../../modules/util')

class ArticleSchema {
  constructor(model) {
    this.model = model
  }
  postArticle(articleData) {
    const { uid, content } = articleData
    const { year, month, day, hour, minute, second } = transTimeStamp(
      new Date().getTime(),
    )

    const articleId =
      year + month + day + hour + minute + second + shortid.generate()

    this.model.create({
      articleId,
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
