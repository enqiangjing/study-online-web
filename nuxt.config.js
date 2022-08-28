const env = require("./env.config.js");

const getEnvUrl = (val) => {
  console.log(val);
  console.log(env[val].ENV_API);
  return env[val].ENV_API;
};

module.exports = {
  server: {
    port: 3002, // default: 3000
    // host: "0.0.0.0", // default: localhost,
  },

  // https://www.nuxtjs.cn/api/configuration-head
  head: {
    title: "静航知识网",
    htmlAttrs: {
      lang: "zh-CN",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // https://www.nuxtjs.cn/api/configuration-env
  env: {
    // baseUrl: env[process.env.NODE_ENV].ENV_API, // base url
    baseUrl: getEnvUrl(process.env.NODE_ENV),
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // element-ui
    "element-ui/lib/theme-chalk/index.css",
    "element-ui/lib/theme-chalk/display.css",
    // 全局基础样式
    {
      src: "assets/base.less",
      lang: "less",
    },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/element-ui",
    "@/plugins/global_op.client",
    "@/plugins/vue-infinite-scroll.client",
    "@/plugins/axios.client",
    "@/plugins/request.client",
    "@/plugins/request.global",
    "@/plugins/wang-editor.client",
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  // Modules: https://go.nuxtjs.dev/config-modules https://go.nuxtjs.dev/axios
  modules: ["@nuxtjs/axios"],
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: { transpile: [/^element-ui/] },
};
