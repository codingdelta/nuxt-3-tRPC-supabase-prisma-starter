// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    databaseUrl: process.env.NUXT_DATABASE_URL,
    supabaseUrl: process.env.NUXT_SUPABASE_URL,
    supabaseKey: process.env.NUXT_SUPABASE_KEY,
    supabaseServiceKey: process.env.NUXT_SUPABASE_SERVICE_KEY,
    public: {
      apiUrl: process.env.PUBLIC_API_URL,
    },
  },
  modules: ["@nuxt/ui", "@nuxtjs/supabase", "nuxt-security", "@pinia/nuxt"],
  build: {
    transpile: ["trpc-nuxt"],
  },
  supabase: {
    url: process.env.NUXT_SUPABASE_URL,
    key: process.env.NUXT_SUPABASE_KEY,
    serviceKey: process.env.NUXT_SUPABASE_SERVICE_KEY,
  },
  security: {
    headers: {
      contentSecurityPolicy:
        process.env.NODE_ENV === "development" ? false : undefined, //needed to make vue devtools work in Firefox
      crossOriginEmbedderPolicy:
        process.env.NODE_ENV === "development" ? "unsafe-none" : undefined, //needed to make nuxt devtools work in Firefox
    },
  },
  colorMode: {
    preference: "light",
  },
});
