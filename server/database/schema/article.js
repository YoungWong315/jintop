const Article = require('../model/article')
const shortid = require('shortid')
const { transTimeStamp } = require('../../modules/util')

const postArticle = articleData => {
  const { userId, content } = articleData
  const { year, month, day, hour, minute, second } = transTimeStamp(
    new Date().getTime(),
  )

  const articleId =
    year + month + day + hour + minute + second + shortid.generate()

  Article.create({
    articleId,
    userId,
    content,
  })
}

const getArticleByUserId = async userId => {
  return Article.findAll({
    where: { userId },
  })
}

const getArticleByArticleId = async articleId => {
  return Article.findAll({
    where: { articleId },
  })
}

const getArticleAll = () => {
  return Article.findAll()
}

module.exports = {
  postArticle,
  getArticleByUserId,
  getArticleByArticleId,
  getArticleAll,
}
