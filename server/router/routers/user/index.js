const {
  register,
  registerAdmin,
  login,
  findByUsername,
  findAllUser,
} = require('./handler')

const user = {}

user.inject = router => {
  router.post('/user/register', register)
  router.post('/user/registerAdmin', registerAdmin)
  router.post('/user/login', login)
  router.get('/user/findByUsername', findByUsername)
  router.get('/user/findAllUser', findAllUser)
}

module.exports = user
