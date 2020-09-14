<template>
  <section class="wechatqrcode-wrap">
    <div class="title">生成小程序码</div>
    <div>
      <div class="param-wrap">
        <div>
          <el-input placeholder="appId" v-model="form.appId" clearable>
          </el-input>
          <el-input placeholder="appSecrct" v-model="form.appSecret" clearable>
          </el-input>
          <el-input placeholder="小程序页面page" v-model="form.page" clearable>
          </el-input>
          <el-input
            placeholder="本地目录的绝对路径"
            v-model="form.path"
            clearable
          >
          </el-input>
        </div>
        <div>
          <el-input
            placeholder="scene参数, 批量生成用英文分号分隔"
            type="textarea"
            v-model="form.scenes"
          ></el-input>
        </div>
      </div>
      <el-button class="submit-btn" @click="submit" type="primary"
        >确定</el-button
      >
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      form: {
        appId: '',
        appSecret: '',
        page: '',
        path: '',
        scenes: '',
      },
    }
  },
  mounted() {
    const formData = this.$util.getStorage('formData')
    if (formData) {
      this.form = formData
    }
  },
  methods: {
    async submit() {
      let formData = Object.assign({}, this.form)
      this.$util.setStorage('formData', formData)

      if (!formData.appId) {
        this.$message('需要输入小程序appId')
        return
      }
      if (!formData.appSecret) {
        this.$message('需要输入小程序appSecret')
        return
      }
      if (!formData.appSecret) {
        this.$message('需要输入小程序appSecret')
        return
      }
      if (!formData.path) {
        this.$message('需要输入本地目录的绝对路径')
        return
      }

      if (Object.keys(formData)) {
        console.log()
        formData.scenes = formData.scenes
          .replace(/\s/g, '') //匹配任何空白字符，包括空格、制表符、换页符等等。等价于 [ \f\n\r\t\v]
          .split(';')
          .filter(item => item != '')
        const result = await this.$service.getWxaCodeUnlimit(formData)
        console.log(result)
        if (result.code === 1) {
          this.$message(`成功，请在 ${formData.path} 目录下查看`)
          return
        }
        if (result.code === 0) {
          this.$message(result.err.errMsg)
        }
      }
    },
  },
  watch: {},
}
</script>

<style>
@import '../../assets/css/reset';

.wechatqrcode-wrap {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.title {
  position: absolute;
  top: 50px;
  left: 50%;
  text-align: center;
  font-size: 20px;
  transform: translate(-50%, 0);
}
.wechatqrcode-wrap > div {
  width: 60%;
}
.submit-btn {
  margin-top: 10px;
  width: 100%;
}
.param-wrap {
  display: flex;
  align-items: stretch;
}
.param-wrap > div {
  flex: 1;
}
.param-wrap > div:last-of-type {
  margin-left: 20px;
}
.param-wrap input {
  margin-bottom: 10px;
}
.param-wrap textarea {
  width: 100%;
  height: 190px !important;
}
</style>
