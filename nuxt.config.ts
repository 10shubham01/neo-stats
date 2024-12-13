import type { CreateAxiosDefaults } from 'axios';

const baseURL = import.meta.env.BASE_URL;
const api_key = import.meta.env.API_KEY;
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],
  components: {
    global: true,
    dirs: ['@/components'],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['nuxt-lodash'],
  plugins: [
    '@/plugins/datepicker.ts',
  ],
  runtimeConfig: {
    // Keys within public, will be also exposed to the client-side
    public: {
      baseURL,
      axios: {
        baseURL,
        api_key,
      } as CreateAxiosDefaults,
    },
  },
});
