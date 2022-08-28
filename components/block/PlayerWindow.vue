<template>
  <div class="videoWidow cc-display">
    <div v-if="showWindow" class="so_middle cc-display" style="height: 100%">
      <video width="100%" height="100%" align="center" controls>
        <source :src="playUrl" type="video/mp4" />
      </video>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerWindow",
  props: {
    playerInfo: Object,
    playUrl: String,
  },
  data() {
    return {
      showWindow: false,
    };
  },
  watch: {
    playUrl(a, b) {
      // console.log(a);
      if (a !== "") {
        this.showWindow = true;
      }
    },
  },
};
</script>

<style scoped lang="less">
.videoWidow {
  width: 100%;
  height: 600px;
  padding: 20px 0;
  background-color: #000;
  background-size: 100% 100%;
}
</style>
