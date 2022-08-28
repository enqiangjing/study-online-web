<template>
  <div class="outSide">
    <div style="width: 100%; height: 60%" class="sc-display moreinfo">
      <span
        class="font-s-24 font-w-4 moreinfo font-c-4 t-shdow-2-3"
        :title="textinfo.desc"
        >{{ textinfo.title }}</span
      >
    </div>
    <div style="width: 100%; height: 40%">
      <div class="sc-display outs">
        <i
          class="el-icon-date font-s-14 font-w-6 font-c-elp"
          style="margin-top: 1px; margin-right: 2px; margin-left: 2px"
        ></i>
        <span class="font-s-14 font-ls-1 font-c-eld font-w-6"
          >{{ textinfo.classHour }}课时</span
        >
      </div>
      <div class="sc-display outs">
        <i
          class="el-icon-grape font-s-16 font-w-6 font-c-elp"
          style="margin-top: 2px; margin-right: 2px"
        ></i>
        <span class="font-s-14 font-ls-1 font-c-eld font-w-6"
          >{{ textinfo.heat }}热度</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClassText",
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
    margin-top: 2px;
    height: 11px;
    width: 18px;
  }

  .b_img {
    margin-right: 4px;
    margin-left: 2px;
    height: 14px;
    width: 12px;
  }
}
</style>
