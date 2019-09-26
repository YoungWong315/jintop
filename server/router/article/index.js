const {
  postArticle,
  getArticleByUserId,
  getArticleByArticleId,
  getArticleAll,
} = require('./handler')

const article = {}

article.inject = router => {
  router.post('/article/post', postArticle)
  router.get('/article/list/userid', getArticleByUserId)
  router.get('/article/list/articleid', getArticleByArticleId)
  router.get('/article/list', getArticleAll)
}

module.exports = article
