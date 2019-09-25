const { postArticle } = require('./handler')

const article = {}

article.inject = router => {
  router.post('/user/register', postArticle)
}

module.exports = article
