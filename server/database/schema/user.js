const uuidv1 = require('uuid/v1')

class UserSchema {
  constructor(model) {
    this.model = model
  }

  async register(userData) {
    const { username, password, phone } = userData

    return this.model.create({
      uid: uuidv1(),
      username,
      password,
      phone,
      role: 'default',
    })
  }
  async registerAdmin(userData) {
    const { username, password, phone } = userData
    return this.model.create({
      uid: uuidv1(),
      username,
      password,
      phone,
      role: 'admin',
    })
  }
  async findByUsername(username) {
    return this.model.findOne({ where: { username: username } })
  }
  async findByUid(uid) {
    return this.model.findOne({ where: { uid: uid } })
  }
  async findAllUser() {
    return this.model.findAll()
  }
  async checkUsernameExist(username) {
    return !!(await this.findByUsername(username))
  }
}

module.exports = UserSchema
