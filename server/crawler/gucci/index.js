const Crawler = require('../crawler')

const baseUrl = 'https://www.gucci.cn'
const crawler = Crawler.getSingletonInstance({
  uri: `${baseUrl}/zh/ca/men/bags/messenger?pn=1`,
})

const { putInProduct } = require('../../database/schema/product')

const crawGucci = async () => {
  try {
    const $ = await crawler.start()
    const alist = $('#pdlist .spice-item-grid')
    const imglist = $('#pdlist .spice-item-grid img')

    // alist imglist 应该是同样长度的数组
    for (let i = 0; i < alist.length; i++) {
      let product = {}

      const href = $(alist[i]).attr('href')
      product.plink = baseUrl + href
      product.title = $(imglist[i]).attr('alt')
      product.imgurl = $(imglist[i]).attr('src')
      product.pid = href.split('?')[0].split('/')[3]

      await putInProduct(product)
      product = null
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports = crawGucci
