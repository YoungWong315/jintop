// const dbInstance = require('../../database')
// const articleSchema = dbInstance.getSchema('article')
const Crawler = require('../../../modules/crawler')

const { getCtxBody, getCtxQuery, successResponse } = require('../../util')

exports.crawl = async ctx => {
  const { link } = getCtxQuery(ctx)
  const crawler = new Crawler({ uri: link })

  const $ = await crawler.phantomCrawl()
  const { text } = await crawler.request()

  const imgNodeList = $('img')

  let imgs = []
  imgNodeList.map((index, elem) => {
    imgs.push($(elem).attr('src'))
  })

  successResponse(ctx, {
    text, imgs
  })
}

exports.crawlMeizitu = async ctx => {
  const crawlMeizitu = require('../../../crawler/meizitu')
  await crawlMeizitu()
  successResponse(ctx)
}
