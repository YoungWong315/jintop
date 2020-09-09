const { readDir } = require('./handler')

const uploader = {}

uploader.inject = router => {
  router.post('/readdir', readDir)
}

module.exports = uploader
