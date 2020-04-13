<template>
  <section class="preview-wrap">
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
                    :label="option.title"></el-radio>
        </el-radio-group>
        <el-checkbox-group v-if="question.type === 'multi'"
                           v-model="question.checked">
          <el-checkbox v-for="(option, idx) in question.options"
                       :key="idx"
                       :label="option.title"></el-checkbox>
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
</style>