const crypto = require('../../modules/crypto')
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
    const { username, password, phone } = ctx.request.body.data
    // const user = await findByUsername(username)

    const result = await register({ username, password, phone })
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
    const user = await findByUsername(username)

    if (user) {
      const { password, uid } = user
      // 响应数据
      const res = {
        code: 1,
        data: { uid, username },
      }
      if (password === psd) {
        // 用户密码正确，响应数据中加入token
        res.data.token = crypto.jwtSign({ uid }, '48h')
        ctx.body = res
      } else {
        throw { message: '用户名或密码错误' } // 抛出的对象，作为err参数，进入到handler的catch中
      }
    } else {
      throw { message: '用户不存在' }
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
