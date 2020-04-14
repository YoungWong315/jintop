<template>
  <section class="examine-wrap">
    <div class="questionnaire-title">{{ questionnaire.title }}</div>
    <div v-for="(question, index) in questionnaire.questions"
         :key="index"
         class="questions">
      <div class="question-title">{{ index+1 }}. {{ question.title }}</div>
      <div class="options">
        <el-radio-group v-if="question.type === 'single'"
                        v-model="question.checked">
          <el-radio v-for="(option, idx) in question.options"
                    :key="idx"
                    class="el-component"
                    :label="option.title"></el-radio>
        </el-radio-group>
        <el-checkbox-group v-if="question.type === 'multi'"
                           v-model="question.checked">
          <el-checkbox v-for="(option, idx) in question.options"
                       :key="idx"
                       class="el-component"
                       :label="option.title"></el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="btn-wrap">
      <el-button type="success"
                 round
                 @click="submit">提交</el-button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      radio: 0,
      questionnaire: {},
    }
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
    // 提交问卷
    async submit() {
      const { uid = '' } = this.$util.getLoginInfo()
      const { code, data } = await this.$service.submitQuestionnaire(
        uid,
        this.questionnaire,
      )
      if (code === 1 && data) {
        this.$message.success('提交成功')
        setTimeout(
          () =>
            this.$router.push({
              path: '/question/question',
              query: { index: 1 },
            }),
          500,
        )
      }
    },
  },
}
</script>

<style scoped>
.examine-wrap {
  position: relative;
  margin: 0 auto;
  padding-top: 0.1px;
  width: 90%;
  min-height: 100vh;
}
.questionnaire-title {
  margin: 20px auto;
  font-size: 25px;
  text-align: center;
}
.questions {
  margin-bottom: 10px;
}
.question-title {
  margin-bottom: 10px;
  font-size: 16px;
}
.el-component {
  margin-bottom: 10px;
}
.btn-wrap {
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.btn-wrap > button {
  width: 150px;
}
</style>