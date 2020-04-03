<template>
  <section class="questionnaire-wrap">
    <div class="questionnaire-preview">
      <div class="btn-modify">
        <el-button type="danger"
                   @click="() => {this.previewFlag = !this.previewFlag}">{{ previewFlag ? '修改' : '放弃' }}</el-button>
      </div>
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
        console.log(data)
        this.questionnaire = data
      }
    },
    // 保存修改
    async onSave(jsonBody) {
      jsonBody.questionnaireId = this.questionnaire.questionnaireId
      const result = await this.$service.modifyQuestionnaire(jsonBody)
      console.log(result)
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
  top: 0;
  left: -100px;
}
.btn-modify > button {
  width: 100px;
}
</style>