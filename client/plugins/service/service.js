import axios from "../../modules/axios/axios";

class Service {
  constructor() {}
  register(bodyData) {
    axios.post("/user/register", bodyData);
  }
}

const myService = new Service();

export default {
  install(Vue) {
    axios.inject(Vue);
    Vue.prototype.$service = myService;
  }
};
