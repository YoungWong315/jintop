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
const _ = require('lodash')

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
}
/* const proxy = defineReactive(test)
proxy.c = 3
console.log(proxy.c)
console.log(proxy.fn('msg'))

const date = new Date()
const proxyDate = defineReactive(date)
console.log(proxyDate)
console.log(proxyDate.getTime()) */

const proxyArr = defineReactive(test.arr)
// 使用数组方法时会触发两次set，一次方法(push...)，一次修改length
proxyArr.push(7)
proxyArr[8] = 8
proxyArr.shift()
proxyArr.forEach(elem => {
  console.log(elem)
})

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

