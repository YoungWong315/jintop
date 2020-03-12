<template>
  <section class="question-create">
    <div class="question-options height-100-percent"></div>
    <div class="question-content height-100-percent"></div>
  </section>
</template>

<script>
export default {}
</script>

<style scoped>
.question-create {
  display: flex;
  justify-content: center;
}
.height-100-percent {
  height: 100%;
}
.question-content {
  width: 800px;
  background: #eee;
}
.question-options {
  width: 400px;
  border-left: 1px solid #eee;
  box-sizing: border-box;
}
</style>