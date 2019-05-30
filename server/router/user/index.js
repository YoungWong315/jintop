const { register, findByUsername, findAllUser } = require("../../../database/schema/user");

const user = {};

user.inject = router => {
  router.post("/user/register", async ctx => {
    const { data } = ctx.request.body;
    const result = await register(data);

    ctx.body = {
      code: 1,
      data: result
    };
  });

  router.get("/user/findByUsername", async ctx => {
    const {
      data: { username }
    } = ctx.request.body;
    const res = await findByUsername(username);

    ctx.body = {
      code: 1,
      data: res
    };
  });

  router.get("/user/findAllUser", async ctx => {
    const result = await findAllUser();

    ctx.body = {
      code: 1,
      data: result
    };
  });
};

module.exports = user;