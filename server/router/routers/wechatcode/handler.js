const { getCtxBody, getCtxQuery, successResponse } = require('../../util')
const axios = require('axios') // 测试使用axios, superagent貌似返回数据格式过多
// const sharp = require('sharp')

let access_token = ''

const getWechatToken = async (appId, appSecret) => {
  const ctx = await axios.get(
    `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`,
  )
  const ctxBody = ctx.data
  console.log('getWechatToken body ------------------', ctxBody)
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
  const buffer = ctx.data
  if (buffer) {
    console.log('getWxaCodeUnlimit buffer: ', ctx)
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

  const fs = require('fs')
  const { sep } = require('path')

  const qrcodeBuffers = await Promise.all(getQrcodePromiseArr)
  qrcodeBuffers.forEach((buffer, index) => {
    try {
      // sharp(buffer).toFile(`${path}${sep}${channels[index]}.png`)
      /* console.log('isBuffer: ', Buffer.isBuffer(buffer))
      const buffer_img = Buffer.from(buffer)
      console.log('buffer_img: ', buffer_img) */
      fs.writeFileSync(`${path}${sep}${channels[index]}.png`, buffer)
    } catch (e) {
      console.log(e)
    }
  })
  /* Promise.all(getQrcodePromiseArr)
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
    }) */
}
