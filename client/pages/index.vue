<template>
  <section id="index">
    <div>welcome to jintop</div>
    <img src="../assets/cat.jpeg">
  </section>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
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
</style>

