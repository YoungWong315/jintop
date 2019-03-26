const Router = require("koa-router");

const router = new Router();

router.get("/", (ctx, next) => {
  ctx.body = {
    code: 0,
    msg: "get /"
  };
  console.log("get /");
  next();
});

router.get("/api", (ctx, next) => {
  console.log(ctx);
  ctx.body = {
    code: 0,
    msg: "get /api"
  };
  console.log("get /api");
  next();
});

module.exports = router;
