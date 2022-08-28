<template>
  <div class="page_content_serarch_page border-none">
    <!-- 导航标签 -->
    <div class="cc-display select_top_search_page">
      <!--  -->
      <div class="sc-display so_middle border-none" style="padding: 0 20px">
        <SelectedItem msg="SelectedItem" />
      </div>
    </div>

    <!-- 主体内容区域 -->
    <div
      class="cc-display border-none"
      style="width: 100%; min-height: 600px; margin-top: 15px; padding: 0 20px"
    >
      <el-row class="so_middle">
        <!-- 展示搜索内容 -->
        <el-col
          :sm="24"
          :md="18"
          class="border-none"
          style="padding: 0 20px 0 0"
        >
          <div style="height: 12px"></div>
          <!-- 内容列表 -->
          <SearchResult
            v-for="(item, index) in searchList"
            :key="index"
            :searchlist="item"
            :remoteImgDomain="$store.state.user.userInfo.remoteImgDomain"
            style="width: 100%"
          />
          <!-- 内容有限 -->
          <div
            style="width: 100%; height: 200px"
            class="cc-display"
            v-show="searchList.length < 3"
          >
            <span class="font-s-20 font-ls-2 font-c-eld t-shdow-3-1"
              ><i class="el-icon-info" style="margin: 6px 6px 0 0"></i
              >没有更多内容了~~</span
            >
          </div>
          <!-- 分页 -->
          <div class="block" v-show="searchList.length > 3">
            <div style="width: 100%; margin: 35px 0 40px 0">
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
        </el-col>

        <!-- 展示排行榜列表 -->
        <el-col
          :md="6"
          class="hidden-sm-and-down"
          style="position: sticky; top: 140px"
        >
          <!-- 排行榜组件 -->
          <FireOrder msg="FireOrder" :dataList="fireOrder" bcolor="#f8f9fa" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import SelectedItem from "~/components/block/SelectedItem.vue";
import SearchResult from "~/components/block/SearchResult.vue";
import FireOrder from "~/components/block/FireOrder.vue";

export default {
  name: "Search",
  components: {
    SelectedItem,
    SearchResult,
    FireOrder,
  },
  async asyncData({ $axios, params }) {
    // 查询结果列表
    let list = {
      data: [],
      total: 0,
    };
    const { data } = await $axios.post(
      process.env.baseUrl + "api/contentService/allSearch",
      {
        title: params.content,
        content: params.content,
        author: params.content,
        pageIndex: 1,
        pageNum: 10,
      }
    );
    if (data && (data.errCode == "success" || data.errCode == "2000")) {
      list = data.data;
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

    // 服务端渲染
    return { searchList: list.data, total: list.total, fireOrder: fireOrder };
  },
  data() {
    return {
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
        .post("api/contentService/allSearch", {
          title: this.$route.params.content,
          content: this.$route.params.content,
          author: this.$route.params.content,
          pageIndex: this.pageIndex,
          pageNum: this.pageNum,
        })
        .then((res) => {
          const alist = res?.data?.data || null;
          if (res == null) {
            this.searchList = [];
            this.total = 0;
          } else {
            this.searchList = alist.data;
            this.total = alist.total;
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
.page_content_serarch_page {
  width: 100%;
  background-color: #fff;
}
.select_top_search_page {
  width: 100%;
  height: 50px;
  background-color: #f8f9fa;
  z-index: 90;
  position: sticky;
  top: 70px;
}
</style>