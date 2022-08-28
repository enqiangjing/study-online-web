<template>
  <div class="web_content">
    <div class="header">
      <WebHeader />
    </div>
    <div class="main_content">
      <el-backtop target=""></el-backtop>
      <Nuxt />
    </div>
    <div class="footer">
      <WebFooter />
    </div>
  </div>
</template>

<script>
import WebHeader from "@/components/navigation/WebHeader.vue";
import WebFooter from "@/components/navigation/WebFooter.vue";

export default {
  /**
   * 组件名称
   */
  name: "LayoutDefault",

  /**
   * 使用的子组件
   */
  components: {
    WebHeader,
    WebFooter,
  },

  /**
   * 组件创建时加载
   */
  created() {
    if (process.client) {
      // console.log('layouts-default', '客户端运行，初始化登录信息！')
      this.handleLogin();
    }
    if (process.server) {
      // console.log('layouts-default', '服务端运行！')
    }
  },

  methods: {
    // [function] 用户登录信息初始化
    handleLogin() {
      // 查看本地缓存数据
      console.log(1, this.$store.state.user);
      // const userInfoStr = localStorage.getItem("userInfo");
      // if (userInfoStr) {
      //   // 格式化用户信息
      //   const userInfo = JSON.parse(userInfoStr);
      //   // 移除登录框
      //   this.$store.commit("user/changeIsLoginBox", false);
      //   if (userInfo.userNo && userInfo.userNo !== "") {
      //     // 登录状态、用户信息写入 store
      //     this.$store.commit("user/changeIsLogin", {
      //       flag: true,
      //       userInfo: userInfo,
      //     });
      //   } else {
      //     this.$store.commit("user/changeIsLogin", {
      //       flag: false,
      //       userInfo: userInfo,
      //     });
      //   }
      // } else {
      //   console.log(2, this.$store.state.user);
      // this.$uapi.config.getRemoteImgDomain().then((res) => {
      //   console.log(res.data.data);
      //   if (res.data && res.data.data && res.data.errCode == "2000") {
      //     const userConfig = res.data.data;
      //     localStorage.setItem("userInfo", JSON.stringify(userConfig));
      //     // 移除登录框
      //     this.$store.commit("user/changeIsLoginBox", false);
      //     this.$store.commit("user/changeIsLogin", {
      //       flag: false,
      //       userInfo: userConfig,
      //     });
      //     location.reload();
      //   }
      // });
      // }
    },
  },
};
</script>

<style lang="less" scoped>
.main_content {
  min-height: 600px;
}
.header {
  position: sticky;
  top: 0;
  z-index: 100;
}
.main_content {
  padding: 0 0;
}
</style>