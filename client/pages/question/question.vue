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
        <el-menu-item index="1">我的问卷</el-menu-item>
        <el-menu-item index="2">创建问卷</el-menu-item>

        <el-menu-item index="3"
                      class="section-logout">
          <div>{{ userInfo.username }}</div>
          <div class="line-vertical"></div>
          <div @click="logout">退出</div>
        </el-menu-item>
      </el-menu>
      <!-- el-menu显示内容 -->
      <div class="el-menu-content"
           v-show="activeIndex == 1">
        <MyQuestions v-if="questionnaires.length > 0"
                     :questionnaires="questionnaires" />
      </div>
      <div class="el-menu-content"
           v-show="activeIndex == 2">
        <Create :store-questions="questions"
                :store-title="title"
                @save="onSave" />
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
      activeIndex: 1,
      userInfo: null,

      questions: [],
      title: '',
      questionnaires: [],
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
    this.activeIndex = this.$route.query.index || 1

    const loginInfo = this.$util.getLoginInfo()
    this.login = loginInfo.validationCheck
    this.userInfo = loginInfo

    // 初始化子组件数据
    this.initData()
  },
  methods: {
    initData() {
      this.questions = this.$util.getStorage('store_questions') || []
      this.title = this.$util.getStorage('store_questionnaire_title') || ''
      this.activeIndex = this.$util.getStorage('store_active_index') || 1

      this.queryQuestionnaireList()
    },
    async queryQuestionnaireList() {
      const { uid } = this.$util.getLoginInfo()
      const { code, data } = await this.$service.queryQuestionnaireByUid(uid)
      if (code === 1) {
        this.questionnaires = data
      }
    },
    loginCb(e) {
      this.login = e
      this.userInfo = e
      this.initData()
    },
    logout() {
      this.$util.logout()
      this.login = false
      this.activeIndex = '1'
      this.userInfo = null
      this.questions = []
      this.title = ''
      this.questionnaires = []
    },
    handleSelect(key, keyPath) {
      this.activeIndex = key
      this.$util.setStorage('store_active_index', key)
    },
    async onSave(jsonBody) {
      const { code, data } = await this.$service.saveQuestionnaire(jsonBody)
      if (code === 1) {
        this.$message.success('保存成功')
        this.queryQuestionnaireList()
        this.activeIndex = '2'
      }
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