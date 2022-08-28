<template>
  <div class="cc-display buttonStyle" @click="goToArticlePage(urlin)">
    <img
      src="imgs/buttonimg/right.png"
      style="width: 20px; height: 20px; margin: 3px 20px 0 0"
    />
    <span class="font-s-20 font-w-6 font-ls-2" style="color: #fff">{{
      textin
    }}</span>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "ButtonImg",
  props: {
    textin: String,
    urlin: String,
  },
  methods: {
    goToArticlePage(val) {
      this.$router.push({ path: val });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.buttonStyle {
  width: 260px;
  height: 50px;
  border-radius: 25px;
  background-image: linear-gradient(
    to right,
    rgb(255, 92, 124),
    rgba(252, 168, 42, 0.35)
  );
  box-shadow: -2px 0 6px #babbbc;

  &:hover {
    cursor: pointer;
    background-image: linear-gradient(
      to bottom,
      rgb(255, 92, 124),
      rgba(252, 168, 42, 0.35)
    );
  }
}
</style>
