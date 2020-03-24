<template>
  <section>
    <div class="myquestions">
      <el-row :gutter="12">
        <el-col v-for="(item, index) in questionnaires"
                :key="index"
                :span="8">
          <div @click="navigate(item.questionnaireId)">
            <el-card shadow="hover"
                     class="myquestion-cell">
              {{ item.title }}
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </section>
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
      if (code === 1) {
        console.log(data)
        this.questionnaires = data
      }
    },
    navigate(questionnaireId) {
      this.$router.push({
        path: '/question/detail',
        query: { questionnaireid: questionnaireId },
      })
    },
  },
}
</script>

<style scoped>
.myquestions {
  width: 1000px;
  padding-top: 50px;
}
.myquestion-cell {
  margin-bottom: 10px;
  width: 100%;
  height: 100px;
  background: #f9f9f9;
  box-sizing: border-box;
  border-radius: 5;
}
</style>


