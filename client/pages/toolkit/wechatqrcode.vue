<template>
  <section class="wechatqrcode-wrap">
    <div class="param-wrap">
      <div>
        <el-input
          placeholder="请输入目录的绝对路径"
          v-model="form.path"
          clearable
        >
        </el-input>
        <el-input placeholder="appId" v-model="form.appId" clearable>
        </el-input>
        <el-input placeholder="appSecrct" v-model="form.appSecret" clearable>
        </el-input>
        <el-input
          placeholder="请输入小程序页面page"
          v-model="form.page"
          clearable
        >
        </el-input>
      </div>
      <div>
        <el-input
          placeholder="多个channel用英文分号分隔"
          type="textarea"
          v-model.trim="form.channels"
        ></el-input>
      </div>
    </div>
    <el-button class="submit-btn" @click="submit" type="primary"
      >确定</el-button
    >
  </section>
</template>

<script>
export default {
  data() {
    return {
      form: {
        path: '',
        appId: '',
        appSecret: '',
        page: '',
        channels: '',
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
      formData.channels = formData.channels
        .split(';')
        .filter(item => item != '')
      const result = await this.$service.getWxaCodeUnlimit(formData)
      console.log(result)
    },
  },
  watch: {},
}
</script>

<style>
@import '../../assets/css/reset';

.wechatqrcode-wrap {
  height: 100vh;
  width: 60%;
  margin: 30vh auto 0;
}
.submit-btn {
  margin-top: 10px;
  width: 100%;
}
.param-wrap {
  display: flex;
  align-items: stretch;
}
.param-wrap input {
  margin-bottom: 10px;
}
.param-wrap textarea {
  margin-left: 20px;
  width: 350px;
  height: 190px !important;
}
</style>
