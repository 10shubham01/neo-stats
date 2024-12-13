import type { CreateAxiosDefaults } from 'axios';

const baseURL = import.meta.env.BASE_URL;

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['nuxt-lodash'],
  runtimeConfig: {
    // Keys within public, will be also exposed to the client-side
    public: {
      baseURL,
      axios: {
        baseURL,
      } as CreateAxiosDefaults,
    },
  },
});
