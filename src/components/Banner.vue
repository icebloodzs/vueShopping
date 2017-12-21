<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" @click="routerClickdetails" v-for="str in listImg" :style="{ backgroundImage: 'url(' + str.url + ')' }" :key="str.id"></div>
        </div>
        <div class="swiper-pagination swiper-pagination-white"></div>
    </div>
</template>

<script>
import Swiper from "swiper";
import $ from "jquery";
import "swiper/dist/css/swiper.min.css";

export default {
  props: ["listImg"],
  data: function() {
    return {
      counter: this.listImg
    };
  },
  methods: {
     routerClickdetails() {
      this.$router.push("/dist/details");
    }
  },
  mounted() {
    // console.log(this.counter.length);
    let that = this;
    var swiper = new Swiper(".swiper-container", {
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
        renderFraction: function(currentClass, totalClass) {
          if (that.counter.length === 1) return;
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
      loop: true,
      speed: 600,
      autoplay: this.counter.length === 1 ? false : true,
     
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