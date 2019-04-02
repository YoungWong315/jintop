const pkg = require("./package");

console.log(process.env.NODE_ENV);

module.exports = {
  mode: "universal",
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  loading: { color: "green" },
  css: ["element-ui/lib/theme-chalk/index.css"],
  plugins: ["@/plugins/element-ui"],
  modules: ["@nuxtjs/axios"],
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  // 打包目标路径 -----------------------------------------------------<
  buildDir: process.env.NODE_ENV === "production" ? "/www/wwwroot/website/www_jintop_cn/nuxt" : ".nuxt",
  // ------------------------------------------------------------<
  srcDir: "client/",
  build: {
    transpile: [/^element-ui/],
    // 资源访问路径
    publicPath: "/jintop/",
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  server: {
    host: "127.0.0.1",
    port: 9999
  },
  router: {
    base: "/"
  },
  // custom config想·
  db_config: {
    username: "jintop",
    password: "1123581321wy.",
    host: "127.0.0.1",
    port: "3306",
    dbName: "jintop_db",
    dialect: "mysql"
  }
};
