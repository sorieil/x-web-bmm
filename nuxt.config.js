// const session = require('express-session');
// const bodyParser = require('body-parser');

module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, user-scalable=no, user-scalable=0, user-scalable=false',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Round',
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Noto+Sans+KR:100,300,400,500,700,900',
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  // loading: { color: '#fff' },
  loading: false,
  /*
   ** Global CSS
   */
  css: ['~/node_modules/normalize.css/normalize.css', 'assets/css/animate.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/global'],

  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // '@nuxtjs/pwa'
    // Doc: https://github.com/nuxt-community/eslint-module
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Simple usage
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',

    // With options
    [
      '@nuxtjs/eslint-module',
      {
        /* module options */
      },
    ],
  ],

  styleResources: {
    // your settings here
    scss: ['./assets/scss/common.scss'],
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) { },
    postcss: {
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {
        // Disable a plugin by passing false as value
        'postcss-url': false,
        'postcss-nested': {},
        'postcss-responsive-type': {},
        'postcss-hexrgba': {},
      },
      preset: {
        // Change the postcss-preset-env settings
        autoprefixer: {
          grid: true,
        },
      },
    },
  },
  env: {
    API_URL: process.env.API_URL,
  },
  server: {
    port: process.env.PORT,
    host: process.env.HOST,
  },
  /*
   ** Add server middleware
   ** Nuxt.js uses `connect` module as server
   ** So most of express middleware works with nuxt.js server middleware
   */
  serverMiddleware: [
    // body-parser middleware
    // Api middleware
    // We add /api/login & /api/logout routes
    // '~/service_server',
  ],
};
