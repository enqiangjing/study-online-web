<template>
  <div class="sc-display">
    <div
      v-for="(item, index) in textinfo"
      :key="index"
      class="cc-display"
      v-bind:style="{
        height: '100%',
        borderBottom: item.is ? '2px solid #ff5c7c' : '2px solid #f6f6f6',
        margin: '0 20px 0 0',
      }"
    >
      <span
        :class="['textstyle', item.is ? 'active01' : 'active02']"
        @click="changeTab()"
        >{{ item.text }}</span
      >
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
// @ is an alias to /src
// import Introduce from "./Introduce.vue";

export default {
  name: "SelectedItem",
  components: {
    // Introduce,
  },
  data() {
    return {
      textinfo: [
        { is: true, text: "相关" },
        { is: false, text: "最热" },
        { is: false, text: "最新" },
        { is: false, text: "点赞" },
      ],
    };
  },
  methods: {
    changeTab() {
      this.$notify({
        title: "提示",
        message: "功能暂未开放！",
        type: "warning",
        position: "top-right",
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
  font-weight: 600;
  padding: 0;
  cursor: pointer;

  &:hover {
    color: #409eff;
  }
}

.active01 {
  color: #ff5c7c;
}
.active02 {
  color: #7f7f8c;
}
</style>
