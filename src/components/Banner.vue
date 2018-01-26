<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" @click="routerClickdetails(str.goods_id)" v-for="str in listImg" :style="{ backgroundImage: 'url(' + str.image_url + ')' }" :key="str.id"></div>
    </div>
    <div class="swiper-pagination swiper-pagination-white"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import $ from "jquery";
import "swiper/dist/css/swiper.min.css";
import "swiper/dist/js/swiper.min.js";
export default {
  props: ["listImg"],
  data: function() {
    return {
      counter: this.listImg
    };
  },
  methods: {
    routerClickdetails(goods_id) {
      this.$router.push({path:"/dist/details",query:{id:goods_id,lng:116.30387397,lat:39.91481908}});
    }
  },
  created() { },
  mounted() {
    let that = this;
    var swiper = new Swiper(".swiper-container", {
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
        renderFraction: function(currentClass, totalClass) {
          // if (that.counter.length <= 1) return;
          return (
            '<span class="' +
            currentClass +
            '" style="color:#fff;"></span>' +
            " / " +
            '<span class="' +
            totalClass +
            '"></span>'
          );
        }
      },
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
      // speed: 600,
      autoplay: this.counter.length === 1 ? false : true
    });
  }
};
</script>
<style scoped lang="scss">
@import "../style/mixin";
.swiper-container {
  width: 100%;
  height: rem(290);
  .swiper-wrapper {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .swiper-pagination-fraction {
    width: 16%;
    color: #aaaaaa;
    font-size: rem(30);
  }
}
</style>