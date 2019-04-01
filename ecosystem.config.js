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
      path: "/www/wwwroot/website/www_site/jintop_cn",
      "pre-deploy": "git fetch",
      ssh_options: "StrictHostKeyChecking=no",
      "post-deploy":
        // npm install when using new dependencies
        "npm run build && pm2 reload ecosystem.config.js --env production",
      env: { NODE_ENV: "production" }
    }
  }
};
