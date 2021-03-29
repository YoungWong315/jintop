// const consola = require('consola')
const Koa = require('koa')
const session = require('koa-session')
const redisStore = require('koa-redis')
const passport = require('koa-passport')
// const path = require("path");
// const serve = require("koa-static"); // 处理静态资源
const { Nuxt, Builder } = require('nuxt')
const router = require('./router')
let config = require('../nuxt.config.js')

const app = new Koa()

// Import and Set Nuxt.js options
config.dev = !(app.env === 'production')

const startServer = async () => {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)
  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 9999,
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // koa-session config
  app.keys = ['jintop session secret']
  const { session_config } = config
  /* session_config.store = redisStore({
    // Options specified here
  }); */

  // const static = serve(path.join(__dirname));
  // start router -----------------------------<

  app
    .use(session(session_config, app)) // koa-session
    //.use(passport.initialize()) // koa-possport
    //.use(passport.session())
    .use(router.routes())
    .use(router.allowedMethods())
  // .use(static);

  // nuxt render
  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  // consola.ready({
  //   message: `Server listening on http://${host}:${port}`,
  //   badge: true,
  //   processId: process.pid,
  // })
  console.log(`Server listening on http://${host}:${port}`)
}

module.exports = startServer
