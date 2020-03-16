<template>
  <section class="question-create">
    <div class="question-options height-100-percent">
      <div class="question-type">
        <el-button type="info"
                   @click="addChoiceQuestion('single')">单选题</el-button>
      </div>
      <div class="question-type">
        <el-button type="info"
                   @click="addChoiceQuestion('multi')">多选题</el-button>
      </div>
    </div>
    <div class="question-content height-100-percent">
      <div class="questions-wrap">
        <div>
          <div v-for="(question, index) in questions"
               :key="index">
            <!-- 单选题 -->
            <div class="questions">
              <!-- 题目 -->
              <div class="question-title">
                <span>题目{{ index + 1 }}</span>
                <el-input class="el-input"
                          v-model="question.label"></el-input>

              </div>
              <!-- 选项 -->
              <div class="question-title">
                <span>选项</span>
                <div>
                  <div class="options"
                       v-for="(option, idx) in question.options"
                       :key="idx">
                    <el-input class="el-input"
                              v-model="option.label"
                              placeholder="选项"></el-input>
                  </div>
                  <el-button class="option-add-btn"
                             @click="addOption(index)">增加选项</el-button>
                </div>
              </div>
              <!-- 按键 -->
              <div class="btn-wrap">
                <el-button type="warning"
                           @click="deleteQuestion(index)">删除</el-button>
                <el-button type="primary"
                           @click="setOptionToLocal">确定</el-button>
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
  created() {
    this.questions = this.$util.getStorage('store_questions') || []
  },
  methods: {
    addChoiceQuestion(type) {
      this.questions.push({
        type,
        label: '',
        options: [{ label: '' }],
      })
    },
    addOption(questionIndex) {
      this.questions[questionIndex].options.push({ label: '' })
    },
    deleteQuestion(questionIndex) {
      this.questions.splice(questionIndex, 1)
    },
    setOptionToLocal() {
      this.$util.setStorage('store_questions', this.questions)
    },
  },
  watch: {
    questions() {
      if (this.questions.length > 0) {
        this.$util.setStorage('store_questions', this.questions)
      }
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
.question-title {
  display: flex;
  margin-bottom: 10px;
}
.question-title > * {
  flex-grow: 1;
}
.question-title > span {
  margin-right: 20px;
  flex: 0 0 auto;
  width: 50px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.el-input {
  margin-bottom: 10px;
}
.options {
  display: flex;
  align-items: center;
}
.option-add-btn {
  width: 100%;
  margin-top: 5px;
  background: #f2f2f2;
}
.btn-wrap {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>