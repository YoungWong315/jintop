<template>
  <section class="questionnaire-wrap">
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
  },
}
</script>

<style scoped>
.questionnaire-wrap {
  background: #e6e6e6;
}
.questionnaire-preview {
  margin: 0 auto;
  padding: 30px;
  width: 800px;
  height: 100vh;
  box-sizing: border-box;
  background: #fff;
  overflow-y: scroll;
}
</style>