// pm2 启动配置

module.exports = {
    apps: [
      {
        name: "study online web",
        exec_mode: "cluster",
        instances: "max",
        script: "./node_modules/nuxt/bin/nuxt.js",
        args: "start",
      },
    ],
  };
  