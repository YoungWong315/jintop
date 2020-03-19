const { saveQuestionnaire } = require('./handler')

const article = {}

article.inject = router => {
  router.post('/question/questionnaire/save', saveQuestionnaire)
}

module.exports = article
