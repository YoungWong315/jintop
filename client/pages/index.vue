<template>
  <section id="index">
    <div>welcome to jintop</div>
    <img src="../assets/cat.jpeg">

    <div id="progress">
      <span></span>
    </div>

    <div class="circle-wrap">
      <div class="circle-left">
        <div class="circle-item circle-left-item"></div>
      </div>
      <div class="circle-right">
        <div class="circle-item circle-right-item"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1'
    }
  },
  mounted() {},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>
#index {
  width: 100%;
  height: 100vh;
  text-align: center;

  font-size: 50px;
}
#index > img {
  width: 500px;
  height: 500px;
}

.circle-wrap {
  position: relative;
  margin: 0 auto 50px;
}
.circle-wrap {
  width: 500px;
  height: 500px;
}
.circle-left {
  position: absolute;
  left: 0;
  top: 0;
  width: 250px;
  height: 500px;
  overflow: hidden;
}
.circle-right {
  position: absolute;
  right: 0;
  top: 0;
  width: 250px;
  height: 500px;
  overflow: hidden;
}
.circle-item {
  width: 500px;
  height: 500px;
  border-radius: 50%;
}
.circle-left-item {
  border-top: 20px solid lightblue;
  border-left: 20px solid lightblue;
  border-bottom: 20px solid transparent;
  border-right: 20px solid transparent;
  transform: rotate(-45deg);
}
.circle-right-item {
  position: absolute;
  right: 0;
  border-top: 20px solid transparent;
  border-left: 20px solid transparent;
  border-bottom: 20px solid lightblue;
  border-right: 20px solid lightblue;
  transform: rotate(-45deg);
}
</style>

