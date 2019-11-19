const {
  crawl,
  crawlMeizitu
} = require('./handler')

const article = {}

article.inject = router => {
  router.post('/crawler/crawl', crawl)
  router.post('/crawler/meizitu', crawlMeizitu)
}

module.exports = article
