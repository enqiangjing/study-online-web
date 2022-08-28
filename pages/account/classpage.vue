<template>
  <div class="border-none outSide">
    <!-- 标题文字 -->
    <div class="cross top sc-display">
      <span class="font-s-20 font-ls-2 t-shdow-2-1">我的课程信息</span>
    </div>
    <div class="cross">
      <!-- 课程条目 -->
      <div class="cross item" v-for="item in classList" :key="item.id">
        <img :src="getUrl(item.thumbnail)" alt="" />
        <div class="content border-none">
          <div class="title border-none">
            <span class="font16h moreinfo font-ls-1 font-c-6 t-shdow-1">{{
              item.className
            }}</span>
          </div>
          <div class="tar border-none sc-display">
            <el-tag class="font-ls-1">学习进度</el-tag>
          </div>
          <div class="process border-none">
            <el-progress
              :percentage="percentage"
              :color="[
                { color: '#f56c6c', percentage: 20 },
                { color: '#e6a23c', percentage: 40 },
                { color: '#5cb87a', percentage: 60 },
                { color: '#1989fa', percentage: 80 },
                { color: '#6f7ad3', percentage: 100 },
              ]"
            ></el-progress>
          </div>
          <div class="tar border-none sc-display">
            <el-tag type="warning" class="font-ls-1"
              >开课时间：{{ item.startDate.slice(0, 10) }}</el-tag
            >&nbsp;
            <el-tag type="info" class="font-ls-1"
              >结业时间：{{ item.endDate.slice(0, 10) }}</el-tag
            >&nbsp;
            <el-tag type="danger" class="font-ls-1"
              >课时：{{ item.classHour }}</el-tag
            >
          </div>
          <div class="title border-none se-display">
            <el-tag type="success" class="font-ls-1">主讲人：崔老师</el-tag>
          </div>
        </div>
        <div class="right">
          <div class="ec-display">
            <el-button
              type="warning"
              size="small"
              @click="goToStudy(item)"
              class="font-ls-1"
              ><span class="font-ls-1">继续学习</span></el-button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="cross">
      <div class="block">
        <div style="width: 100%; margin: 20px 0 10px 0">
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
  </div>
</template>

<script>
export default {
  name: "ClassPage",
  props: {
    textinfo: String,
  },
  data() {
    return {
      // 课程进度-临时
      percentage: 20,
      // 课程列表
      classList: [],
      // 分页信息
      total: 100,
      pageIndex: 1,
      pageNum: 10,
    };
  },
  mounted() {
    this.getUserClassList();
    this.$myglobalop.rmLoading();
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
    // 查询用户课程列表
    getUserClassList() {
      this.$uapi.classInfo
        .userClassList({ userId: this.$store.state.user.userInfo.id })
        .then((res) => {
          // console.log(res.data.data);
          this.classList = res.data.data;
        });
    },
    // 跳转学习页面
    goToStudy(val) {
      // console.log(val);
      // this.$router.push("/player/" + val.curriculumId + "/1/1");
      this.$myglobalop.showLoading(
        this,
        "/player/" + val.curriculumId + "/1/1"
      );
    },
    // 查询下一页
    searchListInfo() {
      console.log("change");
    },
    getUrl(val) {
      return process.client ? this.$myglobalop.getFullUrl(this, val) : "";
    },
  },
};
</script>

<style scoped lang="less">
@height: 160px;

.outSide {
  width: 100%;
  height: 100%;
  padding: 10px 30px;
  background-color: #fff;

  .cross {
    width: 100%;
  }

  .top {
    height: 50px;
    border-bottom: 1px solid #eaebec;
    margin-bottom: 20px;
  }
}
.item {
  height: @height;
  position: relative;
  padding: 0 0 15px 0;
  margin: 0 0 15px 0;
  border-bottom: 1px solid #eee;

  img {
    position: absolute;
    left: 0;
    top: 0;
    width: 120px;
    height: @height;
    border-radius: 4px;
    box-shadow: 0 0 4px #aaa;
  }

  .right {
    position: absolute;
    right: 0;
    top: 0;
    width: 100px;
    height: @height;
  }

  .content {
    padding-left: 120px;
    padding-right: 100px;
    width: 100%;
    height: @height;

    .title {
      height: 20%;
      padding: 0 15px;
    }

    .tar {
      height: 25%;
      padding: 0 15px;
    }

    .process {
      height: 10%;
      padding: 0 15px;
    }
  }
}
</style>
