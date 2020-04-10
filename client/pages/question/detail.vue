<template>
  <section class="questionnaire-wrap">
    <div class="btn-modify">
      <el-button type="danger"
                 round
                 @click="() => {this.previewFlag = !this.previewFlag}">{{ this.previewFlag ? '修改' : '返回' }}</el-button>
      <el-button type="success"
                 round
                 @click="publish">获取连接</el-button>
    </div>
    <div class="questionnaire-preview">
      <Preview v-if="previewFlag && questionnaire != null"
               :questionnaire="questionnaire"
               @modify="() => {this.previewFlag = false;}" />
      <Create v-if="!previewFlag"
              :store-questions="questionnaire.questions"
              :store-title="questionnaire.title"
              @save="onSave" />
    </div>
  </section>
</template>

<script>
import Preview from '~/components/question/preview'
import Create from '~/components/question/create'

export default {
  data() {
    return {
      questionnaire: null,
      previewFlag: true,
    }
  },
  components: {
    Preview,
    Create,
  },
  created() {
    setTimeout(() => (this.loading = false), 200)
  },
  mounted() {
    // 获取问卷id
    const questionnaireId = this.$route.query.questionnaireid
    this.queryQuestionnaireDetail(questionnaireId)
  },
  methods: {
    // 获取帖子详情
    async queryQuestionnaireDetail(questionnaireId) {
      const { code, data } = await this.$service.queryQuestionnaireDetail(
        questionnaireId,
      )
      if (code === 1) {
        this.questionnaire = data
      }
    },
    // 保存修改
    async onSave(jsonBody) {
      jsonBody.questionnaireId = this.questionnaire.questionnaireId
      const { code, data } = await this.$service.modifyQuestionnaire(jsonBody)
      if (code === 1 && data) {
        this.previewFlag = true
      }
    },
    // 发布问卷
    publish() {
      this.$router.push({
        path: '/question/examine',
        query: { questionnaireid: this.questionnaire.questionnaireId },
      })
    },
  },
}
</script>

<style scoped>
.questionnaire-wrap {
  display: flex;
  justify-content: center;
  background: #e6e6e6;
}
.questionnaire-function {
  position: fixed;
  left: 100px;
  top: 100px;
}
.questionnaire-function > button {
  display: block;
  margin: 20px auto;
  width: 200px;
}
.questionnaire-preview {
  position: relative;
  padding: 30px 30px 0;
  min-width: 800px;
  height: 100vh;
  box-sizing: border-box;
  background: #fff;
}
.btn-modify {
  position: absolute;
  top: 50px;
  right: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.btn-modify > button {
  width: 150px;
  margin: 0 auto 20px;
}
</style>