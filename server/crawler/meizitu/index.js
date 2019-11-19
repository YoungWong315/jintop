const Crawler = require('../../modules/crawler')

const baseUrl = 'http://www.meizitu.net.cn/'
const crawler = new Crawler({ uri: baseUrl })

let $ = null
const crawMeizitu = async () => {
  try {
    $ = await crawler.cheerioCrawl()
    //首页导航栏
    const imgArr = cheerioToArrOfObjectsWithFormat(
      $('img'),
      getImgSrc,
    )
    console.log(imgArr)

  } catch (e) {
    console.log(e)
  }
}

// >------------------------------- 业务函数 ----------------------------------<
/**
 * 接收一个cheerio对象，返回一个category所需格式的对象
 */
const getImgSrc = elem => {
  return $(elem).attr('src')
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
  console.log(cheerioList)
  cheerioList.each((index, elem) => {
    const formatedObj = formatFn(elem)
    if (formatedObj) {
      arr.push(formatedObj)
    }
  })
  return arr
}

module.exports = crawMeizitu
