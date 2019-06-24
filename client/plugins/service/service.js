import axios from '../../modules/axios/axios'

class Service {
  constructor() {}
  /* setAuthHeader() {
    axios.defaults.headers['Authorization'] = localStorage.getItem('token')
  }
  getAuthHeader() {
    return axios.defaults.headers['Authorization']
  } */
  register(bodyData) {
    return axios.post('/user/register', bodyData)
  }
  findAllUser(page, size) {
    return axios.get(`/user/findAllUser?page=${page}&size=${size}`)
  }
  login(bodyData) {
    return axios.post('/user/login', bodyData)
  }
}
const myService = new Service()

export default {
  install(Vue) {
    axios.inject(Vue)
    Vue.prototype.$service = myService
  },
}
