<template>
  <section class="wrap">
    <login v-if="!login"
           :login="loginCb" />
    <div v-else>
      已登录
    </div>
  </section>
</template>

<script>
import Login from '~/components/login/login'

export default {
  data() {
    return {
      login: false,
    }
  },
  components: {
    Login,
  },
  mounted() {},
  methods: {
    loginCb(e) {
      console.log(e)
      this.login = true
    },
  },
}
</script>

<style scoped>
@import '../../assets/css/reset';

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