const Router = require("koa-router");
const koaBody = require("koa-body");
const { create, find } = require("../../database/schema/user");

const router = new Router();

router.get("/create", koaBody(), async (ctx, next) => {
  create();

  ctx.status = 200;
  ctx.body = {
    code: 1,
    msg: "hello world"
  };
});

router.get("/user", koaBody(), async (ctx, next) => {
  const res = await find();

  ctx.status = 200;
  ctx.body = {
    code: 1,
    msg: res
  };
});

module.exports = router;
