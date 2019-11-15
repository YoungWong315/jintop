const cheerio = require('cheerio')
const rp = require('request-promise')

class Crawler {
  constructor({ uri }) {
    this.options = { uri, transform: body => cheerio.load(body) }
  }
  async start () {
    return rp(this.options)
      .then($ => $)
      .catch(err => console.log(err))
  }
}

module.exports = Crawler
