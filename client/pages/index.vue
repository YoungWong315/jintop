<template>
  <section class="index-wrap">
    <div class="index-links">
      <div>
        <nuxt-link :to="{ path: '/toolkit/csstoolkit' }">css toolkit</nuxt-link>
      </div>
      <!-- <div>
        <nuxt-link :to="{ path: '/toolkit/readdir' }"
          >扫描目录(仅限本地启动)</nuxt-link
        > 
      </div> -->
      <!-- <div>
        <nuxt-link :to="{ path: '/toolkit/wechatqrcode' }"
          >生成小程序码</nuxt-link
        >
      </div> -->
      <div>
        <nuxt-link :to="{ path: '/question/question' }">问卷调查</nuxt-link>
      </div>
    </div>
    <div class="index-bottom">
      <a class="beian" href="http://beian.miit.gov.cn" target="blank">
        沪ICP备19009188号-1
      </a>
    </div>
  </section>
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
.index-wrap {
  height: 100vh;
}
.index-links {
  height: 90vh;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
}
.index-links > div {
  flex: 1 0 auto;
  text-align: center;
  line-height: 2;
}
.index-bottom {
  height: 10vh;
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
