<template>
  <div style="width: 100%; height: 100%">
    <div
      class="sc-display articleList"
      v-for="item in articleList"
      :key="item.id"
    >
      <div style="width: 6%; height: 100%" class="sc-display">
        <el-tag> {{ item.id }}</el-tag>
      </div>
      <div style="width: 84%; height: 100%">
        <div style="width: 100%; height: 60%" class="sc-display">
          <span
            class="font-s-15 moreinfo aricle-titile font-ls-1"
            @click="toArticle(item.id)"
            >{{ item.title }}</span
          >
        </div>
        <div style="width: 100%; height: 40%" class="ss-display">
          <el-tag size="small" type="success" class="font-ls-1"
            >创建 {{ timestampToTime(item.createdTime) }}</el-tag
          >
        </div>
      </div>
      <div style="width: 10%; height: 100%" class="ec-display">
        <el-button
          type="primary"
          icon="el-icon-edit"
          circle
          size="mini"
          @click="showArticleEdit(item)"
        ></el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  /**
   * 组件名称
   */
  name: "CpnArticleList",

  /**
   * 父组件传值
   */
  props: ["articleList"],

  /**
   * 响应式数据
   */
  data() {
    return {
      articleDialogVisible: false, // 文章编辑窗口
      article: {
        // 文章内容
        content: "",
        articleId: "",
      },
    };
  },

  /**
   * 组件方法
   */
  methods: {
    // 打开编辑窗口
    showArticleEdit(val) {
      // 进入到文章编辑页面
      // console.log(`${process.env.baseUrl}editor/${val.id}`)
      window.open(`${process.env.baseUrl}editor/${val.id}`);
    },

    // 时间戳转换
    timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },

    // 跳转文章阅读页面
    toArticle(val) {
      // console.log(val)
      this.$router.push("/article/" + val);
    },
  },

  /**
   * 挂载后执行，暂时无用
   */
  mounted() {
    // console.log(this.articleList)
  },

  /**
   * 监听
   */
  watch: {
    // 外部控制文章列表变化 -- 暂时无用
    articleList(val) {
      // console.log(val)
    },
  },
};
</script>

<style scoped lang="less">
.el-main {
  padding: 0;
}

.articleList {
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #eee;
  margin-bottom: 15px;
}

.aricle-titile {
  &:hover {
    font-weight: 600;
    color: #666;
    cursor: pointer;
  }
}
</style>
