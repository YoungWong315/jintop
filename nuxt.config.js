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
  loading: { color: "green" },
  css: ["element-ui/lib/theme-chalk/index.css"],
  plugins: ["@/plugins/element-ui"],
  modules: ["@nuxtjs/axios"],
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  // 打包目标路径 -----------------------------------------------------<
  buildDir: "/www/wwwroot/website/www_jintop_cn",
  // ------------------------------------------------------------<
  srcDir: "client/",
  build: {
    transpile: [/^element-ui/],
    loaders: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: "url-loader",
        query: {
          limit: 10000,
          name: "img/[name].[hash].[ext]"
        }
      }
    ],

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
  // custom config
  db_config: {
    username: "root",
    password: "1123581321wy.",
    host: "127.0.0.1",
    port: "3306",
    dbName: "jintop_db",
    dialect: "mysql"
  }
};
