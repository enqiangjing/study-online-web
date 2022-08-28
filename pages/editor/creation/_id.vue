<template>
  <div class="p-editor">
    <!-- 标题 -->
    <div class="editor-title sc-display border-none">
      <div class="font-s-14 font-w-6" style="min-width: 60px">
        <span class="font-s-18 font-w-6 font-ls-2 t-shdow-1">标题</span>
      </div>
      <el-input
        size="medium"
        placeholder="请输入内容"
        v-model="articleInfo.title"
        clearable
      >
      </el-input>
    </div>

    <!-- 摘要 -->
    <div class="editor-title sc-display border-none">
      <div class="font-s-14 font-w-6" style="min-width: 60px">
        <span class="font-s-18 font-w-6 font-ls-2 t-shdow-1">摘要</span>
      </div>
      <el-input
        type="textarea"
        size="medium"
        placeholder="请输入内容"
        v-model="articleInfo.content"
        clearable
        class="font-type"
      >
      </el-input>
    </div>

    <!-- 文本编辑器 -->
    <editor-my-editor v-model="articleInfo.article" />

    <!-- 文章类型 -->
    <div class="editor-other-line ec-display">
      <span class="font-s-16 font-w-6 font-ls-2 t-shdow-1">文章类型：</span>
      <select
        v-model="articleInfo.subject"
        class="select font-ls-2 font-w-6 font-c-6"
      >
        <option
          class="option font-w-6 font-c-6"
          v-for="(item, index) in articleSubject"
          :key="index"
          :value="item.value"
        >
          <span class="font-ls-4">{{ item.name }}</span>
        </option>
      </select>
    </div>

    <!-- 操作按钮 -->
    <div class="editor-option ec-display">
      <el-button type="primary" size="small" @click="submitArticle(0)"
        >保存草稿</el-button
      >
      <el-button type="warning" size="small" @click="submitArticle(1)"
        >保存 & 发布</el-button
      >
    </div>
  </div>
</template>

<script>
import EditorMyEditor from "../components/my-editor.vue";

export default {
  layout: "editor",
  /**
   * 加载组件
   */
  components: {
    EditorMyEditor,
  },

  data() {
    return {
      articleInfo: {
        title: "",
        content: "",
        article: "",
        subject: "default",
      },
    };
  },

  async asyncData({ $axios, params }) {
    // 发起查询
    let articleSubject = [];
    const { data } = await $axios.post(
      process.env.baseUrl + "api/systemService/getArticleType",
      {}
    );
    // 结果校验
    if (
      data &&
      (data.errCode == "success" || data.errCode == "2000") &&
      data.data
    ) {
      articleSubject = data.data;
    }

    return { articleSubject: articleSubject };
  },

  methods: {
    // 提交文章信息
    submitArticle(status) {
      this.$uapi
        .post("api/contentService/article_creation", {
          userNo: this.$store.state.user.userInfo.userNo,
          ...this.articleInfo,
          status: status,
        })
        .then((res) => {
          if (res.data && res.data.data && res.data.errCode == "2000") {
            this.$notify({
              title: "成功",
              message: "文章保存成功！",
              type: "success",
            });
          } else {
            this.$notify({
              title: "错误",
              message: "文章保存失败！",
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$notify({
            title: "错误",
            message: "系统异常！",
            type: "error",
          });
        });
    },
  },

  mounted() {
    this.$myglobalop.rmLoading();
  },
};
</script>

<style lang="less" scoped>
.p-editor {
  padding: 20px;
}

.editor-title {
  margin: 0 0 20px 0;
  min-height: 40px;
}

// 操作按钮
// editor-option
.editor-option {
  padding: 10px 0;
}

.editor-other-line {
  height: 60px;

  .select {
    width: 160px;
    height: 32px;
    border: 1px solid #e6a23c;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    outline: none; /*wl更改*/

    .option {
      height: 30px;
    }
  }
}

.font-type /deep/ .el-textarea__inner {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif,
    "微软雅黑";
}
</style>