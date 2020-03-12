const { saveQuestionnaire } = require('./handler')

const article = {}

article.inject = router => {
  router.post('/question/questionnaire/update', saveQuestionnaire)
}

module.exports = article
