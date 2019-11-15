const {
  postArticle,
  getArticleByUid,
  getArticleByArticleId,
  getArticleAll,
} = require('./handler')

const article = {}

article.inject = router => {
  router.post('/article/post', postArticle)
  router.get('/article/list/uid', getArticleByUid)
  router.get('/article/list/articleid', getArticleByArticleId)
  router.post('/article/list', getArticleAll)
}

module.exports = article
