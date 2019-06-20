const jwt = require("jsonwebtoken"); // 生成accessToken库
const { register, registerAdmin, findByUsername, findAllUser, findByUid } = require("../../database/schema/user");

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

  router.post("/user/registerAdmin", async ctx => {
    const { data } = ctx.request.body;
    const result = await registerAdmin(data);

    ctx.body = {
      code: 1,
      data: result
    };
  });

  router.post("/user/login", async ctx => {
    const { data } = ctx.request.body;
    const { username, psd } = data;
    const res = await findByUsername(username);

    const { password, uid } = res;
    if (password === psd) {
      const token = jwt.sign({ uid }, "secret", { expiresIn: "1h" });
      data.token = token;
    }

    ctx.body = {
      code: 1,
      data: data
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
    const { page, size } = ctx.query;
    console.log("query: ", page, size);
    const result = await findAllUser();

    ctx.body = {
      code: 1,
      data: result
    };
  });
};

module.exports = user;
