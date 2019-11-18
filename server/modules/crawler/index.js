const cheerio = require('cheerio')
const superagent = require('superagent')
const phantom = require('phantom')

class Crawler {
  constructor({ uri }) {
    this.url = uri
    this.options = { uri, transform: body => cheerio.load(body) }
  }
  async crawl () {
    const instance = await phantom.create();
    const page = await instance.createPage();
    const status = await page.open(this.url);
    const content = await page.property('content')

    console.log(content)

    return this.cheerioLoad(content)
  }
  async cheerioCrawl () {
    return superagent.get(this.options)
      .then($ => $)
      .catch(err => console.log(err))
  }
  // return html text
  async request () {
    return superagent.get(this.url)
  }
  // return dom
  async cheerioLoad (html, dangerously = false) {
    return cheerio.load(html)
    // return new JSDOM(html, { runScripts: dangerously ? 'dangerously' : undefined })
  }
}

module.exports = Crawler
