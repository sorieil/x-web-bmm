const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const app = express();

// const connectRedis = require('connect-redis');
// const RedisStore = connectRedis(session);
const sess = {
  resave: false,
  saveUninitialized: false,
  secret: 'xsync-web',
  name: 'xsync-session',
  cookie: {
    httpOnly: true,
    secure: false,
  },
  // store: new RedisStore({ url: '52.79.120.204:8754', logErrors: true }),
};
app.use(cookieParser());
app.use(session(sess));
app.use(function(req, res, next) {
  if (!req.session) {
    return next(new Error('oh no active session')); // handle error
  }
  next(); // otherwise continue
});

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');
config.dev = process.env.NODE_ENV !== 'production';

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  });
}
start();
