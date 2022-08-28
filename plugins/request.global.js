/**
 * api about user
 *
 * 与用户信息相关的 API 集合
 */

// 根URL
const BURL = process.env.baseUrl;

export default function ({ app, store, $axios }, inject) {
  // 使用token查询用户信息
  const getUserByToken = (data) => {
    return $axios({
      method: "GET",
      url: BURL + "api/loginService/getUserByToken?token=" + data,
    });
  };
  const getRemoteImgDomain = () => {
    return $axios({
      method: "GET",
      url: BURL + "api/systemService/getRemoteImgDomain",
    });
  };

  // 挂载全局 napi
  inject("gapi", {
    getUserByToken,
    getRemoteImgDomain,
  });
}
