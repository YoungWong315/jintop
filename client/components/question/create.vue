<template>
  <section class="question-create">
    <div class="question-options height-100-percent">
      <div class="question-type">
        <el-button type="info"
                   @click="addSingleChoiceQuestion">单选题</el-button>
      </div>
      <div class="question-type">
        <el-button type="info"
                   @click="addMultiChoiceQuestion">多选题</el-button>
      </div>
    </div>
    <div class="question-content height-100-percent">
      <div class="questions-wrap"
           @click="logQuestions">
        <div>
          <div v-for="(question, index) in questions"
               :key="index">
            <div v-if="question.type === 'single'">
              <div class="questions">
                <div>
                  <el-input class="el-input"
                            v-model="question.label"
                            placeholder="题目"></el-input>

                </div>
                <div v-for="(option, idx) in question.options"
                     :key="idx">
                  <el-input class="el-input"
                            v-model="option.label"></el-input>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      questions: [],
    }
  },
  methods: {
    logQuestions() {
      console.log(this.questions)
    },
    addSingleChoiceQuestion() {
      this.questions.push({
        type: 'single',
        label: '',
        options: [{ label: '' }],
      })
    },
    addMultiChoiceQuestion() {
      this.questions.push({ type: 'multi', label: '题目', value: '' })
    },
  },
}
</script>

<style scoped>
.question-create {
  display: flex;
  justify-content: center;
}
.height-100-percent {
  height: 100%;
}
.question-content {
  width: 800px;
  background: #eee;
  overflow: auto;
}
.question-options {
  padding-top: 20px;
  width: 300px;
  border-left: 1px solid #eee;
  box-sizing: border-box;
}
.question-type {
  margin-bottom: 10px;
}
.question-type > button {
  display: block;
  margin: 0 auto;
  width: 200px;
}
.questions-wrap {
  margin: 0 auto;
  width: 90%;
  height: 200vh;
  background: #fff;
}
.questions {
  margin-bottom: 10px;
  padding: 20px 100px;
  background: #f6f6f6;
  border: 1px solid #eee;
}
</style>