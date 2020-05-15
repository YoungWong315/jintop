<template>
  <b-container fluid>
    <b-row class="b-row-container"
           align-h="center"
           align-v="center">
      <b-col class="b-col"
             cols="4">
        <nuxt-link :to="{path: '/toolkit/csstoolkit'}">css toolkit</nuxt-link>
      </b-col>
      <b-col class="b-col"
             cols="4">
        <nuxt-link :to="{path: '/question/question'}">问卷调查</nuxt-link>
      </b-col>
    </b-row>
    <b-row class="b-row-footer"
           align-h="center"
           align-v="center">
      <a class="beian"
         href="http://beian.miit.gov.cn"
         target="blank">沪ICP备19009188号-1</a>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    console.log('https://wj.qq.com/edit.html')
  },
  methods: {},
}
</script>

<style scoped>
.b-row-container {
  height: 90vh;
}
.b-row-footer {
  height: 10vh;
}
.b-col {
  text-align: center;
}
.beian {
  font-size: 12px;
}
.beian:link,
.beian:visited {
  color: #898989;
}
</style>