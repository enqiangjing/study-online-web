<template>
  <div style="width: 100%; min-height: 480px" class="cs-display page-middle">
    <!-- 账户管理页面不需要服务端渲染 -->
    <client-only>
      <div style="margin: 30px 0 40px 0" class="so_middle">
        <!-- 菜单及子页面 -->
        <el-row v-if="$store.state.user.isLoginFlag">
          <!-- 菜单 -->
          <el-col :span="6" style="position: sticky; top: 10px">
            <MenuList msg="Introduce" />
          </el-col>
          <!-- 子页面 -->
          <el-col
            :span="18"
            class="border-none"
            style="box-shadow: 0 0 4px #eaebec"
          >
            <nuxt-child />
          </el-col>
        </el-row>

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
      </div>
    </client-only>
  </div>
</template>

<script>
import MenuList from "~/components/block/MenuList.vue";

export default {
  name: "Account",
  components: {
    MenuList,
  },

  created() {},

  computed: {
    noLogin() {
      return process.env.baseUrl + "error-page/error.svg";
    },
  },

  mounted() {
    if (this.$store.state.user.isLoginFlag) {
      console.log("The user is signed in");
    } else {
      this.$myglobalop.rmLoading();
    }
  },
};
</script>


<style scoped lang="less">
.middleInfo {
  height: 260px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 6px #e9eaeb;
}
</style>