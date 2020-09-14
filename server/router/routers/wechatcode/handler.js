const { getCtxBody, getCtxQuery, successResponse } = require('../../util')
const axios = require('axios')

let access_token = ''

const getWechatToken = async (appId, appSecret) => {
  const ctx = await axios.get(
    `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`,
  )
  const ctxBody = ctx.data
  if (ctxBody) {
    // 重置access_token
    setTimeout(() => {
      access_token = ''
    }, (ctxBody.expire_in - 10 * 60) * 1000)
    console.log('getWechatToken token ------------------', ctxBody.access_token)
    return ctxBody.access_token
  } else {
    return null
  }
}
const getWxaCodeUnlimit = async (access_token, options = {}) => {
  const data = {
    scene: options.scene || '',
    page: options.page,
    width: options.width || 1280,
    auto_color: options.auto_color || false,
    line_color: options.line_color || { r: 0, g: 0, b: 0 },
    is_hyaline: options.is_hyaline || false,
  }
  const ctx = await axios.post(
    `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${access_token}`,
    data,
    {
      responseType: 'arraybuffer', // 修改接口默认返回类型（小程序需要buffer类型，自动转换会导致无法生成图片）
      responseEncoding: null,
    },
  )
  const buffer = {
    buffer: ctx.data,
    filename: options.scene,
  }
  if (buffer) {
    console.log('getWxaCodeUnlimit buffer: ', buffer)
    return buffer
  } else {
    return null
  }
}

exports.getwxacodeunlimit = async ctx => {
  const { path, appId, appSecret, page, scenes = [] } = getCtxBody(ctx)
  const fs = require('fs')

  // 检查path是否存在
  if (!fs.existsSync(path)) {
    throw { message: '目录不存在' }
  }

  // 获取token
  if (!access_token) {
    access_token = await getWechatToken(appId, appSecret)
  }

  // 生成二维码
  let getQrcodePromiseArr = []
  scenes.forEach(scene => {
    const options = { scene, page }
    getQrcodePromiseArr.push(getWxaCodeUnlimit(access_token, options))
  })

  // 写入二维码
  const { sep } = require('path')
  const qrcodeBuffers = await Promise.all(getQrcodePromiseArr)
  let qrcodePaths = []
  qrcodeBuffers.forEach(data => {
    try {
      const writePath = `${path}${sep}${data.filename}.png`
      qrcodePaths.push(writePath)
      fs.writeFileSync(writePath, data.buffer)
    } catch (e) {
      console.log(e)
      throw { message: e }
    }
  })
  successResponse(ctx, qrcodePaths)
}
