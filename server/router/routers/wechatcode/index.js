const {
  getwxacodeunlimit,
  getwxacodelimit
} = require('./handler')

const user = {}

user.inject = router => {
  router.post('/wechat/getwxacodeunlimit', getwxacodeunlimit)
  router.post('/wechat/getwxacodelimit', getwxacodelimit)
}

module.exports = user
