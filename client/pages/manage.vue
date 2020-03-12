<template>
  <section id="index">
    <el-menu :default-active="activeIndex"
             class="el-menu-demo"
             mode="horizontal"
             @select="handleSelect"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <el-menu-item index="1">用户管理</el-menu-item>
    </el-menu>

    <div>
      <div>{{ project }}</div>
    </div>
    <!-- 
      1. 需要一个删除，修改用户角色，搜索
      2. 登录名唯一
     -->
    <!-- 内容容器 -->
    <table class="table">
      <thead>
        <tr>
          <td>index</td>
          <td>uid</td>
          <td>username</td>
          <td>password</td>
          <td>phone</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in userList"
            :key="index">
          <td>{{ index + 1 }}</td>
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
      userList: [],
    }
  },
  created() {
    this.findAllUser()
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key
    },
    async findAllUser() {
      const { code, data } = await this.$service.findAllUser(0, 10)
      if (code === 1) {
        this.userList = data
      }
    },
  },
}
</script>

<style scoped>
td {
  padding: 10px 20px;
  border: 1px solid #333;
  text-align: center;
}
</style>