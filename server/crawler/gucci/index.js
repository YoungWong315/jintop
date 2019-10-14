const Crawler = require('../crawler')

const baseUrl = 'https://www.gucci.cn'
const crawler = new Crawler({ uri: baseUrl })

const { putInProduct } = require('../../database/schema/product')

const { generateId } = require('../../modules/util')

let $ = null
const crawGucci = async () => {
  try {
    $ = await crawler.start()
    //首页导航栏
    const categoryArr = cheerioToArrOfObjectsWithFormat(
      $('.navi_seo > li'),
      genCategoryObj,
    )
    categoryArr.reduce((pre, cur) => {
      if (!cur.isRootLevel) {
        cur.parentId = pre.parentId
        // cur.rootId = pre.rootId
      }
      return cur
    })
    console.log(categoryArr)
    // 首页导航栏内链接
    const nav_link = $('.navi_seo > li > a')

    /* for (let i = 0; i < nav.length; i++) {
      const category = $(nav[i]).attr('title')
      const productLink = $(nav_link[i]).attr('href')

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
    } */
  } catch (e) {
    console.log(e)
  }
}

// >------------------------------- 业务函数 ----------------------------------<
/**
 * 接收一个cheerio对象，返回一个category所需格式的对象
 */
const genCategoryObj = elem => {
  elem = $(elem)
  const name = elem.attr('title')
  const href = elem.attr('href')
  const isRootLevel = Boolean(href)
  const categoryId = generateId()

  return {
    name,
    categoryId,
    parentId: isRootLevel ? categoryId : '',
    //rootId: isRootLevel ? categoryId : '', // 分级超过2层才需要rootId(gucci首页分类只有两级)
    href,
    isRootLevel,
  }
}

// >------------------------------- 工具函数 ----------------------------------<
/**
 * 把cheerio格式的列表 转化为 普通数组
 * cheerio: cheerio实例，将遍历出的项转化为cheerio对象(如使用这个的话，会导致无法)
 * cheeroList: cheerio使用$()得到的列表数据
 * formatFn: 对cheeroList格式化方法，
 *            接收参数为cheerio格式的单个对象，
 *             需要返回一个对此对象处理后的Object
 * return: 返回经过formatFn处理过的 对象数组
 */
const cheerioToArrOfObjectsWithFormat = (cheerioList, formatFn) => {
  if (typeof formatFn !== 'function') {
    console.error('formatFn should be a function')
    return
  }

  const arr = []
  cheerioList.each((index, elem) => {
    arr.push(formatFn(elem))
  })
  return arr
}

module.exports = crawGucci
