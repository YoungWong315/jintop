<template>
  <!-- <section class="wrap">
    <div class="content">
      <nuxt-link :to="{path: '/toolkit/csstoolkit'}">css toolkit</nuxt-link>
      <nuxt-link :to="{path: '/question/question'}">问卷调查</nuxt-link>
    </div>
    <div class="beian">
      <a href="http://beian.miit.gov.cn"
         target="blank">沪ICP备19009188号-1</a>
    </div>
  </section> -->
  <b-container class="bv-example-row">
    <b-row>
      <b-col>1 of 3</b-col>
      <b-col>2 of 3</b-col>
      <b-col>3 of 3</b-col>
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
@import '../assets/css/reset';

.wrap {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;
}
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  width: 80vw;
  height: 80vh;
  /* border: 1px solid lightblue; */
  border-radius: 5px;
}
.content a {
  margin-right: 30px;
  font-size: 18px;
  color: #1989fa;
}
.beian {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, 0);

  margin-top: 30px;
  text-align: center;
  color: #898989;
  font-size: 12px;
}
.beian a:link,
.beian a:visited {
  color: #898989;
}
</style>