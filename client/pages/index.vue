<template>
  <section class="wrap flex">
    <div class="flex crawler-cell">
      <div>
        <input class="crawler-input"
               type="text"
               placeholder="爬虫地址">
        <div>提交</div>
      </div>
    </div>
    <div class="splitLine"></div>
    <div class="flex crawler-cell">
      <textarea class=""
                cols="30"
                rows="10"></textarea>
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
      activeIndex: '1',
    }
  },
  mounted() {},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
  },
}
</script>

<style>
.wrap {
  width: 100vw;
  height: 100vh;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.crawler-input {
  margin-right: 20px;
  width: 400px;
  height: 50px;
  font-size: 16px;
  text-indent: 1em;
  border-radius: 50px;
  border: 1px solid #666;
}
.crawler-cell {
  width: 50%;
}
.splitLine {
  width: 1px;
  height: 100%;
  background: #d5d5d5;
}
</style>

