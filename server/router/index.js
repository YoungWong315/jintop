const router = require("koa-router")();
const koaBody = require("koa-body"); // 处理post请求数据
const { register, findByUsername, findAllUser } = require("../../database/schema/user");

router.post("/user/register", koaBody(), async (ctx, next) => {
  const { data } = ctx.request.body;
  const result = await register(data);
  console.log("result-----------<");
  console.log(result);

  ctx.status = 200;
  ctx.body = {
    code: 1,
    data: result
  };
});

router.get("/user/findByUsername", async (ctx, next) => {
  const {
    data: { username }
  } = ctx.request.body;
  const res = await findByUsername(username);

  ctx.status = 200;
  ctx.body = {
    code: 1,
    data: res
  };
});

router.get("/user/findAllUser", async (ctx, next) => {
  const result = await findAllUser();

  console.log(result);

  ctx.status = 200;
  ctx.body = {
    code: 1,
    data: result
  };
});

module.exports = router;
