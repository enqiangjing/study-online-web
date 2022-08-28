/**
 * api about user
 *
 * 与用户信息相关的 API 集合
 */

// 根URL
const BURL = process.env.baseUrl;

export default function ({ app, store, $axios }, inject) {
  // 通用get请求
  const get = (url) => app.$myAxios({ method: "GET", url: BURL + url });

  // 通用post请求
  const post = (url, data) =>
    app.$myAxios({ method: "POST", url: BURL + url, data: data });

  // 验证码相关
  const verifyCode = {};
  verifyCode.send = (data) =>
    app.$myAxios({
      method: "POST",
      url: BURL + "api/verifyCodeService/sendCodePicture",
      data: data,
    });

  // 课程相关
  const classInfo = {};
  // 用户购买课程列表
  classInfo.userClassList = (data) =>
    app.$myAxios({
      method: "POST",
      url: BURL + "api/classInfoService/getUserClassList",
      data: data,
    });
  // 课程章节信息
  classInfo.videoCurriculumChapter = (data) =>
    app.$myAxios({
      method: "POST",
      url: BURL + "api/classInfoService/videoChapter",
      data: data,
    });
  // 课程介绍
  classInfo.curriculumInfo = (data) =>
    app.$myAxios({
      method: "POST",
      url: BURL + "api/classInfoService/getCurriculumInfo",
      data: data,
    });
  // 课程列表
  classInfo.curriculumList = (data) =>
    app.$myAxios({
      method: "POST",
      url: BURL + "api/classInfoService/getCurriculumList",
      data: data,
    });
  // 播放地址
  classInfo.getVideoUrl = (data) =>
    app.$myAxios({
      method: "POST",
      url: BURL + "api/systemService/getVideoUrl",
      data: data,
    });
  classInfo.getOrderList = (data) =>
    app.$myAxios({
      method: "POST",
      url: BURL + "api/contentService/getFireOrder",
      data: data,
    });

  const article = {};
  // 获取文章信息
  article.getArticleInfo = (data) =>
    app.$myAxios({
      method: "POST",
      url: BURL + "api/contentService/article_get",
      data: data,
    });

  const config = {};
  // 读取配置信息
  config.configInfoNeedVerifyCode = (data) =>
    app.$myAxios({
      method: "POST",
      url: BURL + "api/systemService/configInfoNeedVerifyCode",
      data: data,
    });
  config.getRemoteImgDomain = (data) =>
    app.$myAxios({
      method: "POST",
      url: BURL + "api/systemService/getRemoteImgDomain",
      data: data,
    });

  const user = {};
  // 更新用户信息
  user.updateInfo = (data) =>
    app.$myAxios({
      method: "POST",
      url: BURL + "api/userService/updateInfo",
      data: data,
    });
  // 更新用户密码
  user.updatePassword = (data) =>
    app.$myAxios({
      method: "POST",
      url: BURL + "api/userService/updatePassword",
      data: data,
    });
  user.getUserInfoSimple = (data) =>
    app.$myAxios({
      method: "POST",
      url: BURL + "api/userService/getUserInfoSimple",
      data: data,
    });

  // 挂载全局 napi
  inject("uapi", {
    get,
    post,
    user,
    verifyCode,
    classInfo,
    article,
    config,
  });
}
