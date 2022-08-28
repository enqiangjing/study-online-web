<template>
  <div class="out border-none">
    <div class="top border-none">
      <img
        :src="getUrl(classInfo.thumbnail)"
        class="mouseon border-none"
        @click="goToArticlePage(classInfo.id)"
      />
    </div>
    <div class="bottom border-none">
      <div class="sc-display border-none title_class">
        <span
          class="font-s-16 t-shdow-2-1 span-l-1"
          :title="classInfo.title"
          @click="goToArticlePage(classInfo.id)"
          >{{ classInfo.title }}</span
        >
      </div>
      <div style="height: 40%; padding: 0 10px" class="border-none">
        <span
          class="span-l-2 font-s-14 font-c-8 font-ls-1"
          :title="classInfo.desc"
          >{{ classInfo.desc }}</span
        >
      </div>
      <div style="height: 30%; padding: 0 16px" class="ec-display border-none">
        <span class="font-c-eld font-w-6">
          <i class="el-icon-video-play"></i>&nbsp;
        </span>
        <span class="font-c-eld font-w-6 font-s-14"> {{ classInfo.heat }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GongKaiKeItem",
  props: ["classInfo"],
  data() {
    return {
      count: 4,
    };
  },
  methods: {
    // 页面跳转
    goToArticlePage(val) {
      this.$myglobalop.showLoading(this, "/player/" + val + "/1/1");
    },
    getUrl(val) {
      return process.client ? this.$myglobalop.getFullUrl(this, val) : "";
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.out {
  width: 100%;
  height: 100%;
  background-color: #fefefe;
  border: 1px solid #eee;
  border-radius: 6px;
  position: relative;
  box-shadow: 0 0 4px #eee;
  overflow: hidden;

  .top {
    position: absolute;
    height: 180px;
    width: 100%;
    overflow: hidden;

    img {
      height: 100%;
      width: 100%;
      cursor: pointer;
    }
  }

  .bottom {
    padding-top: 180px;
    width: 100%;
    height: 100%;
  }
}
.mouseon {
  &:hover {
    padding: 6px;
  }
}
.title_class {
  height: 30%;
  padding: 0 10px;
  cursor: pointer;

  &:hover {
    color: #f56c6c;
  }
}
</style>