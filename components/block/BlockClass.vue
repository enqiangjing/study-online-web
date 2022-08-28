<template>
  <div class="blockclass">
    <div class="icon">
      <img class="more" src="imgs/blockclass/more.png" />
      <div
        v-bind:style="{
          position: 'absolute',
          top: 15 + 18 * index + '%',
          left: '0',
          width: '100%',
          height: '15%',
        }"
        class="sc-display info-item font-c-4 font-c-4"
        v-for="(item, index) in textlist.list"
        :key="index"
        :title="item.title"
        @click="goToArticlePage(item)"
      >
        <img src="imgs/blockclass/right.png" />
        <span
          class="font-s-14 font-ls-1 moreinfo border-none t-shdow-1"
          style="padding-right: 15px"
          >{{ item.title }}</span
        >
      </div>
    </div>
    <div class="cc-display bottom">
      <img src="imgs/blockclass/mark.png" style="margin-top: 3px" />
      <span
        class="font-s-16 font-w-6 font-ls-2 moreinfo t-shdow-2-2 font-c-7"
        >{{ textlist.title }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "BlockClass", // 经验交流区展示
  props: {
    textlist: Object,
  },

  methods: {
    /**
     * @method goToArticlePage && 跳转到文章阅读页面
     */
    goToArticlePage(val) {
      // this.$router.push({ path: `article/${val.id}` });
      this.$myglobalop.showLoading(this, `article/${val.id}`);
    },
  },
};
</script>

<style lang="less" scoped>
.blockclass {
  width: 100%;
  height: 100%;
  position: relative;
  float: left;

  .icon {
    position: relative;
    width: 100%;
    height: 90%;
    box-shadow: 0 0 6px #cacbcc;
    border-radius: 6px;
    background-color: #fff;

    .more {
      position: absolute;
      right: 10px;
      top: 10px;
      height: 12px;
      width: 20px;
    }
  }
}
.info-item {
  cursor: pointer;

  &:hover {
    background-color: rgb(240, 240, 240);
    color: red;
  }

  img {
    height: 14px;
    width: 14px;
    padding: 0 10px 0 15px;
  }
}
.bottom {
  position: absolute;
  bottom: 0;
  left: 20%;
  width: 60%;
  height: 20%;
  background-color: #fff;
  box-shadow: 0 3px 3px #dadbdc;
  border-radius: 0 0 10px 10px;

  img {
    height: 14px;
    width: 10px;
    margin: 0 10px;
  }
}
</style>