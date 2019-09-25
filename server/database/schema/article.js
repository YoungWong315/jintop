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

module.exports = {
  postArticle,
}
