<template>
<!--首页-->
    <div class="wrapper">
        <!-- 轮播 -->
        <app-banner :listImg="listImg"></app-banner>
        <div class="circle index"  @click="routerClickhome">首页</div>
        <div class="circle personal"  @click="routerClickcenter">个人<br>中心</div>
        
        <div class="classify">
            <div class="classify-list list1"><img src="../assets/img/list_03.jpg" >特惠</div>
            <div class="classify-list list2"><img src="../assets/img/list_03.jpg" >抢购</div>
            <div class="classify-list list3"><img src="../assets/img/list_03.jpg" >优惠</div>
            <div class="classify-list list4"><img src="../assets/img/list_03.jpg" >红包</div>
        </div>
        <div class="more">
            <span>大牌抢购</span>
            <span  @click="routerClick">更多 ></span>
        </div>
        <div class="content-item">
            <img class="content-img" src="../assets/img/dwqvas_02.jpg">
            <div class="content-middle">
                <span>预装园粥今日大牌抢购</span>
                <span>五折优惠</span>
                <div class="price">
                    <span>58</span>
                    <span>元</span>
                    <span>108元</span>
                </div>
                <div class="remain">
                   <mu-linear-progress class="progress" mode="determinate" color="#1e7fea"  :value="value"/><span>剩余37份</span>
                </div>
            </div>
            <a class="content-right" @click="routerClickdetails">立即抢购</a>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import Banner from "../components/Banner.vue";
import a from "../assets/img/banner1.jpg";
import b from "../assets/img/banner2.jpg";
import c from "../assets/img/banner3.jpg";

import axios from "axios";
export default {
  components: {
    "app-banner": Banner
  },
  data() {
    return {
      value: 50,
     
      listImg: [
        {
          url: a
        },
        {
          url: b
        },
        {
          url: c
        }
      ]
    };
  },
  methods: {
    routerClick() {
      this.$router.push("/dist/more");
    },
    routerClickcenter() {
      this.$router.push("/dist/mycenter");
    },
    routerClickdetails() {
      this.$router.push("/dist/details");
    },
    routerClickhome() {
      this.$router.go(0);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../style/mixin";
.wrapper {
  position: relative;
  background-color: #fbfcfe;
  height: 100vh;
  .circle {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: rem(80);
    height: rem(82);
    border-radius: rem(40);
    background-color: #232323;
    color: #fff;
    font-size: rem(20);
     opacity: .8;
    z-index: 1;
  }
  .index {
    line-height: rem(80);
    top: rem(55);
    left: rem(655);
  }
  .personal {
    top: rem(150);
    left: rem(655);
    line-height: rem(35);
  }

  .classify {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    height: rem(170);

    .classify-list {
      width: 25%;
      height: rem(170);
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: rem(27);
      img {
        margin-top: rem(35);
        margin-bottom: rem(20);
        width: rem(60);
        height: rem(50);
      }
    }
  }
  .more {
    display: flex;
    justify-content: space-between;
    height: rem(90);
    align-items: center;
    background-color: #fff;
    margin-top: rem(20);
    border-bottom: 1px solid #e9e9e9;
    span:nth-child(1) {
      font-size: rem(33);
      font-weight: 600;
      margin-left: rem(35);
    }
    span:nth-child(2) {
      font-size: rem(30);
      color: #71cefa;
      margin-right: rem(35);
    }
  }
  .content-item {
    height: rem(212);
    background-color: #fff;
    display: flex;
    flex-direction: row;
    .content-img {
      width: rem(212);
    }
    .content-middle {
      display: flex;
      flex-direction: column;
      margin-top: rem(28);
      span {
        font-size: rem(30);
        font-weight: 600;
      }
      .price {
        span {
          font-size: rem(25);
          color: #d2d2d2;
          text-decoration: line-through;
        }
        span:nth-child(1) {
          color: #1e7fea;
          font-size: rem(40);
          text-decoration: none;
        }
        span:nth-child(2) {
          font-size: rem(25);
          color: #1e7fea;
          text-decoration: none;
        }
      }
      .remain {
        display: flex;
        flex-direction: row;
        font-size: rem(25);
        color: #d2d2d2;
        height: rem(18);
        line-height: rem(18);
        .progress {
          width: rem(200);
          margin-right: rem(6);
          height: rem(12);
        }
        span {
          font-weight: 400;
          display: block;
          // margin-top: rem(-10);
        }
      }
    }
    .content-right {
      background-color: #ff9c00;
      margin: auto;
      display: block;
      width: rem(150);
      height: rem(66);
      font-size: rem(25);
      color: #fff;
      text-align: center;
      line-height: rem(66);
      border-radius: rem(5);
    }
  }
}
</style>