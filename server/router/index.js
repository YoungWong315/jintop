const Router = require("koa-router");
const koaBody = require("koa-body");
const { create, find } = require("../schema/user");

const router = new Router();

router.get("/user", koaBody(), async (ctx, next) => {
  const res = await find();
  console.log(res);

  ctx.status = 200;
  ctx.body = {
    code: 1,
    msg: res
  };
});

module.exports = router;
