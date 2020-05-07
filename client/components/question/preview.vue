<template>
  <section class="preview-wrap">
    <div class="questionnaire-title">{{ questionnaire.title }}</div>
    <div v-for="(question, index) in questionnaire.questions"
         :key="index"
         class="questions">
      <div class="question-title">{{ index+1 }}. {{ question.title }} (参与人数：{{ question.participantNumber }}人)</div>
      <div class="options">
        <el-radio-group v-if="question.type === 'single'"
                        v-model="question.checked">
          <div v-for="(option, idx) in question.options"
               :key="idx"
               class="option-wrap">
            <el-radio :label="option.title"></el-radio>

            <div class="percent">人数：{{ option.optionNumber }} &nbsp;&nbsp; 占比：{{ option.percent ? option.percent.toFixed(2)*100 : 0 }}%</div>
          </div>
        </el-radio-group>
        <el-checkbox-group v-if="question.type === 'multi'"
                           v-model="question.checked">
          <div v-for="(option, idx) in question.options"
               :key="idx"
               class="option-wrap">
            <el-checkbox :label="option.title"></el-checkbox>
            <div class="percent">人数：{{ option.optionNumber }} &nbsp;&nbsp; 占比：{{ option.percent ? option.percent.toFixed(2)*100 : 0 }}%</div>
          </div>
        </el-checkbox-group>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      radio: 0,
    }
  },
  props: {
    questionnaire: Object,
  },
  mounted() {},
  methods: {
    modify() {
      this.$emit('modify')
    },
  },
}
</script>

<style scoped>
.questionnaire-title {
  margin-bottom: 20px;
  font-size: 30px;
  text-align: center;
}
.questions {
  margin-bottom: 20px;
}
.question-title {
  margin-bottom: 10px;
  font-size: 16px;
}
.preview-wrap {
  padding: 30px 0;
}
.option-wrap {
  display: flex;
  margin-bottom: 10px;
}
.percent {
  /* width: 100px; */
  font-size: 16px;
  color: #d63447;
}
</style>