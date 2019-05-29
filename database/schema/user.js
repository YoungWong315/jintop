const User = require("../model/user");

const register = async userData => {
  await User.sync();

  const { username, password, phone } = userData;
  const role = "default";
  return User.create({
    username,
    password,
    phone,
    role
  });
};

const findByUsername = async username => {
  return User.findOne({ where: { username: username } });
};

const findByUserId = async userId => {
  return User.findOne({ where: { id: userId } });
};

const findAllUser = async () => {
  return User.findAll();
};

module.exports = {
  register,
  findByUsername,
  findByUserId,
  findAllUser
};
