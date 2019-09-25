<template>
  <section id="index">
    <el-menu :default-active="activeIndex"
             class="el-menu-demo"
             mode="horizontal"
             @select="handleSelect"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">用户列表</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3"
                    class="index-register">
        <nuxt-link :to="{name: 'login-register'}">注册</nuxt-link>
      </el-menu-item>
      <el-menu-item index="4"
                    class="index-login">
        <nuxt-link :to="{name: 'login-login'}">登录</nuxt-link>
      </el-menu-item>
    </el-menu>

    <div>
      <div>{{ project }}</div>
    </div>
    <!-- 
      1. 需要一个删除，修改用户角色，搜索
      2. 登录名唯一
     -->
    <!-- 内容容器 -->
    <table>
      <thead>
        <tr>
          <td>id</td>
          <td>uid</td>
          <td>username</td>
          <td>password</td>
          <td>phone</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in userList"
            :key="index">
          <td>{{ item.id }}</td>
          <td>{{ item.uid }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.password }}</td>
          <td>{{ item.phone }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  asyncData(ctx) {
    return { project: 'asyncData project' }
  },
  data() {
    return {
      activeIndex: '1',
      userList: []
    }
  },
  created() {
    this.findAllUser()
    // console.log(this.$crypto);
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    async findAllUser() {
      const result = await this.$service.findAllUser(0, 10)
      const { code, data } = result

      if (code === 1) {
        this.userList = data
      }
    }
  }
}
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