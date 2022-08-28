<template>
  <div class="border-none fire-list" :style="{ backgroundColor: bcolor }">
    <div class="sc-display border-none top">
      <span style="padding-left: 12px" class="font-s-18 font-ls-2 t-shdow-2"
        >热门榜单</span
      >
    </div>
    <div class="sc-display border-none middle">
      <SelectedItem msg="SelectedItem" />
    </div>
    <div class="bottom">
      <div
        class="border-none top"
        v-for="(item, index) in dataList"
        :key="index"
      >
        <div class="atext sc-display border-none">
          <el-tag
            size="mini"
            :type="item.hot > 1000 ? 'danger' : item.hot > 300 ? '' : 'info'"
            >{{ index + 1 }}</el-tag
          >
          <span
            class="
              font-s-14 font-w-4 font-c-4 font-ls-1
              t-shdow-2-1
              span-l-1
              toPage
            "
            @click="toPage(item)"
            >&nbsp;&nbsp;{{ item.title }}</span
          >
        </div>
        <img v-if="item.hot > 1000" :src="imgUrl_i1" />
        <div class="aline"></div>
      </div>
      <div style="height: 28px" class="cc-display">
        <span
          class="font-w-8 font-ls-3 font-c-elp"
          style="cursor: pointer"
          title="更多"
          @click="moreOrder()"
          >···</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import SelectedItem from "./SelectedItemFire.vue";

export default {
  name: "FireOrder",
  props: ["bcolor", "dataList"],
  components: {
    SelectedItem,
  },
  data() {
    return {
      imgUrl_i1: "",
    };
  },
  methods: {
    toPage(item) {
      this.$myglobalop.showLoading(this, "/article/" + item.id);
    },
    moreOrder() {
      this.$notify({
        title: "提示",
        message: "功能暂未开放！",
        type: "warning",
        position: "top-left",
      });
    },
  },
  mounted() {
    this.imgUrl_i1 = process.env.baseUrl + "imgs/usertext/Icon-fire.png";
  },
};
</script>

<style scoped lang="less">
.el-main {
  padding: 0;
}

.fire-list {
  width: 100%;
  min-height: 400px;
  // background-color: #f8f9fa;
  border-radius: 4px;
  box-shadow: 0 0 6px #daeaeb;

  .top {
    height: 40px;
    width: 100%;
  }

  .middle {
    height: 40px;
    width: 100%;
    border-left: 10px solid #f8fafc;
    border-right: 10px solid #f8fafc;
    padding: 0 10px;
    border-radius: 12px;
    background-color: #409eff;
    overflow: hidden;
  }

  .bottom {
    min-height: 320px;
    width: 100%;

    .top {
      width: 100%;
      height: 44px;
      position: relative;
      // border-bottom: 1px solid #eee;
      // border-right: 14px solid #f9f9f9;
      // border-left: 10px solid #f9f9f9;
      padding: 0 10px 0 10px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;

      img {
        position: absolute;
        right: 14px;
        top: 10px;
        width: 12px;
        height: 15px;
      }
      .atext {
        width: 100%;
        height: 100%;
        padding-right: 30px;
      }
      .aline {
        width: 100%;
        border-bottom: 1px solid #eee;
      }
    }
  }
}

.toPage {
  cursor: pointer;

  &:hover {
    color: #f56c6c;
  }
}
</style>
