<template>
  <div class="cc-display page-middle">
    <div class="so_middle">
      <Carousel
        msg="carsouel"
        :img-list="homeCarousel"
        style="margin-top: 30px"
      />
      <TextLine msg="经验交流" />
      <div style="width: 100%; height: 200px" class="cc-display">
        <BlockClass :textlist="experienceList[0]" style="margin-right: 1.5%" />
        <BlockClass :textlist="experienceList[1]" style="margin-right: 1.5%" />
        <BlockClass :textlist="experienceList[2]" style="margin-right: 1.5%" />
        <BlockClass :textlist="experienceList[3]" />
      </div>
      <TextLine msg="精品课程" />
      <div style="width: 100%; height: 200px" class="cc-display">
        <BlockImg :videolist="fireVide[0]" style="margin-right: 1.5%" />
        <BlockImg :videolist="fireVide[1]" style="margin-right: 1.5%" />
        <BlockImg :videolist="fireVide[2]" style="margin-right: 1.5%" />
        <BlockImg :videolist="fireVide[3]" />
      </div>
      <div style="height: 160px; width: 100%" class="cc-display">
        <ButtonImg textin="名师推荐" urlin="article/8" />
        <ButtonImg
          textin="直播预告"
          urlin="article/7"
          style="margin-left: 200px"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from "@/components/block/Carousel.vue";
import TextLine from "@/components/text/TextLine.vue";
import BlockClass from "@/components/block/BlockClass.vue";
import BlockImg from "@/components/block/BlockImg.vue";
import ButtonImg from "@/components/button/ButtonImg.vue";

export default {
  name: "PageIndex",
  components: {
    Carousel,
    TextLine,
    BlockClass,
    BlockImg,
    ButtonImg,
  },

  /**
   * @method asyncData 服务端进行数据渲染
   * @augments experienceList|fireVide 经验交流区数据|精品课程数据
   */
  async asyncData({ $axios }) {
    // 01.经验交流数据
    let experienceList = [
      { list: [], title: "" },
      { list: [], title: "" },
      { list: [], title: "" },
      { list: [], title: "" },
    ];
    // 发起查询
    const { data: e_data } = await $axios({
      method: "GET",
      url: process.env.baseUrl + "api/contentService/experience",
    });
    // 结果校验
    if (e_data && e_data.data && e_data.data.length > 0) {
      experienceList = e_data.data;
    }

    // 02.精品课程数据
    let fireVide = [
      { thumbnail: "" },
      { thumbnail: "" },
      { thumbnail: "" },
      { thumbnail: "" },
    ];
    // 发起查询
    const { data: v_data } = await $axios({
      method: "GET",
      url: process.env.baseUrl + "api/contentService/fireVideo",
    });
    // 结果校验
    if (v_data && v_data.data && v_data.data.length > 0) {
      fireVide = v_data.data;
    }

    // 03.首页轮播图
    let homeCarousel = [{ src: "", id: 1, url: "" }];
    // 发起查询
    const { data: h_data } = await $axios({
      method: "GET",
      url: process.env.baseUrl + "api/systemService/getHomeCarouselImg",
    });
    // 结果校验
    if (h_data && h_data.data && h_data.data.length > 0) {
      homeCarousel = h_data.data;
    }

    // 返回
    return {
      experienceList: experienceList,
      fireVide: fireVide,
      homeCarousel: homeCarousel,
    };
  },

  mounted() {
    this.$myglobalop.rmLoading();
  },
};
</script>

<style lang="less" scoped>
</style>