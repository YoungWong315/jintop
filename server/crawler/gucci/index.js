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
      const productCategory = $(nav[i]).attr('title')
      const productLink = $(nav_link[i]).attr('href')

      // 这里可能要分多级分类，要多建一个分类表然后和商品做关联
      /**
       * 比如建立 "一级分类" 和 "二级分类" 的表
       * 一级分类下属关联二级分类
       * 二级分类下属关联商品 (若商品没有二级分类，则一级分类直接关联到商品)
       * 这样所有商品都只关联一个分类，然后通过这个分类反查到上级分类，以此类推
       *
       * 所以此处还要做商品分类的入库
       */
      // console.log(`tag: ${productCategory} ---> link: ${baseUrl + productLink}`)

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
            product.category = productCategory

            // console.log('>-------------------- product --------------------<')
            // console.log(product)

            // 商品入库
            // await putInProduct(product)
            product = null
          }
        }
      }

      if (productCategory && productLink) {
        crawlerInner(baseUrl + productLink)
      }
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports = crawGucci
