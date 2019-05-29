<template>
  <section id="index">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" class="index-register">
        <nuxt-link :to="{name: 'register'}">注册</nuxt-link>
      </el-menu-item>
      <el-menu-item index="4" class="index-login">
        <nuxt-link :to="{name: 'login'}">登录</nuxt-link>
      </el-menu-item>
    </el-menu>
  </section>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1"
    };
  },
  created() {
    this.findAllUser();
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    async findAllUser() {
      console.log("findAllUser");
      const result = await this.$service.findAllUser();
      console.log(result);
    }
  }
};
</script>

<style>
.index-login,
.index-register {
  float: right !important;
}
.index-login a,
.index-register a {
  text-decoration: none !important;
}
</style>