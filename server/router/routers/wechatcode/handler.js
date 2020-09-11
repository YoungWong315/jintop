const { getCtxBody, getCtxQuery, successResponse } = require('../../util')
const superagent = require('superagent')
const axios = require('axios') // 测试使用axios, superagent貌似返回数据格式过多

let access_token = ''

const getWechatToken = async (appId, appSecret) => {
  const ctx = await superagent.get(
    `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`,
  )
  const ctxBody = ctx.request.response.body
  console.log('ctxBody ------------------', ctxBody)
  if (ctxBody) {
    // 重置access_token
    setTimeout(() => {
      access_token = ''
    }, (ctxBody.expire_in - 10 * 60) * 1000)
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
    is_hyaline: options.is_hyaline || true,
  }
  const buffer = await superagent
    .post(
      `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${access_token}`,
      data,
    )
    .set('Accept-Encoding', 'gzip')
  if (buffer) {
    console.log('qrcode buffer: ', buffer)
    return buffer
  } else {
    return null
  }
}

exports.getwxacodeunlimit = async ctx => {
  const { path, appId, appSecret, page, channels = [] } = getCtxBody(ctx)

  if (!access_token) {
    access_token = await getWechatToken(appId, appSecret)
  }

  let getQrcodePromiseArr = []
  channels.forEach(channel => {
    const options = {
      scene: `channel=${channel}`,
      page,
    }
    getQrcodePromiseArr.push(getWxaCodeUnlimit(access_token, options))
  })
  Promise.all(getQrcodePromiseArr)
    .then(qrcodeBuffers => {
      qrcodeBuffers.forEach((buffer, index) => {
        console.log(buffer)
        const fs = require('fs')
        const { sep } = require('path')
        fs.writeFile(
          `${path}${sep}${channels[index]}.png`,
          buffer,
          { encoding: 'utf-8', mode: 0666, flag: 'w' },
          err => {
            console.log(err)
          },
        )
      })
    })
    .catch(e => {
      console.log(e)
    })
}
