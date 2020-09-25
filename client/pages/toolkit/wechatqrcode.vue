<template>
  <section class="wechatqrcode-wrap">
    <div class="title">生成小程序码(1664定制)</div>
    <div>
      <div class="param-wrap">
        <div>
          <el-input placeholder="appId"
                    v-model="form.appId"
                    clearable>
          </el-input>
          <el-input placeholder="appSecrct"
                    v-model="form.appSecret"
                    clearable>
          </el-input>
          <el-input placeholder="小程序页面page"
                    v-model="form.page"
                    clearable>
          </el-input>
          <el-input placeholder="参数前缀（例如: 1664-）"
                    v-model="form.prefix"
                    clearable>
          </el-input>
          <el-input placeholder="本地目录的绝对路径"
                    v-model="form.path"
                    clearable>
          </el-input>
        </div>
        <div>
          <el-input placeholder="scene参数, 批量生成用回车分隔"
                    type="textarea"
                    v-model="form.scenes"></el-input>
        </div>
      </div>
      <el-button class="submit-btn"
                 @click="submit"
                 type="primary">确定</el-button>
    </div>
  </section>
</template>

<script>
import { Loading } from 'element-ui';

export default {
  data() {
    return {
      form: {
        appId: '',
        appSecret: '',
        page: '',
        path: '',
        scenes: '',
        prefix: ''
      }
    };
  },
  mounted() {
    const formData = this.$util.getStorage('formData');
    if (formData) {
      this.form = formData;
    }
  },
  methods: {
    async submit() {
      let formData = Object.assign({}, this.form);
      this.$util.setStorage('formData', formData);

      if (!formData.appId) {
        this.$message({
          type: 'warning',
          message: '需要输入小程序appId'
        });
        return;
      }
      if (!formData.appSecret) {
        this.$message({
          type: 'warning',
          message: '需要输入小程序appSecret'
        });
        return;
      }
      if (!formData.appSecret) {
        this.$message({
          type: 'warning',
          message: '需要输入小程序appSecret'
        });
        return;
      }
      if (!formData.path) {
        this.$message({
          type: 'warning',
          message: '需要输入本地目录的绝对路径'
        });
        return;
      }

      if (Object.keys(formData)) {
        formData.scenes = formData.scenes
          .replace(/[\f\t\v]/g, '') //匹配空白字符
          .split(/[\r\n]/)
          .filter(item => item != '')
          .map(item => `channel=${formData.prefix}${item}`);

        const loadingIns = Loading.service({ fullscreen: true });
        const result = await this.$service.getWxaCodeLimit(formData);
        loadingIns.close();
        console.log(result);
        if (result.code === 1) {
          this.$message({
            message: `请在${formData.path}下查看`,
            type: 'success'
          });
          return;
        }
        if (result.code === 0) {
          this.$message.error(result.err.errMsg);
        }
      }
    }
  },
  watch: {}
};
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
  height: 240px !important;
}
</style>
