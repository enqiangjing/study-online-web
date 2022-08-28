<template>
  <div class="outSide cc-display">
    <div style="width: 60px; height: 60px" class="cc-display">
      <img :src="userAvatar" class="usr-logo" />
    </div>
    <div style="width: 100px; height: 60px">
      <div class="sc-display border-none usr-other">
        <span class="font-s-16 font-w-6 font-c-6 moreinfo">{{
          textinfo.userName
        }}</span>
      </div>
      <div style="width: 100%; height: 50%" class="sc-display">
        <img src="/imgs/usertext/Icon-fire.png" class="usr-range" />
        <span class="font-s-14 font-w-6 font-c-eld">{{ textinfo.hot }}</span>
      </div>
    </div>
    <div style="width: 120px; height: 60px" class="cc-display">
      <button
        class="button font-s-16 font-c-eld font-w-6 moreinfo"
        @click="toHomePage()"
      >
        了解详情
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserText",
  props: {
    textinfo: Object,
    remoteImgDomain: String,
  },
  data() {
    return {
      // 头像图片
      userAvatar: "",
    };
  },
  methods: {
    toHomePage() {
      window.open(this.textinfo.homepage);
    },
  },
  watch: {
    textinfo(a, b) {
      this.userAvatar = this.remoteImgDomain + this.textinfo.userImg;
    },
  },
  mounted() {
    this.userAvatar = this.remoteImgDomain + this.textinfo.userImg;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.outSide {
  width: 280px;
  height: 60px;
  border-radius: 30px;
  background-color: #eee;
}
.usr-logo {
  width: 46px;
  height: 46px;
  border-radius: 23px;
}
.usr-range {
  height: 14px;
  width: 14px;
  margin: 0 6px 0 10px;
}
.usr-other {
  width: 100%;
  height: 50%;
  padding-left: 10px;
}
.button {
  height: 36px;
  width: 100px;
  border-radius: 18px;
  border: none;
  background-color: #fdd977;
  cursor: pointer;

  &:hover {
    background-color: #f7d067;
  }
}
</style>
