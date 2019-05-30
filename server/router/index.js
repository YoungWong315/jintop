const router = require("koa-router")();
const session = require("koa-session");
const koaBody = require("koa-body"); // 处理post请求数据

router.keys = ["some secret hurr"];

const session_config = {
  key: "koa:sess" /** (string) cookie key (default is koa:sess) */,
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true /** (boolean) automatically commit headers (default true) */,
  overwrite: true /** (boolean) can overwrite or not (default true) */,
  httpOnly: true /** (boolean) httpOnly or not (default true) */,
  signed: true /** (boolean) signed or not (default true) */,
  rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
  renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

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

router
  .use(session(session_config, router))
  .use(koaBody())
  .use(handler);

user.inject(router);

module.exports = router;
