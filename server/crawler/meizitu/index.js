const Crawler = require('../../modules/crawler')
const superagent = require('superagent')
const fs = require('fs')
const { mkdirSync } = require('../../modules/util')

// a/list_1_${index}.html
const getMeizituUrlByPage = (index) => `https://www.meizitu.com/`
const crawler = new Crawler()

let $ = null
const crawMeizitu = async () => {
  // for (let i = 1; i <= 60; i++) {
  crawler.url = getMeizituUrlByPage(1)
  console.log(crawler)
  try {
    $ = await crawler.cheerioCrawl()
    //首页导航栏
    const imgArr = cheerioToArrOfObjectsWithFormat(
      $('img'),
      getImgSrc,
    )
    console.log(imgArr)
    const filePath = `${__dirname}/downloadImgs`
    mkdirSync(filePath) // 创建文件夹
    imgArr.forEach(elem => {
      const filename = elem.split('/').pop() // 获取文件名
      const writePath = filePath + '/' + filename // 写入路径 + 文件名
      if (!fs.existsSync(writePath)) {
        superagent.get(elem).pipe(fs.createWriteStream(writePath)) // 下载文件，并写入在指定路径
      }
    })

  } catch (e) {
    console.log(e)
  }
  // }
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
  // console.log(cheerioList)
  cheerioList.each((index, elem) => {
    const formatedObj = formatFn(elem)
    if (formatedObj) {
      arr.push(formatedObj)
    }
  })
  return arr
}

module.exports = crawMeizitu
