<template>
  <section class="container">
    <div>
      <el-input placeholder="用户名/手机号"
                v-model="username"
                clearable
                autofocus></el-input>
      <el-input placeholder="密码"
                v-model="psd"
                clearable
                show-password></el-input>
      <div class="flex-wrap">
        <nuxt-link :to="{path: '/login/register'}">
          <el-button type="text">忘记密码?</el-button>
        </nuxt-link>
        <nuxt-link :to="{path: '/login/register'}">
          <el-button type="text">立即注册</el-button>
        </nuxt-link>
      </div>
      <el-button type="success"
                 @click="submit">登录</el-button>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  data() {
    return {
      username: '',
      psd: '',
    }
  },
  layout: 'default',
  components: {
    Logo,
  },
  mounted() {},
  methods: {
    async submit() {
      const { username, psd } = this
      const { code, data, err } = await this.$service.login({ username, psd })
      if (code === 1) {
        localStorage.setItem('token', data.token)
        // console.log(this.$router)
        this.$router.back()
      } else {
        this.$message.error(err.errMsg)
      }
    },
  },
}
</script>

<style>
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
</style>
