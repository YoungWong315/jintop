<template>
  <section>
    <Create :store-questions="questions"
            :store-title="title" />
  </section>
</template>

<script>
import Create from '~/components/question/create'

export default {
  data() {
    return {
      questions: [],
      title: '',
    }
  },
  components: {
    Create,
  },
  created() {
    setTimeout(() => (this.loading = false), 200)
  },
  mounted() {
    // 获取问卷id
    const questionnaireId = this.$route.query.questionnaireid
    console.log(questionnaireId)
    // 子组件数据
    this.questions = this.$util.getStorage('store_questions') || []
    this.title = this.$util.getStorage('store_questionnaire_title') || ''
  },
  methods: {},
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