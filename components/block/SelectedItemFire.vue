<template>
  <div class="sc-display">
    <div
      v-for="(item, index) in textinfo"
      :key="index"
      class="cc-display"
      v-bind:style="{
        height: '100%',
        borderBottom: item.is ? '2px solid #fff' : '2px solid #f2f3f4',
        margin: index == textinfo.length - 1 ? '0' : '0 15px 0 0',
        padding: '0 1px 0 3px',
      }"
    >
      <span
        :class="[
          'textstyle font-ls-3 font-s-15 moreinfo',
          item.is ? 'active01' : 'active02',
        ]"
        @click="changeTab()"
        >{{ item.text }}</span
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import Introduce from "./Introduce.vue";

export default {
  name: "SelectedItemFire",
  components: {
    // Introduce,
  },
  data() {
    return {
      textinfo: [
        { is: true, text: "相关" },
        { is: false, text: "最热" },
        { is: false, text: "最新" },
        { is: false, text: "其他" },
      ],
    };
  },
  methods: {
    changeTab() {
      this.$notify({
        title: "提示",
        message: "功能暂未开放！",
        type: "warning",
        position: "top-left",
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.el-main {
  padding: 0;
}

.width80p {
  height: 100%;
  width: 80%;
  min-width: 1000px;
  max-width: 1200px;
}

.textstyle {
  font-weight: 400;
  padding: 0;
  cursor: pointer;

  &:hover {
    color: #f56c6c;
  }
}

.active01 {
  color: #fff;
  font-weight: 600;
}
.active02 {
  color: #f2f3f4;
}
</style>
