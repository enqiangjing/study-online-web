/**
 * 环境信息
 */

module.exports = {
  dev: {
    NODE_ENV: "dev",
    ENV_API: "http://localhost:8080/",
  },
  test: {
    NODE_ENV: "test",
    ENV_API: "http://test.com/",
  },
  production: {
    NODE_ENV: "production",
    ENV_API: "https://production.com/",
  },
};
