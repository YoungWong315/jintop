<template>
  <section class="wrap">
    <div class="content">
      css toolkit
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {},
  methods: {},
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
  border: 1px solid lightblue;
  border-radius: 5px;
}
.content a {
  margin-right: 30px;
  font-size: 18px;
  color: blueviolet;
}
</style>