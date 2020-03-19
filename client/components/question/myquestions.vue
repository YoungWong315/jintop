<template>
  <section>我的问卷</section>
</template>

<script>
export default {
  data() {
    return {
      questionnaires: [],
    }
  },
  mounted() {
    this.queryQuestionnaireList()
  },
  methods: {
    async queryQuestionnaireList() {
      const { uid } = this.$util.getLoginInfo()
      const { code, data } = await this.$service.queryQuestionnaireByUid(uid)
      console.log(code, data)
    },
  },
}
</script>

<style scoped>
</style>


