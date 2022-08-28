<template>
  <div class="border-none outSide">
    <!-- 上方用户信息 -->
    <div style="" class="cc-display border-none faidifidifn">
      <!-- 用户头像 -->
      <div class="sc-display left">
        <img :src="userexampleImg" class="user_img" />
      </div>
      <!-- 经验等 -->
      <div class="right border-none">
        <!-- 用户昵称 -->
        <div
          style="width: 100%; height: 40%; padding-left: 4px"
          class="sc-display border-none"
        >
          <span class="font-s-20 font-w-4 font-c-5 font-ls-2 t-shdow-2-1"
            >{{ $store.state.user.userInfo.userName }}&nbsp;</span
          >
          <img :src="isvipImg" style="width: 40px; height: 18px" />
        </div>
        <!-- 经验值 -->
        <div style="width: 100%; height: 30%" class="cc-display">
          <div style="width: 100%; position: relative">
            <div style="width: 100%; padding: 0 50px 0 0" class="border-none">
              <el-progress
                :text-inside="true"
                :stroke-width="20"
                :percentage="30"
                :color="customColors"
              ></el-progress>
            </div>
            <div
              style="position: absolute; right: 0; top: 0; width: 40px"
              class="ec-display font-s-16 font-w-6 font-c-eld font-ls-1"
            >
              Lv.7
            </div>
          </div>
        </div>
        <!-- 积分 -->
        <div style="width: 100%; height: 30%" class="sc-display">
          <img
            :src="dolImg"
            style="width: 16px; height: 16px; margin: 0px 0 0 3px"
          />
          <span class="font-s-14 font-w-6 font-c-els font-ls-1">&nbsp;156</span>
        </div>
      </div>
    </div>

    <!-- 下方操作记录 -->
    <div style="width: 100%; min-height: 400px">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label" class="font-s-16 font-w-6 font-ls-1"
            ><i class="el-icon-date"></i>&nbsp;操作记录</span
          >
          登录日志、操作日志</el-tab-pane
        >
        <el-tab-pane>
          <span slot="label" class="font-s-16 font-w-6 font-ls-1"
            ><i class="el-icon-date"></i>&nbsp;回复信息</span
          >待回复的评论、消息</el-tab-pane
        >
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageAccountFirstPage",
  props: {
    textinfo: String,
  },
  data() {
    return {
      userexampleImg: "",
      isvipImg: "",
      dolImg: "",
      customColors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 },
      ],
    };
  },
  mounted() {
    this.userexampleImg =
      this.$store.state.user.userInfo.remoteImgDomain +
      this.$store.state.user.userInfo.userImg;
    this.isvipImg = process.env.baseUrl + "imgs/firstpage/isvip.png";
    this.dolImg = process.env.baseUrl + "imgs/firstpage/dol.png";
    this.$myglobalop.rmLoading();
  },
};
</script>

<style scoped lang="less">
// 外框
.outSide {
  width: 100%;
  height: 100%;
  padding: 15px;
  background-color: #fff;
}

// 上方
.faidifidifn {
  width: 100%;
  height: 160px;
  padding-bottom: 30px;
  // border-bottom: 1px solid #ddd;
  position: relative;

  .left {
    left: 0;
    position: absolute;
    width: 120px;
    height: 100%;
  }

  .right {
    padding-left: 130px;
    height: 100%;
    width: 100%;
  }
}

// 改变 element-ui 默认样式
.el-tabs--border-card {
  box-shadow: none !important;
}

.user_img {
  width: 120px;
  height: 120px;
  border-radius: 60px;
}
</style>
