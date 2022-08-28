/**
 * 用户相关的信息store
 * @returns 用户信息参数、操作函数
 */

export const state = () => ({
  // 登录框弹窗是否展示
  isLoginBox: false,
  // 登录状态
  isLoginFlag: false,
  // 全部用户信息
  userInfo: {},
  // 搜索输入文本
  searchInputText: "",
  // 当前用户页面
  accountPage: "firstpage",
  // 图片验证码
  verifyCode: "",
  // 用户购买课程信息
  classInfo: null,
  // 加载
  fullLoading: null,
});

export const mutations = {
  // 设置 pageHeader
  setPageHeader(state, payload) {
    state.pageHeader = payload;
  },

  // 登录框展示设置
  changeIsLoginBox(state, status) {
    state.isLoginBox = status;
  },

  // 用户信息设置
  changeIsLogin(state, payload) {
    state.isLoginFlag = payload.flag;
    state.userInfo = payload.userInfo;
  },

  // 仅设置 user，不进行本地存储
  setUserOnly(state, payload) {
    state.userInfo = payload;
    state.isLoginFlag = true;
  },

  // 改变搜索文本
  changeSearchInputText(state, content) {
    state.searchInputText = content;
  },

  // 改变用户页面
  changeAccountPage(state, val) {
    state.accountPage = val;
  },

  // 设置验证码图片
  setVerifyCode(state, payload) {
    state.verifyCode = payload;
  },

  // 设置购买的课程
  setClassInfo(state, payload) {
    state.classInfo = payload;
  },

  // 全局加载框
  setFullLoading(state, payload) {
    state.fullLoading = payload;
  },
};

export const actions = {};

export const getters = {};
