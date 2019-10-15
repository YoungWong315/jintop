const Crawler = require('../crawler')

const baseUrl = 'https://www.gucci.cn'
const crawler = new Crawler({ uri: baseUrl })
let $ = null // 全局的cheerio对象

const { putInProduct } = require('../../database/schema/product')
const { generateId } = require('../../modules/util')

const crawGucci = async () => {
  try {
    $ = await crawler.start()
    //首页导航栏
    const categoryArr = cheerioToArrOfObjectsWithFormat(
      $('.spice-nav-menu'),
      genCategoryObj,
    )
    // 根据 "数据结构"，对非一级分类进行赋值，此时categoryArr为合理的分类数据格式
    /* let rootCategory = {}
    categoryArr.reduce((pre, cur) => {
      // 上一个是一级分类, 直到出现下一个一级分类为止，中间的分类全是子分类(由gucci网页的格式决定这样处理)
      if (pre.isRootLevel) {
        rootCategory = pre // 用rootCategory保留pre指向
      }
      // 当前不是一级分类, 将他的上一个的parentId作为自己的parentId(由gucci网页的格式决定这样处理)
      if (!cur.isRootLevel) {
        cur.parentId = pre.parentId
        rootCategory.children.push(cur.categoryId)
      }

      return cur
    }) */

    // gucci的seo分类整理完，but发现他们网页里有更全面的分类。。。。。。。
    // console.log(categoryArr)

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
 * 接收一个cheerio对象，解析这个对象，整理成 一级分类/二级分类/三级分类 的对象
 */
const genCategoryObj = elem => {
  const categoryArr = []

  // >--------------------------- 一级分类 ---------------------------------<
  const menuAnchor = $(elem).find('a')
  const rootId = generateId()
  const category_root = {
    href: menuAnchor.attr('href'),
    name: menuAnchor.text(),
    categoryId: rootId,
    parentId: rootId,
    rootId: rootId,
    children: [],
    isRootLevel: true,
  }
  console.log(category_root)

  // >---------------------------- 二级分类 .spice-sub-menu .spice-header-menu-container-scroll  ----------------------------------<
  // const subMenu = $(elem).find('.spice-sub-menu')
  // gucci这里的html是js动态加载的，所以爬不到!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const subMenu = $('.spice-nav-menu .spice-menu-list-item')
  /* const subMenu = $(
    '.spice-navbar-menu.e-navbar-menu .spice-nav.spice-nav-pills .spice-sub-menu',
  ) */
  console.log(subMenu.length)

  subMenu.each((index, item) => {
    const subMenuAnchor = $($(item).children('a'))
    const category_sub = {
      href: subMenuAnchor.attr('href'),
      name: subMenuAnchor.text(),
      categoryId: generateId(),
      parentId: category_root.categoryId,
      rootId: category_root.rootId,
      children: [],
      isRootLevel: false,
    }
    console.log(category_sub)
    category_root.children.push(category_sub)

    // >---------------------------- 三级分类 --------------------------------<
    const thirdMenu = $($(item).children('.spice-sub-menu a'))
    thirdMenu.each((index, element) => {
      thirdMenuAnchor = $(element)
      const href = thirdMenuAnchor.attr('a')
      // 没有链接的分类丢弃
      if (href) {
        const category_third = {
          href: thirdMenuAnchor.attr('href'),
          name: thirdMenuAnchor.text(),
          categoryId: generateId(),
          parentId: category_sub.categoryId,
          rootId: category_sub.rootId,
          children: [],
          isRootLevel: false,
        }
        category_sub.children.push(category_third)
      }
    })
  })

  return category_root
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
