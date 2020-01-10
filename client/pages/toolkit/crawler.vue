<template>
  <section id="index"
           class="crawler-wrap">
    <div class="crawler-flex crawler-input-container">
      <div class="crawler-flex crawler-input-wrap">
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
    <!-- <div class="crawler-flex options-wrap">
      <el-button @click="crawlMeizitu"
                 type="text">妹子图</el-button>
    </div> -->
    <div class="crawler-flex result-wrap">
      <div class="result-cell crawler-flex">
        <pre class="crawler-result">{{ html }}</pre>
      </div>
      <div class="result-cell crawler-flex">
        <div class="crawler-img">
          <img v-for="(item, index) in imgs"
               :src="item"
               :key="index">
        </div>
      </div>
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

import beautify from 'js-beautify'
import { Loading } from 'element-ui'

const loadingOption = { text: '拼命加载中' }
let loadingIns = {}

export default {
  data() {
    return {
      link: '',
      html: '',
      imgs: [],
    }
  },
  mounted() {},
  methods: {
    async submit() {
      loadingIns = Loading.service(loadingOption)
      const { code, data } = await this.$service.crawlByLink(
        encodeURIComponent(this.link),
      )
      loadingIns.close()
      if (code === 1) {
        const options = {
          indent_size: '2',
          indent_char: ' ',
          max_preserve_newlines: '5',
          preserve_newlines: true,
          keep_array_indentation: false,
          break_chained_methods: false,
          indent_scripts: 'normal',
          brace_style: 'collapse',
          space_before_conditional: true,
          unescape_strings: false,
          jslint_happy: false,
          end_with_newline: false,
          wrap_line_length: '0',
          indent_inner_html: false,
          comma_first: false,
          e4x: false,
          indent_empty_lines: false,
        }
        const { text, imgs } = data
        this.html = beautify.html(text, options)

        const { origin } = new URL(this.link)
        imgs.forEach(elem => {
          if (elem.startsWith('//')) {
            elem = origin + elem
            console.log(elem)
          }
        })
        this.imgs = imgs
      }
    },
    async crawlMeizitu() {
      const result = await this.$service.crawlMeizitu()
    },
  },
}
</script>

<style>
@import '../../assets/css/reset';

.crawler-wrap {
  width: 100vw;
  padding-bottom: 100px;
}
.crawler-flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.cell {
  width: 100vw;
}
.crawler-input-container {
  padding-top: 0.1px;
  margin-bottom: 30px;
}
.crawler-input-wrap {
  margin-top: 100px;
}
.result-wrap {
  align-items: flex-start;
}
.crawler-result {
  min-height: 100vh;
  padding: 20px;
  width: 90%;
  border: 1px solid #666;
  border-radius: 5px;
  overflow: auto;
}
.crawler-input {
  margin-right: 20px;
}
.crawler-input input {
  width: 400px;
  height: 50px;
  border-radius: 50px;
}
.result-cell {
  width: 50%;
  height: 100%;
}
.crawler-img {
  min-height: 100vh;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #666;
  border-radius: 5px;
  overflow: auto;
}
.crawler-img > img {
  width: 200px;
}
.options-wrap {
  padding: 50px;
}
</style>