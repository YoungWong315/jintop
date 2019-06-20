const router = require("koa-router")();
const koaBody = require("koa-body"); // 处理post请求数据
const jwt = require("jsonwebtoken");

// 引入router<-->user处理模块
const user = require("./user");

const handler = async (ctx, next) => {
  console.log(`request url: ${ctx.request.url}`);
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

const verifyToken = async (ctx, next) => {
  const {
    url,
    header: { Authorization }
  } = ctx.request;
  // 认证token
  if (url === "/user/findByUsername") {
    const token = jwt.verify(Authorization, "secret");
  }
};

router
  .use(
    koaBody({
      multipart: true,
      formidable: {
        maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
      }
    })
  )
  .use(handler)
  .use(verifyToken);

user.inject(router);

module.exports = router;
