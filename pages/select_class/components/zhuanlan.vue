<template>
  <div class="out border-none">
    <div class="left">
      <img
        class="class_img border-none"
        :src="getUrl(classInfo.thumbnail)"
        @click="goToArticlePage(classInfo.id)"
      />
    </div>
    <div class="right border-none">
      <div class="title_class">
        <span
          class="font-s-18 t-shdow-2-1 font-ls-1 span-l-1"
          :title="classInfo.title"
          @click="goToArticlePage(classInfo.id)"
          >{{ classInfo.title }}</span
        >
      </div>
      <div style="height: 50%">
        <span
          class="span-l-4 font-s-14 font-c-8 font-ls-1"
          :title="classInfo.desc"
          >{{ classInfo.desc }}</span
        >
      </div>
      <div style="height: 25%" class="se-display">
        <span class="font-c-eld font-w-6">￥{{ classInfo.price }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ZhuanLanItem",
  props: ["classInfo"],
  data() {
    return {
      conunt: 0,
    };
  },
  methods: {
    // 页面跳转
    goToArticlePage(val) {
      // window.open(process.env.baseUrl + "player/" + val + "/1/1", "_self");
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
  height: 160px;
  background-color: #fefefe;
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 10px;
  position: relative;
  box-shadow: 0 0 4px #eee;

  .left {
    position: absolute;
    height: 140px;
    width: 114px;
    border-radius: 5px;
    overflow: hidden;

    img {
      height: 100%;
      width: 100%;
    }
  }

  .right {
    padding-left: 126px;
    width: 100%;
    height: 100%;
  }
}

.title_class {
  height: 25%;
  cursor: pointer;

  &:hover {
    color: #f56c6c;
  }
}

.class_img {
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 4px #eee;
    padding: 2px;
    background-color: #e6a23c;
  }
}
</style>