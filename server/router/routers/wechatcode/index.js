const {
  getwxacodeunlimit,
} = require('./handler')

const user = {}

user.inject = router => {
  router.post('/wechat/getwxacodeunlimit', getwxacodeunlimit)
}

module.exports = user
