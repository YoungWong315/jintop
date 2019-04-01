const User = require("../model/user");

const create = () => {
  User.sync({ force: true }).then(function() {
    return User.create({
      username: "wy",
      password: "19920315wy",
      phone: "16602152641",
      role: "admin"
    });
  });
};

const find = async () => {
  const res = await User.findOne({ where: { username: "wy" } });
  return res;
};

module.exports = {
  create,
  find
};
