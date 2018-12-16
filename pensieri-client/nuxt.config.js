module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Pensieri Client',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A Nuxt.js client for Pensieri. Pensieri is a full stack Node.js based blogging platform.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/apollo'
  ],
  axios: {
    baseURL: 'http://localhost:4000',
    timeout: 3000
  },
  apollo: {
    tokenName: 'pensieri-apollo-token',
    tokenExpires: 7,
    authenticationType: 'Bearer',
    errorHandler(error) {
      console.log('%cError', 'background: red;', error.message)
    },
    clientConfigs: {
      default: {
        httpEndpoint: 'http://localhost:4000/graphql',
        httpLinkOptions: {
          credentials: 'same-origin'
        }
      }
    }
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
