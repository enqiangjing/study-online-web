<template>
  <el-main>
    <!-- 文章信息 -->
    <el-row>
      <el-col :span="12">
        <!-- 文章标题 -->
        <ArticleText
          :textinfo="{
            name: articleInfo.title,
            watch: articleInfo.readTimes,
            talk: articleInfo.discussTimes,
          }"
          style="float: left"
        />
      </el-col>
      <el-col :span="12">
        <!-- 文章作者 -->
        <UserText
          :textinfo="articleUserInfo"
          :remoteImgDomain="remoteImgDomain"
          style="float: right; margin-top: 4px"
      /></el-col>
    </el-row>

    <!-- 文章内容 -->
    <div class="sc-display article-content border-none">
      <article v-html="articleInfo.article"></article>
    </div>
  </el-main>
</template>

<script>
import ArticleText from "@/components/text/ArticleText.vue";
import UserText from "@/components/text/UserText.vue";

export default {
  name: "CpnShowArticle",
  props: ["articleInfo", "articleUserInfo", "remoteImgDomain"],
  components: {
    ArticleText,
    UserText,
  },
  mounted() {
    console.log(this.$store.state.user.userInfo.remoteImgDomain);
    console.log(this.remoteImgDomain);
  },
};
</script>

<style scoped lang="less">
.el-main {
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 4px #eaebec;
}

.article-content {
  width: 100%;
  min-height: 200px;
  position: relative;
  padding: 4px 16px;
  border: 2px solid #fae9cf;
  border-radius: 8px;
}
</style>
