<template>
  <section>
    <div class="wrap"
         v-if="!login">
      <login @login="loginCb" />
    </div>
    <div v-else>
      <el-menu :default-active="activeIndex"
               class="el-menu"
               mode="horizontal"
               @select="handleSelect">
        <el-menu-item index="1">创建问卷</el-menu-item>
        <el-menu-item index="2">我的问卷</el-menu-item>
        <el-menu-item index="3">问题反馈</el-menu-item>
        <el-menu-item index="4"
                      class="section-logout">
          <div>{{ userInfo.username }}</div>
          <div class="line-vertical"></div>
          <div @click="logout">退出</div>
        </el-menu-item>
      </el-menu>
    </div>
  </section>
</template>

<script>
import Login from '~/components/login/login'

export default {
  data() {
    return {
      login: false,
      activeIndex: '1',
      userInfo: null,
    }
  },
  components: {
    Login,
  },
  mounted() {
    const loginInfo = this.$util.getLoginInfo()
    this.login = loginInfo.validationCheck
    this.userInfo = loginInfo
  },
  methods: {
    loginCb(e) {
      this.login = e
    },
    logout() {
      this.$util.logout()
      this.login = false
    },
    handleSelect(key, keyPath) {
      this.activeIndex = key
    },
  },
}
</script>

<style scoped>
@import '../../assets/css/reset';

.wrap {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;
}
.el-menu {
  margin: 0 auto;
  border-left: 200px solid transparent;
  border-right: 200px solid transparent;
}
.el-menu-item {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 50px;
}
.section-logout {
  position: absolute;
  right: 0;
}
.line-vertical {
  margin: 0 10px;
  width: 2px;
  height: 15px;
  background: #e6e6e6;
}
</style>