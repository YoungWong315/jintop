import axios from "../axios/axios";

class Service {
  constructor() {}
  createUser(bodyData) {
    axios.post("/user/create", bodyData);
  }
}

const myService = new Service();

export default {
  install(Vue) {
    Vue.prototype.$service = myService;
  }
};
