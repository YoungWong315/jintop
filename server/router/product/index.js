const { postArticle } = require('./handler')

const article = {}

article.inject = router => {
  router.get('/product/list', postArticle)
}

module.exports = article
