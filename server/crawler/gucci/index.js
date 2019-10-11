const Crawler = require('../crawler')

const baseUrl = 'https://www.gucci.cn'
const crawler = new Crawler({ uri: baseUrl })

const { putInProduct } = require('../../database/schema/product')

const crawGucci = async () => {
  try {
    const $ = await crawler.start()
    const nav = $('.navi_seo li')
    const nav_link = $('.navi_seo li a')

    for (let i = 0; i < nav.length; i++) {
      const productTag = $(nav[i]).attr('title')
      const productLink = $(nav_link[i]).attr('href')

      console.log(`tag: ${productTag} ---> link: ${baseUrl + productLink}`)

      const crawlerInner = async uri => {
        const crawler = new Crawler({ uri })

        const $ = await crawler.start()
        const alist = $('#pdlist .spice-item-grid')
        const imglist = $('#pdlist .spice-item-grid img')

        // alist imglist 应该是同样长度的数组
        if (alist.length) {
          for (let j = 0; j < alist.length; j++) {
            let product = {}

            const href = $(alist[j]).attr('href')
            product.plink = baseUrl + href
            product.title = $(imglist[j]).attr('alt')
            product.imgurl = $(imglist[j]).attr('src')
            product.pid = href.split('?')[0].split('/')[3]
            product.tag = productTag

            console.log('>-------------------- product --------------------<')
            console.log(product)
            // await putInProduct(product)
            product = null
          }
        }
      }

      if (productTag && productLink) {
        crawlerInner(baseUrl + productLink)
      }
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports = crawGucci
