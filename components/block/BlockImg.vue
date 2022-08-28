<template>
  <div class="blockimg border-none">
    <div class="top">
      <client-only>
        <img
          :src="getUrl"
          style="height: 100%; width: 100%; object-fit: cover"
        />
      </client-only>
      <div class="player cc-display" @click="toPlayer">
        <img src="imgs/blockImg/default.svg" alt="player" />
      </div>
    </div>
    <div class="bottom se-display border-none">
      <span
        class="font-s-16 font-c-5 font-ls-1 moreinfo t-shdow-2-1 vide_title"
        :title="videolist['content']"
        @click="toPlayer"
        >{{ videolist["title"] }}</span
      >
    </div>
    <div class="bottom_right font-c-eld">
      <i class="el-icon-dessert t-shdow-2-3"></i>
      <span class="font-s-14 t-shdow-2-3">{{ videolist["readTimes"] }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlockImg", // 展示推荐的精品课程
  props: {
    videolist: Object,
  },
  computed: {
    getUrl() {
      return process.client
        ? this.$myglobalop.getFullUrl(this, this.videolist.thumbnail)
        : this.videolist.thumbnail;
    },
  },
  methods: {
    toPlayer() {
      this.$myglobalop.showLoading(
        this,
        "/player/" + this.videolist.extraA + "/1/1"
      );
    },
  },
};
</script>

<style lang="less" scoped>
.blockimg {
  width: 100%;
  height: 100%;
  position: relative;
  float: left;
  border-radius: 4px;
  box-shadow: 0 0 6px #babbbc;
  overflow: hidden;
  border: 16px solid #fff;

  .top {
    width: 100%;
    height: 80%;
    overflow: hidden;

    img {
      width: 100%;
      border-radius: 4px;
    }
  }

  .bottom_right {
    position: absolute;
    bottom: 0;
    right: 6px;
  }
}

.bottom {
  width: 100%;
  height: 20%;
  padding-left: 2px;
  background-color: #fff;
}

.player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80%;
  background-color: rgba(0, 0, 0, 0.15);
  cursor: pointer;
  border-radius: 4px;

  img {
    width: 60px;
    height: 60px;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.35);
  }
}

.vide_title {
  cursor: pointer;

  &:hover {
    color: #f56c6c;
  }
}
</style>
