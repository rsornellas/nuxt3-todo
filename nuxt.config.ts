import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  modules: ["@unocss/nuxt", "@pinia/nuxt"],
  unocss: {
    uno: true, 
    icons: true, 
    attributify: true,
  },
});
