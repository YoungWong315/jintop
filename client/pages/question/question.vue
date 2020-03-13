<template>
  <section v-if="!loading">
    <div class="login-wrap"
         v-if="!login">
      <login @login="loginCb" />
    </div>
    <!-- class="content-wrap" -->
    <div v-else>
      <el-menu :default-active="activeIndex"
               class="el-menu"
               mode="horizontal"
               @select="handleSelect">
        <!-- li高度 60px -->
        <el-menu-item index="1">创建问卷</el-menu-item>
        <el-menu-item index="2">我的问卷</el-menu-item>
        <el-menu-item index="3"
                      class="section-logout">
          <div>{{ userInfo.username }}</div>
          <div class="line-vertical"></div>
          <div @click="logout">退出</div>
        </el-menu-item>
      </el-menu>
      <!-- el-menu显示内容 -->
      <div class="el-menu-content"
           v-show="activeIndex === '1'">
        <Create />
      </div>
      <div class="el-menu-content"
           v-show="activeIndex === '2'">
        <MyQuestions />
      </div>
    </div>
  </section>
  <section class="loading-wrap"
           v-else>
    <LensLoading />
  </section>
</template>

<script>
import Login from '~/components/login/login'
import Create from '~/components/question/create'
import MyQuestions from '~/components/question/myquestions'
import LensLoading from '~/components/loading/lens'

export default {
  data() {
    return {
      loading: true,
      login: false,
      activeIndex: '1',
      userInfo: null,
    }
  },
  components: {
    Login,
    Create,
    MyQuestions,
    LensLoading,
  },
  created() {
    setTimeout(() => (this.loading = false), 200)
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

.loading-wrap,
.login-wrap {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;
}
/* .content-wrap {
  display: flex;
  flex-direction: column;

  min-height: 100vh;
} */
.el-menu {
  width: 100%;
  border-left: 200px solid transparent;
  border-right: 200px solid transparent;
  box-sizing: border-box;
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
.el-menu-content {
  position: fixed;
  top: 60px;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;

  /* 撑满剩余空间 */
  /* flex-grow: 1; */
}
</style>