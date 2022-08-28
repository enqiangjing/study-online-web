<template>
  <el-container>
    <el-header><WebHeader widht-type="100" /></el-header>
    <el-main class="web_content">
      <el-backtop target=".web_content"></el-backtop>
      <client-only>
        <Nuxt v-if="$store.state.user.isLoginFlag" />
        <!-- 未登录时展示内容 -->
        <div class="middleInfo cc-display" v-else>
          <img
            :src="noLogin"
            alt="error"
            style="width: 26px; margin: 6px 10px 0 0"
          />
          <div
            class="
              cc-display
              font-s-28 font-w-4 font-c-elw font-ls-4
              t-shdow-2-3
            "
          >
            请先登录~~
          </div>
        </div>
      </client-only>
    </el-main>
  </el-container>
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
      console.log("客户端运行！");
      this.handleLogin();
    }
    if (process.server) {
      console.log("服务端运行！");
    }
  },

  computed: {
    noLogin() {
      return process.env.baseUrl + "error-page/error.svg";
    },
  },

  methods: {
    // [function] 用户状态保持函数
    handleLogin() {
      // 查看本地缓存数据
      console.log(1, this.$store.state.user);
      // const userInfoStr = localStorage.getItem("userInfo");
      // if (userInfoStr) {
      //   // 格式化用户信息
      //   const userInfo = JSON.parse(userInfoStr);
      //   this.$store.commit("user/changeIsLoginBox", false);
      //   // 登录状态、用户信息写入 store
      //   this.$store.commit("user/changeIsLogin", {
      //     flag: true,
      //     userInfo: userInfo,
      //   });
      // }
    },
  },
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100% !important;
}
.el-main {
  padding: 0 !important;
}
.el-header {
  padding: 0 !important;
  color: #333;
}
.middleInfo {
  margin: 30px 20px;
  height: 260px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 6px #e9eaeb;
}
</style>