<template>
  <div class="border-none outSide">
    <div class="title">
      <div class="left sc-display">
        <span class="font-s-20 font-ls-2 t-shdow-2-1">我的文章列表</span>
      </div>
      <div style="float: right; height: 100%" class="cc-display">
        <el-button
          type="warning"
          icon="el-icon-plus"
          circle
          size="mini"
          @click="showArticleEdit()"
        ></el-button>
      </div>
    </div>
    <ArticleList :articleList="articleList" @research="searchListInfo()" />
    <div class="block">
      <div style="width: 100%; margin: 20px 0 15px 0">
        <el-pagination
          class="cc-display"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[10, 15, 20, 30]"
          :page-size="pageNum"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleList from "~/components/block/ArticleList.vue";

export default {
  name: "ArticlePage",
  props: {
    textinfo: String,
  },
  components: {
    ArticleList,
  },
  data() {
    return {
      articleList: [],
      total: 0,
      pageIndex: 1,
      pageNum: 10,
    };
  },
  methods: {
    // 当前页面大小
    handleSizeChange(val) {
      this.pageNum = val;
      this.searchListInfo();
    },
    // 当前页
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.searchListInfo();
    },
    // 页面变动查询
    searchListInfo() {
      this.$uapi
        .post("api/contentService/allSearchLogin", {
          author: this.$store.state.user.userInfo.author,
          type: "article",
          pageIndex: this.pageIndex,
          pageNum: this.pageNum,
        })
        .then((res) => {
          // console.log(res.data.data)
          if (
            res.data.errCode &&
            (res.data.errCode == "success" || res.data.errCode == "2000")
          ) {
            let data = res.data.data;
            this.articleList = data.data;
            this.total = data.total;
          } else {
            this.$message.error("我的文章查询失败");
          }
        });
    },
    // 打开编辑窗口
    showArticleEdit() {
      // 进入到文章编辑页面
      window.open(
        `${process.env.baseUrl}editor/creation/${this.$store.state.user.userInfo.userNo}`
      );
    },
  },
  mounted() {
    this.searchListInfo();
    this.$myglobalop.rmLoading();
  },
};
</script>

<style scoped lang="less">
.outSide {
  width: 100%;
  height: 100%;
  padding: 15px 30px 10px 30px;
  background-color: #fff;

  .title {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #eaebec;
    margin-bottom: 10px;

    .left {
      height: 40px;
      float: left;
    }
  }
}
</style>
