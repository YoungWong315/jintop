<template>
  <section class="question-create">
    <div class="question-options height-100-percent">
      <div class="question-type">单选题</div>
      <div class="question-type">多选题</div>
    </div>
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
.question-type {
  width: 200px;
  border: 1px solid #666;
  box-sizing: border-box;
}
</style>