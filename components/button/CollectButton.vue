<template>
  <div class="outSide cc-display">
    <img :src="icon" style="width: 20px; height: 20px" />
    <span class="font-s-18 font-w-6 font-ls-2">&nbsp;收藏</span>
  </div>
</template>

<script>
export default {
  name: "CollectButton",
  props: {
    textinfo: String,
  },
  data() {
    return {
      icon: "",
    };
  },
  mounted() {
    this.icon = process.env.baseUrl + "imgs/collectbutton/Icon-heart.png";
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.outSide {
  width: 100px;
  height: 40px;
  cursor: pointer;
  border-radius: 10px;
  color: #666;
  border: 1px dashed #f56c6c;

  &:hover {
    background-color: #e6a23c;
    color: #fff;
  }
}
</style>
