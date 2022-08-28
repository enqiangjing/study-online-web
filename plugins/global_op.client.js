import Vue from "vue";

Vue.prototype.$myglobalop = {
  // 对象属性
  // loading 实例
  loading: "",
  // loading 样式
  loadingStyle: {
    lock: true,
    text: "拼命加载中",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.7)",
  },

  // 对象方法
  // loading 展示处理
  showLoading(_this, to) {
    // 跳转路径和当前路径一致时，不做处理
    if (_this.$route.path == to) return;
    // 执行跳转
    _this.$router.push(to);
    _this.$myglobalop.loading = _this.$loading(_this.$myglobalop.loadingStyle);
  },

  // 关闭 loading 展示
  rmLoading() {
    try {
      this.loading.close();
    } catch (err) {}
  },

  // 返回上级菜单
  goBackLoading(_this) {
    _this.$myglobalop.loading = _this.$loading(_this.$myglobalop.loadingStyle);
    _this.$router.back();
  },

  // 图片地址拼接
  // 使用方式
  // getUrl(val) {
  //   return process.client ? this.$myglobalop.getFullUrl(this, val) : "";
  // },
  getFullUrl(_this, val) {
    let res = "";
    if (val.indexOf("http") == -1) {
      if (
        _this.$store.state.user.userInfo.remoteImgDomain &&
        _this.$store.state.user.userInfo.remoteImgDomain != ""
      ) {
        res = _this.$store.state.user.userInfo.remoteImgDomain + val;
      } else {
        res = val;
      }
    } else {
      res = val;
    }
    return res;
  },
};
