<template>
  <div :id="'searchResultBox' + searchlist.id" class="sc-display srb-out">
    <!-- 图片 -->
    <img :src="imgUrl" class="border-none img-url" style="object-fit: cover" />

    <!-- 详情 -->
    <div class="searchResultItem">
      <!-- 标题 -->
      <div class="sc-display top">
        <span
          class="font-s-18 moreinfo font-ls-1 t-shdow-1 font-c-5 topage"
          style="max-width: 340px; cursor: pointer"
          @click="toPage()"
          :title="searchlist.title"
          >{{ searchlist.title }}</span
        >
        <!-- <span
          class="font-s-15 moreinfo font-c-eld font-ls-1"
          style="max-width: 160px"
          >（赵老师精品课程）</span
        > -->
      </div>
      <!-- 时间 -->
      <div class="border-none sc-display middle">
        <span class="font-s-14 font-c-7"><b>类&nbsp;&nbsp;型：</b></span>
        <span class="font-s-14 font-c-elp font-ls-1">{{
          searchlist.type
        }}</span>
      </div>
      <!-- 简介 -->
      <div class="ss-display border-none bottom">
        <span class="font-s-14 span-l-3 font-c-7"
          ><b>简&nbsp;&nbsp;介：</b>{{ searchlist.content }}</span
        >
      </div>
      <div class="sc-display border-none footer">
        <i
          class="el-icon-view font-s-15 font-w-6 font-ls-1 font-c-eld"
          style="margin-top: 2px; margin-right: 4px"
        ></i>
        <span class="font-s-14 font-w-6 font-ls-1 font-c-8">{{
          searchlist.readTimes
        }}</span>
      </div>
      <!-- 课程的话展示章节 -->
      <!-- <div class="se-display border-none footer">
        <div class="cc-display item">
          <span class="font-s-14">01&nbsp;&nbsp;&nbsp;</span>
          <span class="font-s-14">入门第一讲</span>
        </div>
        <div class="cc-display item">
          <span class="font-s-14">01&nbsp;&nbsp;&nbsp;</span>
          <span class="font-s-14">入门第一讲</span>
        </div>
        <div class="cc-display item">
          <span class="font-s-14">01&nbsp;&nbsp;&nbsp;</span>
          <span class="font-s-14">入门第一讲</span>
        </div>
        <div class="cc-display item">
          <span class="font-s-14">01&nbsp;&nbsp;&nbsp;</span>
          <span class="font-s-14">入门第一讲</span>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  /**
   * 组件名称
   */
  name: "CpnSearchResult",

  /**
   * 父组件传值
   */
  props: {
    searchlist: Object,
    remoteImgDomain: String,
  },

  data() {
    return {
      imgUrl: "",
    };
  },

  methods: {
    // 获取缩略图地址
    getImgUrl() {
      if (
        this.searchlist &&
        this.searchlist.thumbnail &&
        this.searchlist.thumbnail.indexOf("http") !== -1
      ) {
        return this.searchlist.thumbnail;
      }
      if (
        this.searchlist &&
        this.searchlist.thumbnail &&
        this.searchlist.thumbnail.indexOf("http") == -1 &&
        this.remoteImgDomain !== ""
      ) {
        return this.remoteImgDomain + this.searchlist.thumbnail;
      }
      return process.env.baseUrl + "imgs/class/class_default.png";
    },

    toPage() {
      this.$myglobalop.showLoading(this, "/article/" + this.searchlist.id);
    },
  },

  mounted() {
    this.imgUrl = this.getImgUrl();
  },
};
</script>

<style scoped lang="less">
.srb-out {
  width: 100%;
  height: 160px;
  position: relative;
  overflow: hidden;
  border-bottom: 2px solid #eee;
  padding-bottom: 30px;
  margin-bottom: 30px;

  .img-url {
    position: absolute;
    top: 0;
    left: 0;
    height: 160px;
    width: 120px;
    border-radius: 4px;
  }

  .searchResultItem {
    height: 160px;
    padding: 0 0 0 132px;
    width: 100%;

    .top {
      width: 100%;
      height: 40px;
      padding-left: 10px;
    }

    .middle {
      width: 100%;
      height: 30px;
      padding-left: 10px;
    }

    .bottom {
      width: 100%;
      height: 60px;
      padding-left: 10px;
    }

    .footer {
      width: 100%;
      height: 30px;
      padding-left: 10px;

      .item {
        width: 23.5%;
        height: 34px;
        background-color: #fafbfc;
        border-radius: 6px;
        margin-right: 1.5%;
        box-shadow: 0 0 4px #eaddbc;
        cursor: pointer;

        &:hover {
          background-color: #f56c6c;
          color: #fff;
        }
      }
    }
  }
}

.topage {
  &:hover {
    color: #f56c6c;
  }
}
</style>
