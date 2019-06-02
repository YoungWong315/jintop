import axios from "../../modules/axios/axios";

class Service {
  constructor() {}
  register(bodyData) {
    return axios.post("/user/register", bodyData);
  }
  findAllUser(page, size) {
    return axios.get(`/user/findAllUser?page=${page}&size=${size}`);
  }
  login(bodyData) {
    return axios.post("/user/login", bodyData);
  }
}

const myService = new Service();

export default {
  install(Vue) {
    axios.inject(Vue);
    Vue.prototype.$service = myService;
  }
};
