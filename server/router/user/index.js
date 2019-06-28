const crypto = require('../../modules/crypto/index')
const {
  register,
  registerAdmin,
  findByUsername,
  findAllUser,
  findByUid,
} = require('../../database/schema/user')

const user = {}

user.inject = router => {
  router.post('/user/register', async ctx => {
    const { data } = ctx.request.body
    const result = await register(data)
    const { uid, username, phone, role } = result

    let token = crypto.jwtSign({ uid }, '48h')

    ctx.body = {
      code: 1,
      data: { uid, username, phone, role, token },
    }
  })

  router.post('/user/registerAdmin', async ctx => {
    const { data } = ctx.request.body
    const result = await registerAdmin(data)

    ctx.body = {
      code: 1,
      data: result,
    }
  })

  router.post('/user/login', async ctx => {
    const { username, psd } = ctx.request.body.data
    const { password, uid } = await findByUsername(username)

    let result = { uid, username }
    if (password === psd) {
      result.token = crypto.jwtSign({ uid }, '48h')
    }

    ctx.body = {
      code: 1,
      data: result,
    }
  })

  router.get('/user/findByUsername', async ctx => {
    const {
      data: { username },
    } = ctx.request.body
    const res = await findByUsername(username)

    ctx.body = {
      code: 1,
      data: res,
    }
  })

  router.get('/user/findAllUser', async ctx => {
    const { page, size } = ctx.query
    const result = await findAllUser()

    ctx.body = {
      code: 1,
      data: result,
    }
  })
}

module.exports = user
