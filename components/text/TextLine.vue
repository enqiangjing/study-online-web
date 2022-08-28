<template>
  <div id="text" style="height: 50px; margin: 60px 0" class="cc-display">
    <div style="width: 80%; height: 100%">
      <div style="width: 100%; height: 80%">
        <div style="width: 10%; height: 100%; float: left" class="sc-display">
          <img
            src="imgs/textline/icon-book.png"
            style="height: 30px; width: 30px"
          />
        </div>
        <div class="cc-display msg font-c-6 font-ls-3">
          <span class="font-s-24 font-w-6">{{ msg }}</span>
        </div>
      </div>
      <!-- 线条 -->
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TextLine",
  props: {
    msg: String,
  },
};
</script>

<style lang="less" scoped>
.msg {
  width: 80%;
  height: 100%;
  float: left;
  text-shadow: 3px 3px 3px #cacbcc;
}
.line {
  width: 100%;
  height: 20%;
  background-image: linear-gradient(
    to right,
    rgb(255, 91, 122),
    rgba(255, 184, 33, 0.05)
  );
  border-radius: 20px;
  box-shadow: -4px 2px 8px #cacbcc;
}
</style>