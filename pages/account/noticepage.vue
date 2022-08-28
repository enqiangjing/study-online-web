<template>
  <div class="border-none outSide">
    <!-- 标题文字 -->
    <div class="cross top sc-display">
      <span class="font-s-20 font-ls-2 t-shdow-2-1">通知信息列表</span>
    </div>
    <!-- 列表 -->
    <div class="cross">
      <div class="item sc-display" v-for="item in noticeList" :key="item.id">
        <div class="num sc-display">
          <el-tag type="" size="small">{{ item.id }}</el-tag>
        </div>
        <span class="font-s-15 moreinfo item-text font-ls-1"
          >系统通知信息标题文字</span
        >
      </div>
    </div>
    <!-- 分页 -->
    <div class="cross">
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
  </div>
</template>

<script>
export default {
  name: "NoticePage",
  props: {
    textinfo: String,
  },
  data() {
    return {
      // 通知列表
      noticeList: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
      ],
      // 分页信息
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
  },
  mounted() {
    this.$myglobalop.rmLoading();
  },
};
</script>

<style scoped lang="less">
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
    border-bottom: 1px solid #ccc;
    margin-bottom: 15px;
  }
}

.item {
  height: 50px;
  padding: 0 0 10px 0;
  border-bottom: 1px solid #eee;
  margin: 0 0 10px 0;

  .num {
    width: 50px;
    height: 100%;
  }

  .item-text {
    cursor: pointer;
    &:hover {
      font-weight: 600;
      color: #f56c6c;
    }
  }
}
</style>
