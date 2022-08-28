<template>
  <div class="block">
    <el-carousel height="420px" :interval="6000">
      <el-carousel-item v-for="item in imgList" :key="item.id">
        <el-image
          style="width: 100%; height: 100%; cursor: pointer"
          :src="getUrl(item.value)"
          fit="cover"
          @click="goToArticlePage(item.about)"
        ></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  name: "Carousel",
  props: ["imgList"],
  data() {
    return {
      conut: 0,
    };
  },
  methods: {
    goToArticlePage(val) {
      this.$myglobalop.showLoading(this, "/" + val);
    },
    getUrl(val) {
      return process.client ? this.$myglobalop.getFullUrl(this, val) : "";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.img-crousel {
  width: 100%;
}

.block {
  border-radius: 4px;
  box-shadow: 0 0 6px #999;
  overflow: hidden;
}
</style>
