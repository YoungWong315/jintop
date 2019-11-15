const {
  crawl
} = require('./handler')

const article = {}

article.inject = router => {
  router.post('/crawler/crawl', crawl)
}

module.exports = article
