<template>
  <section class="question-create height-100-percent">
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
    <div ref="scroll"
         class="question-content height-100-percent">
      <div class="questionnaire-title">
        <div>问卷标题</div>
        <el-input class="el-input"
                  v-model="title"></el-input>
      </div>
      <div class="questions-wrap">
        <div>
          <div v-for="(question, index) in storeQuestions"
               :key="index"
               :id="'anchor'+index">
            <div class="questions">
              <div class="question-title">{{ question.type === 'single' ? '单选题' : '多选题' }}</div>
              <!-- 题目 -->
              <div class="question-title">
                <span>题目{{ index + 1 }}</span>
                <el-input class="el-input"
                          v-model="question.title"></el-input>

              </div>
              <!-- 选项 -->
              <div class="question-title">
                <span>选项</span>
                <div>
                  <div class="options"
                       v-for="(option, idx) in question.options"
                       :key="idx">
                    <el-input class="el-input"
                              v-model="option.title"
                              :placeholder="'选项' + (idx+1)"></el-input>
                    <img src="../../assets/icons/del.png"
                         alt="del"
                         @click="deleteOption(index, idx)">
                  </div>
                  <el-button class="option-add-btn"
                             @click="addOption(index)">增加选项</el-button>
                </div>
              </div>
              <!-- 按键 -->
              <div class="btn-wrap">
                <el-button type="danger"
                           @click="deleteQuestion(index)">删除</el-button>
                <el-button type="primary"
                           @click="setOptionToLocal">确定</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="submit-btn">
          <el-button type="warning"
                     round
                     @click="clear">清空</el-button>
          <el-button type="success"
                     round
                     @click="save">保存</el-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    storeQuestions: Array,
    storeTitle: String,
  },
  data() {
    return {
      title: '',
      questions: [],
    }
  },
  created() {
    /**
     * 指针直接复制，导致修改 this.question时，数据直接更新到 prop 的数据上，传递到父组件
     * 实际上，vue不同于微信小程序，vue可以直接修改props，使数据同步到父组件; 小程序则不能这样操作数据流
     * 此组件，可以优化成直接使用props在页面中修改
     */
    this.questions = this.$props.storeQuestions
    this.title = this.$props.storeTitle
  },
  mounted() {},
  methods: {
    addChoiceQuestion(type) {
      const index = this.questions.length
      /**
       * created时
       * 指针直接复制，导致修改 this.question时，数据直接更新到 prop 的数据上，传递到父组件
       */
      this.questions.push({
        type,
        title: '',
        index,
        options: [{ title: '', index: 0 }],
        checked: type === 'multi' ? [] : false,
      })
      this.$nextTick(() => {
        const anchor = document.querySelector('#anchor' + index)
        this.$refs.scroll.scrollTop = anchor.offsetTop
      })
    },
    addOption(questionIndex) {
      const options = this.questions[questionIndex].options || []
      options.push({ title: '', index: parseInt(options.length) })
    },
    async deleteOption(questionIndex, optionIndex) {
      const options = this.questions[questionIndex].options
      const optionId = options[optionIndex].optionId
      if (optionId) {
        const { code, data } = await this.$service.deleteOption(optionId)
        if (code !== 1 || !data) return
      }
      this.$delete(options, optionIndex)
    },
    async deleteQuestion(questionIndex) {
      const questions = this.questions
      const questionId = questions[questionIndex].questionId
      if (questionId) {
        const { code, data } = await this.$service.deleteQuestion(questionId)
        if (code !== 1 || !data) return
      }
      this.$delete(questions, questionIndex)
    },
    setOptionToLocal() {
      this.$util.setStorage('store_questions', this.questions)
    },
    async clear() {
      const deleteArray = []
      this.questions.forEach(question => {
        const { questionId } = question
        if (questionId)
          deleteArray.push(this.$service.deleteQuestion(questionId))
      })
      if (deleteArray.length > 0) {
        const result = await Promise.all(deleteArray)
      }
      this.$util.setStorage('store_questions', null)
      this.questions = []
      this.title = ''
    },
    save() {
      const { questions, title } = this
      // 保存数据至本地 ------------------------<
      this.$util.setStorage('store_questions', this.questions)
      this.$util.setStorage('store_questionnaire_title', this.title)
      // ---------------------------------------------<
      const { uid } = this.$util.getLoginInfo()
      if (!title) {
        this.$message.error('标题不可为空')
        return
      }
      if (questions.length < 1) {
        this.$message.error('至少添加一道题')
        return
      }
      const jsonBody = {
        questions,
        title,
        uid,
      }
      this.$emit('save', jsonBody)
    },
  },
  watch: {
    questions() {
      if (this.questions.length > 0) {
        this.$util.setStorage('store_questions', this.questions)
      }
    },
    title() {
      this.$util.setStorage('store_questionnaire_title', this.title)
    },
  },
}
</script>

<style scoped>
.questionnaire-title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 30px 0 20px;
  width: 50%;
}
.questionnaire-title > div {
  flex-shrink: 0;
  margin-right: 20px;
}
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
  position: relative;
  margin: 0 auto;
  padding-bottom: 100px;
  width: 90%;
  min-height: 95vh;
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
  justify-content: center;
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
/* .el-input {
  margin-bottom: 10px;
} */
.options {
  position: relative;
  display: flex;
  align-items: center;
}
.options > img {
  position: absolute;
  top: 50%;
  right: -30px;
  transform: translate(0, -50%);
  width: 20px;
  height: 20px;
}
.options + .options {
  margin-top: 5px;
}
.option-add-btn {
  width: 100%;
  margin-top: 10px;
  background: #f2f2f2;
}
.btn-wrap {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.submit-btn {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translate(-50%, 0);

  display: flex;
  align-items: center;
}
.submit-btn > button {
  width: 150px;
}
</style>