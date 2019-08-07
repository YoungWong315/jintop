const crypto = require('../../modules/crypto')
const {
  register,
  registerAdmin,
  findByUsername,
  findAllUser,
  findByUid,
  checkUsernameExist,
} = require('../../database/schema/user')

exports.register = async ctx => {
  const { username, password } = ctx.request.body.data
  if (!(await checkUsernameExist(username))) {
    const result = await register({ username, password })
    const { uid, username: uName, role } = result
    let token = crypto.jwtSign({ uid }, '48h')

    ctx.body = {
      code: 1,
      data: { uid, username: uName, role, token },
    }
  } else {
    throw { message: '用户名已被占用' }
  }
}

exports.registerAdmin = async ctx => {
  const { data } = ctx.request.body
  const result = await registerAdmin(data)

  ctx.body = {
    code: 1,
    data: result,
  }
}

exports.login = async ctx => {
  const { username, psd } = ctx.request.body.data
  const user = await findByUsername(username)

  if (user) {
    const { password, uid } = user
    if (password === psd) {
      // 响应数据
      ctx.body = {
        code: 1,
        data: {
          uid,
          username,
          token: crypto.jwtSign({ uid }, '48h'),
        },
      }
    } else {
      throw { message: '用户名或密码错误' } // 抛出的对象，作为err参数，进入到handler的catch中
    }
  } else {
    throw { message: '用户不存在' }
  }
}

exports.findByUsername = async ctx => {
  const {
    data: { username },
  } = ctx.request.body
  const res = await findByUsername(username)

  ctx.body = {
    code: 1,
    data: res,
  }
}

exports.findAllUser = async ctx => {
  const { page, size } = ctx.query
  const result = await findAllUser()

  ctx.body = {
    code: 1,
    data: result,
  }
}
