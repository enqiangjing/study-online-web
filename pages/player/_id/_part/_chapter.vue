<template>
  <el-main style="min-height: 532px">
    <template v-if="!viewPromise && showFinal">
      <ClassIntroduce :class-introduce="classIntruduce" />
      <div style="height: 80px"></div>
    </template>
    <template v-else-if="viewPromise && showFinal">
      <PlayerWindow
        v-if="viewPromise && showFinal"
        :playerInfo="currentChapter"
        :playUrl="playUrl"
      />
      <Introduce
        class="page-middle"
        :classIntruduce="classIntruduce"
        :classLecturer="classLecturer"
        :remoteImgDomain="$store.state.user.userInfo.remoteImgDomain"
      />
      <div style="height: 20px"></div>
      <div v-for="(item, index) in videChapter" :key="index">
        <div style="width: 100%" class="cc-display page-middle">
          <div class="so_middle" style="margin-top: 20px">
            <span class="font-s-18 font-w-6 font-c-1"
              >第{{ item[0].part }}章</span
            >
            &nbsp;
            <span>{{ item[0].partName }}</span>
          </div>
        </div>
        <div style="width: 100%" class="cc-display page-middle">
          <div class="so_middle">
            <ClassBrowse :chapterlist="item" :partid="item[0].part" />
          </div>
        </div>
      </div>
    </template>
  </el-main>
</template>

<script>
import PlayerWindow from "~/components/block/PlayerWindow.vue";
import Introduce from "~/components/block/Introduce.vue";
import ClassBrowse from "~/components/block/ClassBrowse.vue";
import ClassIntroduce from "../../components/ClassIntroduce.vue";

export default {
  name: "Player",
  components: {
    PlayerWindow,
    Introduce,
    ClassBrowse,
    ClassIntroduce,
  },
  data() {
    return {
      videChapter: [],
      playUrl: "",
      viewPromise: false,
      classIntruduce: { desc: "", heat: "", classHour: "" },
      showFinal: false,
      classLecturer: { userName: "", hot: "", userImg: "" },
      currentChapter: { linkUrl: "" },
    };
  },
  methods: {
    // 获取视频列表
    getCurriculumChapter() {
      let video_params = this.$route.params;
      this.$uapi.classInfo
        .videoCurriculumChapter({
          id: video_params.id,
          part: video_params.part,
          chapter: video_params.chapter,
        })
        .then((res) => {
          this.videChapter = res.data.data;
          this.currentChapter =
            this.videChapter[parseInt(this.$route.params.part) - 1][
              parseInt(this.$route.params.chapter) - 1
            ];
          // console.log(this.currentChapter);
          this.$uapi.classInfo
            .getVideoUrl({ videoName: this.currentChapter.linkUrl })
            .then((rss) => {
              this.playUrl = rss.data.data;
              // console.log(this.playUrl);
            });
        });
    },
    // 查询课程介绍
    getClsIntroduce() {
      this.$uapi.classInfo
        .curriculumInfo({
          classId: this.$route.params.id,
        })
        .then((res) => {
          // console.log(res.data);
          this.classIntruduce = res.data.data;
          // console.log(this.classIntruduce);
          this.$uapi.user
            .getUserInfoSimple({ userNo: res.data.data.lecturer })
            .then((ress) => {
              this.classLecturer = ress.data.data;
              // console.log(this.classLecturer);
              // console.log(this.classLecturer);
            });
        });
    },
    // 判断是否有课程观看权限
    checkPromise() {
      if (!this.$store.state.user.isLoginFlag) {
        this.viewPromise = false;
        this.getClsIntroduce();
        this.showFinal = true;
        return;
      }
      this.$uapi.classInfo
        .userClassList({
          userId: this.$store.state.user.userInfo.id,
          videId: this.$route.params.id,
        })
        .then((res) => {
          let myClass = res.data.data;
          if (myClass && myClass.length) {
            this.getCurriculumChapter();
            this.viewPromise = true;
            this.showFinal = true;
          } else {
            this.viewPromise = false;
            this.showFinal = true;
          }
          this.getClsIntroduce();
        });
    },
  },
  mounted() {
    this.checkPromise();
    this.$myglobalop.rmLoading();
  },
};
</script>

<style lang="less" scoped>
.el-main {
  padding: 0;
}
</style>