const pkg = require('./package')

console.log(process.env.NODE_ENV)

module.exports = {
  mode: 'universal',
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/jt/client/assets/favicon.ico',
      },
    ],
  },
  loading: { color: 'green' },
  css: ['element-ui/lib/theme-chalk/index.css'],
  modules: ['@nuxtjs/axios'],
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  // 打包目标路径 -----------------------------------------------------<
  buildDir:
    process.env.NODE_ENV === 'production'
      ? '/www/wwwroot/website/www_jintop_cn/nuxt'
      : '.nuxt',
  // ------------------------------------------------------------<
  srcDir: 'client/',
  build: {
    transpile: [/^element-ui/],
    // 资源访问路径
    publicPath: '/jt/',
    cssSourceMap: true,
    devtools: true,
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
  plugins: [
    '~/plugins/validator/index.js',
    '~/plugins/element-ui.js',
    '~/plugins/service/index.js',
    '~/plugins/crypto/index.js',
  ],
  server: {
    host: '127.0.0.1',
    port: 9999,
  },
  router: {
    base: '/',
  },

  // custom config
  db_config: {
    username: 'jintop',
    password: '1123581321wy.',
    host: '127.0.0.1',
    port: '3306',
    dbName: 'jintop_db',
    dialect: 'mysql',
  },
  session_config: {
    key: 'koa:sess' /** (string) cookie key (default is koa:sess) */,
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    autoCommit: true /** (boolean) automatically commit headers (default true) */,
    overwrite: true /** (boolean) can overwrite or not (default true) */,
    httpOnly: true /** (boolean) httpOnly or not (default true) */,
    signed: true /** (boolean) signed or not (default true) */,
    rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
    renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/,
  },
}
