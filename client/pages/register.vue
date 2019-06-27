<template>
  <section class="container">
    <div class="form-container">
      <el-input
        type="text"
        placeholder="用户名"
        v-model="username"
        clearable
        autofocus
        minlength="14"
        maxlength="16"
      ></el-input>
      <el-input type="text" placeholder="密码" v-model="password" clearable show-password></el-input>
      <el-input type="text" placeholder="手机号" v-model="phone" clearable></el-input>
      <el-button type="primary" @click="submit">立即注册</el-button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      phone: ""
    };
  },
  layout: "default",
  mounted() {},
  methods: {
    async submit() {
      const { username, password, phone } = this;
      const valiArr = [
        {
          requirement: "username",
          key: "username",
          value: username
        },
        {
          requirement: "password",
          key: "password",
          value: password
        },
        {
          requirement: "phone",
          key: "phone",
          value: phone
        }
      ];
      try {
        // 如果reject，会进入catch
        const { result } = await this.$validateAll(valiArr);
        if (result) {
          const {
            data: { token }
          } = await this.$service.register({ username, password, phone });
          console.log(token);
          localStorage.setItem("token", token);
        }
      } catch (e) {
        console.log(e);
      }
    }
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
.form-container {
  width: 400px;
}
.el-input {
  margin-bottom: 10px;
}
.el-button {
  width: 100%;
}
</style>