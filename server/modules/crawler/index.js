const cheerio = require('cheerio')
const superagent = require('superagent')
const phantom = require('phantom')

class Crawler {
  constructor({ uri }) {
    this.url = uri
    this.header = {
      // 'Host': uri, 带上这个会请求不同
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
    }
  }
  async phantomCrawl () {
    const instance = await phantom.create()
    const page = await instance.createPage()
    const status = await page.open(this.url)
    const content = await page.property('content')

    return this.cheerioLoad(content)
  }
  async cheerioCrawl () {
    const { text } = await superagent.get(this.url).set(this.header)
    return await this.cheerioLoad(text)
  }
  // return html text
  async request () {
    return superagent.get(this.url).set(this.header)
  }
  // return dom
  async cheerioLoad (html) {
    return cheerio.load(html)
    // return new JSDOM(html, { runScripts: dangerously ? 'dangerously' : undefined })
  }
}

module.exports = Crawler
