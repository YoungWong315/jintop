<template>
  <section class="readdir-wrap">
    <div>
      <el-input placeholder="本地目录的绝对路径" v-model.trim="path" clearable>
      </el-input>
      <el-button class="submit-btn" @click="submit" type="primary"
        >确定</el-button
      >
    </div>
    <ul v-if="filePaths.length > 0">
      <li v-for="(item, index) in filePaths" :key="index">{{ item }}</li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      path: '',
      filePaths: [],
    }
  },
  mounted() {
    const readdirPath = this.$util.getStorage('readdirPath')
    if (readdirPath) {
      this.path = readdirPath
    }
  },
  methods: {
    async submit() {
      const path = this.path
      this.$util.setStorage('readdirPath', path)

      if (!path) {
        this.$message('请输入本地目录的绝对路径')
        return
      }

      const { code, data, err } = await this.$service.submitPath({ path })
      if (code === 1) {
        this.filePaths = data
        return
      }
      if (code === 0) {
        this.$message(err.errMsg)
      }
    },
  },
  watch: {},
}
</script>

<style>
@import '../../assets/css/reset';

.readdir-wrap {
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
}
.submit-btn {
  margin-top: 10px;
  width: 100%;
}
.readdir-wrap > ul {
  padding: 20px;
  font-size: 14px;
  line-height: 1.5;
  max-height: 100vh;
  overflow: auto;
  box-sizing: border-box;
}
</style>
