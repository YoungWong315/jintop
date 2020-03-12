const uuidv1 = require('uuid/v1')

class UserSchema {
  constructor(model) {
    this.model = model
  }

  register (userData) {
    const { username, password, phone } = userData

    return this.model.create({
      uid: uuidv1(),
      username,
      password,
      phone,
      role: 'default',
    })
  }
  registerAdmin (userData) {
    const { username, password, phone } = userData
    return this.model.create({
      uid: uuidv1(),
      username,
      password,
      phone,
      role: 'admin',
    })
  }
  findByUsername (username) {
    return this.model.findOne({ where: { username: username } })
  }
  findByUid (uid) {
    return this.model.findOne({ where: { uid: uid } })
  }
  findAllUser () {
    return this.model.findAll()
  }
  async checkUsernameExist (username) {
    return !!(await this.findByUsername(username))
  }
}

module.exports = UserSchema
