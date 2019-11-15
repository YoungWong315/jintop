<template>
  <section id="index"
           class="wrap flex">
    <div class="flex crawler-cell">
      <div class="flex crawler-input-wrap">
        <el-input placeholder="爬虫地址"
                  class="crawler-input"
                  v-model="link"
                  clearable
                  autofocus>
        </el-input>
        <el-button @click="submit"
                   type="text">提交</el-button>
      </div>
    </div>
    <div class="flex crawler-cell">
      <div class="crawler-result">{{ link }}</div>
    </div>
  </section>
</template>

<script>
/* const _ = require('lodash')

const defineReactive = obj => {
  // obj属性如果仍是对象，需要递归将其代理才可生效
  return new Proxy(obj, {
    set(target, propKey, value, receiver) {
      console.log(`setter newVal: ${value}, prop: ${propKey}`)
      return Reflect.set(target, propKey, value, receiver)
    },
    get(target, propKey, receiver) {
      console.log(`get`)
      console.log(target, propKey)
      if (target instanceof Date && typeof target[propKey] === 'function') {
        // 针对Date类，方法的指向问题
        return target[propKey].bind(target)
      }
      return Reflect.get(target, propKey, receiver) // 返回被代理对象的属性或方法
    },
    // 针对function
    apply(target, ctx, args) {
      return Reflect.apply(...arguments)
    }
  })
}

const test = {
  a: 1,
  b: 2,
  fn: function(msg) {
    return msg + this.c
  },
  arr: [1, 2, 3]
} */
/* const proxy = defineReactive(test)
proxy.c = 3
console.log(proxy.c)
console.log(proxy.fn('msg'))

const date = new Date()
const proxyDate = defineReactive(date)
console.log(proxyDate)
console.log(proxyDate.getTime()) */

/* const proxyArr = defineReactive(test.arr)
// 使用数组方法时会触发两次set，一次方法(push...)，一次修改length
proxyArr.push(7)
proxyArr[8] = 8
proxyArr.shift()
proxyArr.forEach(elem => {
  console.log(elem)
}) */

export default {
  data() {
    return {
      link: '',
    }
  },
  mounted() {},
  methods: {
    async submit() {
      const res = await this.$service.crawlByLink(encodeURIComponent(this.link))
      console.log(res)
    },
  },
}
</script>

<style>
@import '../assets/css/reset';

.wrap {
  width: 100vw;
  height: 100vh;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.crawler-cell {
  width: 50%;
  height: 100%;
}
.crawler-input-wrap {
  margin-bottom: 200px;
}
.crawler-result {
  padding: 20px;
  width: 90%;
  height: 90%;
  border: 1px solid #666;
  border-radius: 5px;
}
.crawler-input {
  margin-right: 20px;
}
.crawler-input input {
  width: 400px;
  height: 50px;
  border-radius: 50px;
}
</style>

