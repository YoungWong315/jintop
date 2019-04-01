const Koa = require("koa");
const router = require("../router");
const consola = require("consola");
// const koaBody = require("koa-body");
const { Nuxt, Builder } = require("nuxt");

const app = new Koa();

// Import and Set Nuxt.js options
let config = require("../nuxt.config.js");
config.dev = !(app.env === "production");

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config);

  const { host = process.env.HOST || "127.0.0.1", port = process.env.PORT || 9999 } = nuxt.options.server;

  /* app.use(
    koaBody({
      multipart: true,
      formidable: {
        maxFieldsSize: 1024 * 1024 * 5,
        uploadDir: "./temp"
      }
    })
  ); */

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
