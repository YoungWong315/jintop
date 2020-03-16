<template>
  <section class="container">
    <div>
      <div class="input-wrap">
        <el-input placeholder="用户名/手机号"
                  v-model="username"
                  clearable
                  autofocus></el-input>
      </div>
      <div class="input-wrap">
        <el-input placeholder="密码"
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
    async login() {
      const { username, psd } = this
      const { code, data, err } = await this.$service.login({ username, psd })
      if (code === 1) {
        this.$util.login(data)
        this.$emit('login', true)
      } else {
        this.$emit('login', false)
        this.$message.error(err.errMsg)
      }
    },
    async register() {
      console.log('register')
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
