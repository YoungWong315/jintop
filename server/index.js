const consola = require("consola");
const Koa = require("koa");
const router = require("./router");
const { Nuxt, Builder } = require("nuxt");

const app = new Koa();

// start crawler
require("./crawler");

// Import and Set Nuxt.js options
let config = require("../nuxt.config.js");
config.dev = !(app.env === "production");

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config);
  const { host = process.env.HOST || "127.0.0.1", port = process.env.PORT || 9999 } = nuxt.options.server;

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  // start router -----------------------------<
  app.use(router.routes()).use(router.allowedMethods());

  app.use(ctx => {
    ctx.status = 200;
    ctx.respond = false; // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx; // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res);
  });

  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}

start();
