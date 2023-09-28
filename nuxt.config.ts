// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro:{
    plugins:['~/server/index.ts']
  },
  runtimeConfig:{
    MONGODB_URI:process.env.MONGODB_URI
  },
  vite: {
    server: {
      fs: {
        strict: false
      }
    }
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  ssr: true,
})
