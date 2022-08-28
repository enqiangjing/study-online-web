<template>
  <div style="width: 100%" class="sc-display">
    <div :id="'scrollDiv' + partid" class="boxScroll so_a_left">
      <div
        v-bind:style="{
          width: Math.round(chapterlist.length / 2) * 260 - 20 + 'px',
        }"
      >
        <div
          v-for="(item, index) in chapterlist"
          :key="index"
          v-bind:style="[
            { float: 'left', margin: '0 20px 20px 0' },
            index + 1 == Math.round(chapterlist.length / 2) ||
            index + 1 == chapterlist.length
              ? { marginRight: '0' }
              : '',
          ]"
          class="border-none classItem"
          @click="toPlayer(item)"
          :title="item.part + '.' + item.chapter + ' ' + item.chapterName"
        >
          <div class="cc-display left border-none">
            <div class="block cc-display">
              <span class="font-s-16 font-w-8 font-c-eld">{{
                item.chapter
              }}</span>
            </div>
          </div>
          <div class="sc-display right border-none">
            <span class="font-s-16 class-item moreinfo">{{
              item.chapterName
            }}</span>
          </div>
        </div>
        <div class="clear-float"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ScrollCross } from "~/assets/js/scroll.crossrange.js";

export default {
  name: "ClassBrowse",
  props: {
    chapterlist: Array,
    partid: Number,
  },
  mounted() {
    let sc = new ScrollCross(
      document.getElementById("scrollDiv" + this.partid)
    );
    sc.explainText();
  },
  methods: {
    /**
     * 跳转到视频播放页面
     */
    toPlayer(val) {
      // this.$router.push(
      //   "/player/" + val.videoId + "/" + val.part + "/" + +val.chapter
      // );
      this.$myglobalop.showLoading(
        this,
        "/player/" + val.videoId + "/" + val.part + "/" + +val.chapter
      );
    },
  },
};
</script>

<style scoped lang="less">
.classItem {
  width: 240px;
  height: 44px;
  border-radius: 10px;
  border: 1px solid #faecdb;
  box-shadow: 0 0 3px #faecdb;
  overflow: hidden;
  cursor: pointer;
  color: #666;
  &:hover {
    background-color: #409eff;
    color: #fff;
  }

  .left {
    width: 30%;
    height: 100%;
    float: left;
    border-radius: 10px;

    .block {
      width: 70%;
      height: 70%;
      background-color: #f2f6fc;
      border-radius: 10px;
    }
  }

  .right {
    width: 70%;
    height: 100%;
    float: left;
  }
}

.boxScroll {
  height: 136px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #eee;
  overflow-x: auto;
}

.so_a_left {
  max-width: 1400px;
}
</style>
