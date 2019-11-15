const { getProductAll } = require('./handler')

const article = {}

article.inject = router => {
  router.post('/product/list', getProductAll)
}

module.exports = article
