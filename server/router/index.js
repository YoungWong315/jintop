const router = require("koa-router")();
const koaBody = require("koa-body"); // 处理post请求数据
const { create, find } = require("../../database/schema/user");

router.post("/user/register", koaBody(), async (ctx, next) => {
  // create();
  const { data } = ctx.request.body;

  ctx.status = 200;
  ctx.body = {
    code: 1,
    msg: data
  };
});

router.get("/user/find", async (ctx, next) => {
  const res = await find();

  ctx.status = 200;
  ctx.body = {
    code: 1,
    msg: res
  };
});

module.exports = router;
