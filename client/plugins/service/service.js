import axios from '../../modules/axios/axios'

class Service {
  constructor() {
    this.instance = null
  }
  static getSingletonInstance = () => {
    if (!this.instance) {
      this.instance = new Service()
    }
    return this.instance
  }
  register = bodyData => axios.post('/user/register', bodyData)
  findAllUser = (page, size) =>
    axios.get(`/user/findAllUser?page=${page}&size=${size}`)
  login = bodyData => axios.post('/user/login', bodyData)

  crawlByLink = link => axios.post(`/crawler/crawl?link=${link}`)
  crawlMeizitu = () => axios.post(`/crawler/meizitu`)
}

export default {
  install (Vue) {
    axios.inject(Vue)
    Vue.prototype.$service = Service.getSingletonInstance()
  },
}
