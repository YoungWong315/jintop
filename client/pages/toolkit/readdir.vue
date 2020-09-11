<template>
  <section class="readdir-wrap">
    <div>
      <el-input placeholder="请输入目录的绝对路径" v-model="path" clearable>
      </el-input>
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
      path: '',
    }
  },
  mounted() {},
  methods: {
    async submit() {
      const result = await this.$service.submitPath({ path: this.path })
      console.log(result)
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
</style>
