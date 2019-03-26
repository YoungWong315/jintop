const Router = require("koa-router");

const router = new Router();

router.get("/api", (ctx, next) => {
  console.log(ctx);
  ctx.status = 200;
  ctx.body = {
    code: 0,
    msg: "get /api"
  };
  console.log("get /api");
  next();
});

module.exports = router;
