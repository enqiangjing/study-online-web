// 服务端运行时 process.server | 客户端运行时 process.client
const cookieparser = process.server ? require("cookieparser") : undefined;
// 全局 base url
const BURL = process.env.baseUrl;

export const actions = {
  // 服务端初始化运行，可以将一部分数据提前写入 store，与服务端的交叉点为 token
  // 服务端已经预先渲染了一部分数据
  async nuxtServerInit({ commit, dispatch, state }, { req, $axios, $gapi }) {
    // 请求头是否携带cookie
    if (req.headers.cookie) {
      const cookies = await cookieparser.parse(req.headers.cookie);
      // cookie中是否包含token
      console.log(cookies);
      if (cookies.token) {
        const { data } = await $gapi.getUserByToken(cookies.token);
        commit("user/setUserOnly", data.data);
      } else {
        const { data } = await $gapi.getRemoteImgDomain();
        commit("user/changeIsLogin", {
          flag: false,
          userInfo: data.data,
        });
      }
    } else {
      const { data } = await $gapi.getRemoteImgDomain();
      commit("user/changeIsLogin", {
        flag: false,
        userInfo: data.data,
      });
    }
  },
};
