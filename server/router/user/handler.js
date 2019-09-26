const crypto = require('../../modules/crypto')
const {
  register,
  registerAdmin,
  findByUsername,
  findAllUser,
  findByUid,
  checkUsernameExist,
} = require('../../database/schema/user')
const { getCtxBody, getCtxQuery, successResponse } = require('../util')

exports.register = async ctx => {
  const { username, psd: password } = getCtxBody(ctx)
  // 检查用户名是否存在
  if (!(await checkUsernameExist(username))) {
    const result = await register({ username, password })
    const { uid, username: uName, role } = result
    // 发放token
    let token = crypto.jwtSign({ uid }, '48h')

    const data = {
      uid,
      username: uName,
      role,
      token,
    }
    successResponse(ctx, data)
  } else {
    throw { message: '用户名已被占用' }
  }
}

exports.registerAdmin = async ctx => {
  const result = await registerAdmin(getCtxBody(ctx))
  successResponse(ctx, result)
}

exports.login = async ctx => {
  const { username, psd } = getCtxBody(ctx)
  const user = await findByUsername(username)

  if (user) {
    const { password, uid } = user
    if (password === psd) {
      // 响应数据
      const data = {
        uid,
        username,
        token: crypto.jwtSign({ uid }, '48h'),
      }
      successResponse(ctx, data)
    } else {
      throw { message: '用户名或密码错误' } // 抛出的对象，作为err参数，进入到handler的catch中
    }
  } else {
    throw { message: '用户不存在' }
  }
}

exports.findByUsername = async ctx => {
  const { username } = getCtxBody(ctx)
  const res = await findByUsername(username)
  successResponse(ctx, res)
}

exports.findAllUser = async ctx => {
  const { page, size } = getCtxQuery(ctx)
  const result = await findAllUser()

  successResponse(ctx, result)
}
