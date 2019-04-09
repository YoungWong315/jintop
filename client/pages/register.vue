<template>
  <section class="container">
    <div>
      <el-input placeholder="用户名" v-model="username" clearable autofocus></el-input>
      <el-input placeholder="密码" v-model="password" clearable show-password></el-input>
      <el-input placeholder="手机号" v-model="phone" clearable show-password></el-input>
    </div>
  </section>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  data() {
    return {
      username: "",
      password: "",
      phone: ""
    };
  },
  layout: "default",
  components: {
    Logo
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.el-button--text {
  color: #c0c4cc;
}
</style>
