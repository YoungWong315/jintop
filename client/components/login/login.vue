<template>
  <section class="container">
    <div>
      <div class="input-wrap">
        <el-input placeholder="用户名(2到16位,字母,数字,汉字，下划线,减号)"
                  v-model="username"
                  clearable
                  autofocus></el-input>
      </div>
      <div class="input-wrap">
        <el-input placeholder="密码(6~18位英文或数字组合)"
                  v-model="psd"
                  clearable
                  show-password></el-input>
      </div>
      <div class="flex-wrap">
        <!-- <nuxt-link :to="{path: '/login/register'}">
          <el-button type="text">忘记密码?</el-button>
        </nuxt-link> -->
        <!-- <nuxt-link :to="{path: '/login/register'}">
          <el-button type="text">立即注册</el-button>
        </nuxt-link> -->
      </div>
      <div class="login-btn">
        <el-button type="success"
                   @click="login">登录</el-button>
      </div>
      <div class="register-btn">
        <el-button @click="register">立即注册</el-button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      psd: '',
    }
  },
  layout: 'default',
  components: {},
  mounted() {},
  methods: {
    emitLogin(loginData) {
      this.$util.login(loginData)
      this.$emit('login', loginData)
    },
    async login() {
      const { username, psd } = this
      const { code, data, err } = await this.$service.login({ username, psd })
      if (code === 1) {
        this.emitLogin(data)
      } else {
        this.$emit('login', false)
        this.$message.error(err.errMsg)
      }
    },
    async register() {
      const { username, psd } = this
      const valiArr = [
        {
          requirement: 'username',
          key: 'username',
          value: username,
        },
        {
          requirement: 'password',
          key: 'password',
          value: psd,
        },
      ]
      try {
        const { result } = await this.$util.getValidator().validateAll(valiArr)
        if (result) {
          const registerData = { username, psd }
          const { code, data, err } = await this.$service.register(registerData)
          if (code === 1) {
            this.$message.success(`注册成功`)
            this.emitLogin(data)
          } else {
            this.$message.error(err.errMsg)
          }
        }
      } catch (e) {
        console.log(e)
        const { result, errKey } = e
        if (!result) {
          errKey.forEach(key => this.$message.error(`${key}格式有误`))
        }
      }
    },
  },
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.el-button--text {
  color: #c0c4cc;
}
.flex-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.input-wrap {
  width: 350px;
  margin-bottom: 10px;
}
.login-btn {
  margin: 20px auto 10px;
}
.login-btn > button,
.register-btn > button {
  display: block;
  width: 100%;
}
</style>
