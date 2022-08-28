<template>
  <div style="width: 100%" class="cc-display">
    <div class="boxOne cc-display so_middle">
      <div style="width: 30%; height: 100%">
        <ClassText :textinfo="classIntruduce" />
      </div>
      <div style="width: 40%; height: 100%" class="cs-display">
        <UserText
          :textinfo="classLecturer"
          :remoteImgDomain="remoteImgDomain"
        />
      </div>
      <div style="width: 30%; height: 100%" class="es-display">
        <CollectButton textinfo="collect" @click.native="noticeInfo()" />
      </div>
    </div>
  </div>
</template>

<script>
import ClassText from "@/components/text/ClassText.vue";
import UserText from "@/components/text/UserText.vue";
import CollectButton from "@/components/button/CollectButton.vue";

export default {
  /**
   * 组件名称
   */
  name: "CpnIntroduce",

  /**
   * 子组件
   */
  components: {
    ClassText,
    UserText,
    CollectButton,
  },

  data() {
    return {
      Lecturer: { userName: "", hot: "" },
    };
  },

  props: ["classIntruduce", "classLecturer", "remoteImgDomain"],

  mounted() {},

  methods: {
    noticeInfo() {
      this.$notify({
        title: "提示",
        message: "功能暂未开通！",
        type: "warning",
        position: "top-left",
      });
    },
  },
};
</script>

<style scoped lang="less">
.boxOne {
  height: 80px;
  padding-top: 30px;
}
</style>
