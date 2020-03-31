<template>
  <section>
    <div class="myquestions">
      <el-row :gutter="12">
        <el-col v-for="(item, index) in questionnaires"
                :key="index"
                :span="8">
          <div class="card-wrap"
               @click="navigate(item.questionnaireId)">
            <el-card shadow="hover"
                     class="myquestion-cell">
              {{ item.title }}
            </el-card>
            <img src="../../assets/icons/del.png"
                 @click.stop="deleteQuestion(index)"
                 alt="del">
          </div>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    questionnaires: Array,
  },
  methods: {
    async deleteQuestion(questionnaireIndex) {
      const questionnaire = this.questionnaires
      // 删除问卷
      const { code, data } = await this.$service.deleteQuestionnaire(
        questionnaire[questionnaireIndex].questionnaireId,
      )
      if (code === 1) {
        this.$delete(questionnaire, questionnaireIndex)
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
.card-wrap {
  position: relative;
}
.card-wrap > img {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
}
</style>
