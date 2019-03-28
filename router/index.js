const Router = require("koa-router");
const database = require("../database");

const router = new Router();

router.get("/api", (ctx, next) => {
  ctx.status = 200;
  ctx.body = {
    code: 1,
    msg: "hello world!"
  };
  next();
});

module.exports = router;
