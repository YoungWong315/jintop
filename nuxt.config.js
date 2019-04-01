const pkg = require("./package");

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
  loading: { color: "#fff" },
  css: ["element-ui/lib/theme-chalk/index.css"],
  plugins: ["@/plugins/element-ui"],
  modules: ["@nuxtjs/axios"],
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  srcDir: "client/",
  rootDir: "./",
  build: {
    transpile: [/^element-ui/],
    extractCSS: true,

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
  db_config: {
    username: "root",
    password: "1123581321wy.",
    host: "127.0.0.1",
    port: "3306",
    dbName: "jintop_db",
    dialect: "mysql"
  }
};
