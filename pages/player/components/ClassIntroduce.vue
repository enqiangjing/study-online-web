<template>
  <div class="cc-display border-none page-middle">
    <div class="outSide so_middle border-none">
      <el-row :gutter="0">
        <el-col :span="10" class="border-none hidden-sm-and-down">
          <div class="imgleft border-none">
            <img :src="aaaImg" alt="" />
          </div>
        </el-col>
        <el-col
          :span="14"
          :xs="{ span: 24 }"
          :sm="{ span: 24 }"
          :md="{ span: 14 }"
          class="border-none"
        >
          <div class="textright border-none">
            <div class="classname cc-display">
              <span class="font-s-20 font-c-6 font-ls-1 t-shdow-2">{{
                aaatitle
              }}</span>
              <span
                class="font-s-15 font-c-elp font-ls-1 t-shdow-1"
                style="padding-top: 6px"
                >&nbsp;&nbsp;&nbsp;&nbsp;讲师:&nbsp;</span
              >
              <span
                class="font-s-15 font-c-eld font-ls-1 t-shdow-1"
                style="padding-top: 6px"
                >崔老师</span
              >
            </div>
            <div style="height: 20px"></div>
            <div class="classdesc sc-display">
              <span class="font-s-14 font-ls-2 font-c-7 span-l-6"
                >&nbsp;&nbsp;&nbsp;&nbsp;{{ aaaDesc }}</span
              >
            </div>
            <div style="height: 20px"></div>
            <div class="classispublic cc-display">
              <span class="font-s-16 font-c-elw font-ls-1 t-shdow-1">{{
                aaaIsPublis
              }}</span>
            </div>
            <div style="height: 10px"></div>
            <div class="item cc-display wxadd">
              <img :src="aaaWx" alt="" />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClassIntroduce",
  props: ["classIntroduce"],

  computed: {
    aaaImg() {
      // let url = "";
      // if (this.classIntroduce && this.classIntroduce.thumbnail) {
      //   url = this.classIntroduce.thumbnail;
      // }
      // return url;
      return process.client && this.classIntroduce && this.classIntroduce.banner
        ? this.$myglobalop.getFullUrl(this, this.classIntroduce.banner)
        : this.classIntroduce.banner;
    },
    aaaIsPublis() {
      if (
        this.classIntroduce &&
        this.classIntroduce.isPublic &&
        this.classIntroduce.isPublic == "v"
      ) {
        return "本课程需付费，请添加老师微信（WX20316031）咨询";
      }
      return "公开课，请添加老师微信（WX20316031）开通";
    },
    aaaDesc() {
      if (this.classIntroduce && this.classIntroduce.desc) {
        return this.classIntroduce.desc;
      }
      return "暂无介绍";
    },
    aaatitle() {
      if (this.classIntroduce && this.classIntroduce.title) {
        return this.classIntroduce.title;
      }
      return "暂无介绍";
    },
    aaaWx() {
      return process.env.baseUrl + "imgs/class/wx.jpg";
    },
  },
};
</script>

<style lang="less" scoped>
.outSide {
  min-height: 400px;
  margin: 32px 0 20px 0;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 6px #efefef;
  position: relative;
}
.wxadd {
  img {
    height: 140px;
    width: 140px;
    box-shadow: 0 0 4px #baabac;
    border-radius: 4px;
  }
}
.imgleft {
  width: 100%;
  height: 400px;
  padding: 20px 0 20px 20px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
}
.textright {
  width: 100%;
  padding: 0 20px 0 20px;
}
.classname {
  height: 60px;
}
.classdesc {
  height: 90px;
}
.classispublic {
  height: 40px;
}
</style>