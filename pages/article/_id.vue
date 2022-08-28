<template>
  <div class="article-page cc-display page-middle">
    <div class="so_middle" style="margin-top: 20px">
      <el-row>
        <!-- 展示文章信息、评论信息 -->
        <el-col :sm="24" :md="18" class="border-none order">
          <ShowArticle
            :articleInfo="articleInfo"
            :articleUserInfo="articleUserInfo"
            :remoteImgDomain="$store.state.user.userInfo.remoteImgDomain"
          />
          <div style="height: 20px"></div>
          <TalkAbout
            :discusslist="discussList"
            :articleInfo="articleInfo"
            :keys="reComponent"
            :is-login="$store.state.user.isLoginFlag"
            :remoteImgDomain="$store.state.user.userInfo.remoteImgDomain"
            @refresh="getNewTalk()"
          />
        </el-col>
        <el-col
          :md="6"
          class="hidden-sm-and-down"
          style="position: sticky; top: 90px"
        >
          <!-- 排行榜 -->
          <FireOrder msg="FireOrder" :dataList="fireOrder" bcolor="#fff" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import SelectedItem from "~/components/block/SelectedItem.vue";
import ShowArticle from "~/components/block/ShowArticle.vue";
import TalkAbout from "~/components/block/TalkAbout.vue";
import FireOrder from "@/components/block/FireOrder.vue";

export default {
  name: "Article", // 文章页面
  components: {
    SelectedItem,
    ShowArticle,
    TalkAbout,
    FireOrder,
  },
  data() {
    return {
      reComponent: [],
    };
  },
  async asyncData({ $axios, params }) {
    // 文章内容查询
    let articleInfo = {
      article: "文章不存在",
      id: "0",
    };
    // 发起查询
    const { data: a_data } = await $axios.post(
      process.env.baseUrl + "api/contentService/article_get",
      {
        articleId: params.id,
        article: "",
      }
    );
    // 结果校验
    if (
      a_data &&
      (a_data.errCode == "success" || a_data.errCode == "2000") &&
      a_data.data
    ) {
      articleInfo = a_data.data;
    }

    // 文章评论查询
    let discussList = [];
    const { data: d_data } = await $axios.post(
      process.env.baseUrl + "api/commentService/discuss",
      {
        topicId: params.id,
        topicType: "article",
      }
    );
    // 结果校验
    if (
      d_data &&
      (d_data.errCode == "success" || d_data.errCode == "2000") &&
      d_data.data &&
      d_data.data.length > 0
    ) {
      discussList = d_data.data;
    } else {
      // 无评论信息，空列表
      discussList = [];
    }

    let articleUserInfo = {};
    // 查询文章作者
    const { data: u_data } = await $axios.post(
      process.env.baseUrl + "api/userService/getUserInfoSimple",
      {
        userNo: articleInfo.author,
      }
    );
    // 结果校验
    if (
      u_data &&
      (u_data.errCode == "success" || u_data.errCode == "2000") &&
      u_data.data
    ) {
      articleUserInfo = u_data.data;
    }

    let fireOrder = {};
    const { data: o_data } = await $axios.post(
      process.env.baseUrl + "api/contentService/getFireOrder",
      {
        orderType: "about",
      }
    );
    if (o_data && o_data.errCode == "2000") {
      fireOrder = o_data.data;
    }

    // 服务端渲染值
    return {
      articleInfo: articleInfo,
      discussList: discussList,
      articleUserInfo: articleUserInfo,
      fireOrder: fireOrder,
    };
  },

  methods: {
    getNewTalk() {
      this.$uapi
        .post("api/commentService/discuss", {
          topicId: this.$route.params.id,
          topicType: "article",
        })
        .then((res) => {
          // console.log(res);
          if (
            res.data &&
            res.data.errCode &&
            (res.data.errCode == "success" || res.data.errCode == "2000")
          ) {
            this.reComponent = res.data.data;
          }
        });
    },
  },

  mounted() {
    this.$myglobalop.rmLoading();
  },
};
</script>

<style lang="less" scoped>
.article-page {
  padding: 0;
  width: 100%;
}
.selectTop {
  width: 100%;
  min-width: 1000px;
  height: 0px;
  margin-top: 15px;
}

.width80p {
  height: 100%;
  width: 80%;
  min-width: 1000px;
  max-width: 1200px;
}

.order {
  padding: 0 30px 0 0;
}
</style>