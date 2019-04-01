const Router = require("koa-router");
const database = require("../database");
const koaBody = require("koa-body");

const router = new Router();

router.get("/api", koaBody(), (ctx, next) => {
  ctx.status = 200;
  ctx.body = {
    code: 1,
    msg: "hello world!"
  };
});

module.exports = router;
