<template>
  <section class="questionnaire-wrap">
    <div class="questionnaire-function">
      <el-button type="warning"
                 round
                 @click="modify">修改</el-button>
    </div>
    <div class="questionnaire-preview"
         v-if="questionnaire != null">
      <Preview :questionnaire="questionnaire" />
    </div>
  </section>
</template>

<script>
import Preview from '~/components/question/preview'

export default {
  data() {
    return {
      questionnaire: null,
    }
  },
  components: {
    Preview,
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
    // 修改帖子
    modify() {
      console.log('modify')
    },
  },
}
</script>

<style scoped>
.questionnaire-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e6e6e6;
}
.questionnaire-function {
  width: 300px;
  height: 100vh;
  border-right: 2px solid #e6e6e6;
  background: #fff;
  box-sizing: border-box;
}
.questionnaire-function > button {
  width: 200px;
}
.questionnaire-preview {
  padding: 30px;
  width: 800px;
  height: 100vh;
  box-sizing: border-box;
  background: #fff;
  overflow-y: scroll;
}
</style>