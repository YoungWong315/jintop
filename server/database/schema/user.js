const User = require("../model/user");
const uuidv1 = require('uuid/v1');

const register = async userData => {
  const { username, password, phone } = userData;

  return User.create({
    uid: uuidv1(),
    username,
    password,
    phone,
    role: 'default'
  });
};

const registerAdmin = async userData => {
  const { username, password, phone } = userData;
  return User.create({
    uid: uuidv1(),
    username,
    password,
    phone,
    role: 'admin'
  });
}

const findByUsername = async username => {
  return User.findOne({ where: { username: username } });
};

const findByUId = async uId => {
  return User.findOne({ where: { uid: uId } });
};

const findAllUser = async () => {
  return User.findAll();
};

module.exports = {
  register,
  registerAdmin,
  findByUsername,
  findByUId,
  findAllUser,
};
