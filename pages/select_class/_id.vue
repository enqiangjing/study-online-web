<template>
  <div class="select_class-page cc-display page-middle">
    <div class="so_middle">
      <div class="line-a"></div>
      <div class="lunbo cc-display border-none">
        <div class="inside">
          <el-carousel :interval="6000" type="card" height="240px">
            <el-carousel-item v-for="(item, index) in imgList" :key="index">
              <el-image
                style="width: 100%; height: 100%; border-radius: 4px"
                :src="getUrl(item.value)"
                fit="cover"
                @click="goToArticlePage(item.about)"
              ></el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>

      <div class="line-b"></div>
      <div class="title"><span class="t-shdow-2-2 font-ls-1">公开课</span></div>
      <div class="line-c"></div>
      <div class="gongkai">
        <div
          v-for="(item, index) in publicClassList"
          :key="item.id + '_' + index"
          :style="{
            float: 'left',
            width: '25%',
            height: '100%',
            padding: index == 0 ? '0' : '0 0 0 30px',
          }"
          class="border-none"
        >
          <GongKaiKe :class-info="item" />
        </div>
      </div>

      <div class="line-b"></div>
      <div class="title"><span class="t-shdow-2-2 font-ls-1">专栏</span></div>
      <div class="line-c"></div>

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in subjectType"
          :key="'tab' + index + item.val"
          :name="item.val"
        >
          <span slot="label" class="font-s-16">{{ item.name }}</span>
          <template v-if="item.val == activeName">
            <div v-for="(item_i, index) in classList" :key="'zhuanlan' + index">
              <div style="width: 32%; float: left; margin-bottom: 20px">
                <ZhuanLan :class-info="item_i" />
              </div>
              <div
                v-if="index % 3 != 2"
                style="width: 2%; float: left; height: 10px"
              ></div>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
      <div class="line-c"></div>
    </div>
  </div>
</template>

<script>
import ZhuanLan from "./components/zhuanlan.vue";
import GongKaiKe from "./components/gongkaike.vue";

export default {
  name: "SelectClass", // 文章页面
  components: {
    ZhuanLan,
    GongKaiKe,
  },
  data() {
    return {
      subjectType: [
        { name: "全部", val: "All" },
        { name: "数学", val: "Maths" },
        { name: "英语", val: "English" },
        { name: "语文", val: "Language" },
        { name: "政治", val: "Politics" },
      ],
      activeName: "All",
    };
  },

  async asyncData({ $axios, params }) {
    let publicClassList = [];
    let classList = [];
    let imgList = [];
    // 01.查询公开课
    const { data: a_data } = await $axios.post(
      process.env.baseUrl + "api/classInfoService/getCurriculumListPub",
      {
        isPublic: "p",
      }
    );
    // 02.查询课程
    const { data: b_data } = await $axios.post(
      process.env.baseUrl + "api/classInfoService/getCurriculumList",
      {}
    );
    // 03.轮播课
    const { data: c_data } = await $axios.post(
      process.env.baseUrl + "api/systemService/getSelectClassCarouselImg",
      {}
    );
    // 结果校验
    if (
      a_data &&
      (a_data.errCode == "success" || a_data.errCode == "2000") &&
      a_data.data
    ) {
      publicClassList = a_data.data;
    }
    if (
      b_data &&
      (b_data.errCode == "success" || b_data.errCode == "2000") &&
      b_data.data
    ) {
      classList = b_data.data;
    }
    if (
      c_data &&
      (c_data.errCode == "success" || c_data.errCode == "2000") &&
      c_data.data
    ) {
      imgList = c_data.data;
    }

    // 服务端渲染值
    return {
      publicClassList: publicClassList,
      classList: classList,
      imgList: imgList,
    };
  },

  methods: {
    // 课程类型tab页切换
    handleClick(val) {
      this.getcurriculumList({ subject: val.name == "All" ? "" : val.name });
    },
    // 查询课程列表
    getcurriculumList(data) {
      this.$uapi.classInfo.curriculumList(data).then((res) => {
        this.classList = res.data.data;
      });
    },
    // 页面跳转
    goToArticlePage(val) {
      // window.open(process.env.baseUrl + val);
      this.$myglobalop.showLoading(this, "/" + val);
    },
    // 获取轮播图地址
    getUrl(val) {
      return process.client ? this.$myglobalop.getFullUrl(this, val) : "";
    },
  },

  mounted() {
    this.$myglobalop.rmLoading();
  },
};
</script>

<style lang="less" scoped>
.select_class-page {
  padding: 0;
  width: 100%;
}
.lunbo {
  width: 100%;
  height: 340px;
  border-radius: 4px;
  // box-shadow: 0 0 4px #ebeced;
  background: radial-gradient(at right top, #409eff, #888, #f56c6c);
  padding-top: 14px;

  .inside {
    width: 94%;
  }
}
.line-a {
  height: 30px;
}
.line-b {
  height: 50px;
}
.line-c {
  height: 18px;
}
.gongkai {
  width: 100%;
  height: 280px;
}
.title {
  font-size: 26px;
  color: #555;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>