<template>
  <div class="cc-display el-footer">
    <div class="footer_inside so_middle border-none">
      <!-- 左侧下载链接 -->
      <div class="footer-left border-none">
        <div class="download cs-display">
          <img src="/imgs/webfooter/img.png" />
        </div>
        <div style="width: 100%; height: 24px" class="cc-display">
          <span class="font-s-14 font-s-12 font-c-6 font-ls-1 t-shdow-1"
            >公众号</span
          >
        </div>
      </div>
      <!-- 右侧文字 -->
      <div class="footer-right border-none">
        <span
          style="overflow: hidden"
          class="cs-display font-s-14 font-c-4 font-ls-1"
          >备案xxxxxxxxxx号| 网络视听许可证xxxxxxxxxx号 |
          公网安备xxxxxxxxxxxx号</span
        >
        <span
          style="margin-top: 15px"
          class="cs-display font-s-14 font-c-6 font-ls-1"
          >关于在线学习 | About so | 服务条款 | 广告服务 | 网站导航</span
        >
        <span
          style="margin-top: 15px"
          class="cs-display font-s-14 font-c-8 font-ls-1"
          >Copyright © 1998 - 2020.</span
        >
      </div>
      <div class="clear-float"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WebFooter",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.el-footer {
  padding: 0;
  height: 120px !important;
  margin-top: 20px;
  overflow: hidden;
}

// 外框
.footer_inside {
  position: relative;
  height: 100%;
  border-top: 2px solid #ff5c7c;
  padding: 0 20px;
}
.footer-left {
  position: absolute;
  top: 15px;
  left: 20px;
  height: 105px;
  width: 74px;
  float: left;
}
.footer-right {
  padding: 15px 0 0 80px;
  width: 100%;
  height: 120px;
  float: right;
}

.download {
  width: 100%;
  height: 74px;
  box-shadow: 0 0 4px #8a8bbc;

  img {
    width: 74px;
    height: 74px;
  }
}
</style>
