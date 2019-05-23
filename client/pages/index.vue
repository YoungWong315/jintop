<template>
  <section id="index">welcome to jintop</section>
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
  line-height: 90vh;
  text-align: center;

  font-size: 50px;
}
</style>

