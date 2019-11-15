// const dbInstance = require('../../database')
// const articleSchema = dbInstance.getSchema('article')
const Crawler = require('../../../modules/crawler')

const { getCtxBody, getCtxQuery, successResponse } = require('../../util')

exports.crawl = async ctx => {
  const { link } = getCtxQuery(ctx)
  const crawler = new Crawler({ uri: link })
  const { text } = await crawler.request()

  const { window } = await crawler.load(text, true)

  const getImgDelay = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        const imgs = []
        const imgNodeList = window.document.querySelectorAll('img')
        imgNodeList.forEach(img => {
          imgs.push(img.src)
        })
        resolve(imgs)
      }, 2000)
    })
  }

  const imgs = await getImgDelay()
  console.log(imgs)

  successResponse(ctx, {
    text, imgs
  })
}
