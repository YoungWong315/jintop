const router = require("koa-router")();
const koaBody = require("koa-body"); // 处理post请求数据

// 引入router<-->user处理模块
const user = require("./user");

const handler = async (ctx, next) => {
  try {
    ctx.status = 200;
    await next();
  } catch (err) {
    ctx.status = err.status || 200;
    ctx.body = {
      code: 0,
      errMsg: err.message
    };
  }
};

router.use(koaBody()).use(handler);

user.inject(router);

module.exports = router;
