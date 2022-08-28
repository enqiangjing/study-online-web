<template>
  <div class="outSide">
    <div style="width: 100%; height: 60%" class="sc-display moreinfo">
      <span
        class="font-s-24 font-w-4 font-c-4 t-shdow-2-3 moreinfo"
        :title="textinfo.desc"
        >{{ textinfo.name }}</span
      >
    </div>
    <div style="width: 100%; height: 40%">
      <div class="ss-display outs">
        <i
          class="el-icon-view font-s-16 font-w-6 font-c-elp"
          style="margin-top: 2px; margin-right: 2px"
        ></i>
        <span class="font-s-14 font-ls-1 font-c-eld font-w-6"
          >{{ textinfo.watch }}浏览</span
        >
      </div>
      <div class="ss-display outs">
        <i
          class="el-icon-tickets font-s-14 font-w-6 font-c-elp"
          style="margin-top: 3px; margin-right: 2px"
        ></i>
        <span class="font-s-14 font-ls-1 font-c-eld font-w-6"
          >{{ textinfo.talk }}评论</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleText",
  props: {
    textinfo: Object,
  },
};
</script>

<style scoped lang="less">
.outSide {
  height: 80px;
  width: 100%;
}
.outs {
  margin-right: 20px;
  height: 100%;
  float: left;

  .a_img {
    margin-right: 2px;
    margin-top: 5px;
    margin-left: 2px;
    height: 11px;
    width: 18px;
  }

  .b_img {
    margin-right: 4px;
    margin-top: 2px;
    height: 14px;
    width: 12px;
  }
}
</style>
