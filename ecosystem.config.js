module.exports = {
  apps: [
    {
      name: "jintop",
      script: "./app.js",

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ],

  deploy: {
    production: {
      user: "root",
      host: ["140.143.80.9"],
      port: "31599",
      ref: "origin/master",
      repo: "git@github.com:YoungWong315/jintop.git",
      // 源码发布路径
      path: "/www/wwwroot/source/www_jintop_cn",
      "pre-deploy": "git fetch",
      ssh_options: "StrictHostKeyChecking=no",
      "post-deploy": "npm run build && pm2 reload ecosystem.config.js --env production",
      // npm install when using new dependencies
      // copy node_modules to nuxt.config.js's rootDir
      // "npm run build && cp -R /www/wwwroot/www_jintop_cn/source/node_modules /www/wwwroot/website/www_jintop_cn/dist/node_modules dir2 && pm2 reload ecosystem.config.js --env production",
      env: { NODE_ENV: "production" }
    }
  }
};
