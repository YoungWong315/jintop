const Article = require('../model/article')
const shortid = require('shortid')
const { transTimeStamp } = require('../../modules/util')

const postArticle = articleData => {
  const { uid, content } = articleData
  const { year, month, day, hour, minute, second } = transTimeStamp(
    new Date().getTime(),
  )

  const articleId =
    year + month + day + hour + minute + second + shortid.generate()

  Article.create({
    articleId,
    uid,
    content,
  })
}

const getArticleByUid = async uid => {
  return Article.findAll({
    where: { uid },
  })
}

const getArticleByArticleId = async articleId => {
  return Article.findAll({
    where: { articleId },
  })
}

const getArticleAll = async () => {
  return Article.findAll()
}

module.exports = {
  postArticle,
  getArticleByUid,
  getArticleByArticleId,
  getArticleAll,
}
