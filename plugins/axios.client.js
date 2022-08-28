/**
 * 自定义 axios 实例
 * @param {*} Vue实例对象
 * @param {*} inject
 */
import _ from "lodash";
import { Message } from "element-ui";
const BURL = process.env.baseUrl;

export default function ({ app, store, $axios }, inject) {
  /**
   * 自定义 axios 实例，以实现拦截器
   */
  const request = $axios.create({
    headers: {
      common: {
        Accept: "application/json, text/plain, */*",
      },
    },
  });

  /**
   * 请求拦截器
   */
  request.interceptors.request.use(
    // **可以对请求配置进行更改**
    function (config) {
      // 为所有请求添加 token
      const userToken = store.state.user.userInfo.token;
      // 如果 token 存在，则添加 token
      if (userToken) {
        config.headers.Authorization = userToken;
      } else {
        // 未读取到 token，是否要从本地读取 token ???
        // const userInfoStr = localStorage.getItem('isLoginUserName')
        // console.log(userInfoStr)
      }
      // 必须返回 config 对象
      return config;
    },
    // **请求创建异常**
    function (error) {
      return Promise.reject(error);
    }
  );

  /**
   * 响应拦截器
   */
  request.interceptors.response.use(
    // **请求成功的处理**
    async function (response) {
      if (response.data.errCode == "001") {
        // 响应结果，errCode 为 001
        Message.error("请求结果异常，code：001");
      } else if (response.data.errCode == "001003") {
        // 响应结果，errCode 为 001003
        Message.error("请求结果异常，code：001003");
      } else if (response.data.errCode == "001006") {
        // 响应结果，errCode 为 001006
        const getByToken = `${BURL}api/loginService/newToken?token=${store.state.user.userInfo.token}`;
        const { data } = await $axios({
          method: "GET",
          url: getByToken,
        });
        // 解析返回数据
        const userInfo = data?.data || undefined;
        // 数据写入 store
        store.commit("user/changeIsLogin", {
          flag: true,
          userInfo: userInfo,
        });
        // 数据写入本地缓存
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        // 失败的请求回放
        return request(response.config);
      }
      return response;
    },
    // **请求失败的处理**
    function (error) {
      // 超出 2xx 的错误码，会进入该方法处理
      return Promise.reject(error);
    }
  );

  // 挂载到 Vue 全局对象
  inject("myAxios", request);
  inject("lodash", _);
}
