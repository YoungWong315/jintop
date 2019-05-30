const env = process.env.NODE_ENV;
const RPODCUTION = env === "production";

class Interceptor {
  constructor(Vue) {
    this.vm = Vue;
  }

  requestSuccessFunc(requestObj) {
    // RPODCUTION ? "" : console.info("requestInterceptorFunc", `url: ${requestObj.url}`, requestObj);
    // const aesData = vue.$aes.encrypt(env.VUE_APP_AESKEY, JSON.stringify(requestObj.data));
    // 自定义请求拦截逻辑，可以处理权限，请求发送监控等
    // requestObj.data = {
    //   data: requestObj.data
    // };
    // vue.$bus.emit('loading')
    return requestObj;
  }

  requestFailFunc(requestError) {
    // 自定义发送请求失败逻辑，断网，请求发送监控等
    // vue.$bus.emit('toast', '请求失败，请稍后重试', 2000)
    // vue.$bus.emit('stopLoading')
    return Promise.reject(requestError);
  }

  responseSuccessFunc(responseObj) {
    RPODCUTION ? "" : console.info(responseObj);
    // vue.$bus.emit('stopLoading')

    const resData = responseObj.data;
    const { code } = resData;

    switch (code) {
      case 1:
        // 业务成功
        return {
          data: resData.data,
          code: 1
        };
      case 0:
        // 业务失败
        // vue.$bus.emit("toast", resData.msg, 2000);
        return {
          code: 0
        };
      case -1:
        console.log("登录失效");
        return {
          code: -1
        };
      default:
        // 业务中还会有一些特殊 code 逻辑，在这里做统一处理，也可以下方它们到业务层
        return Promise.reject(resData);
    }
  }

  responseFailFunc(responseError) {
    // vue.$bus.emit("stopLoading");
    // vue.$bus.emit("toast", "服务异常，请稍后重试", 2000);
    // 响应失败，可根据 responseError.message 和 responseError.response.status 来做监控处理
    return Promise.reject(responseError);
  }
}

export default Interceptor;
