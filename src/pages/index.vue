<template>
  <!--首页-->
  <div class="wrapper">
    <!-- 轮播 -->
    <app-banner :listImg="listImg"></app-banner>
    <div class="circle index" @click="routerClickhome">首页</div>
    <div class="circle personal" @click="routerClickcenter">个人<br>中心</div>
    <div class="classify">
      <div class="classify-list list1" v-for="(item,index) in classify">
          <img :src="item.icon" @click="routerClassificationClick(item.id)">
          {{item.name}}
      </div>
    </div>
    <div class="more">
      <span>大牌抢购</span>
      <span @click="routerClick">更多<i class="iconfont">&#xe62d;</i></span>
    </div>
    <div class="left-icon"></div>
    <div class="content-item" v-for="(item,index) in goodsList">
      <router-link :to="{path:'/dist/details'}" tag="img" class="content-img" :src="item.thumbnail">立即抢购</router-link>
      <div class="content-middle">
        <span><strong>{{item.name}}</strong></span>
        <!-- <span> <strong>五折优惠</strong></span> -->
        <div class="price">
          <span>{{item.original_price}}</span>
          <span>元</span>
          <span>{{item.price_spike}}</span>
        </div>
        <div class="remain">
          <mu-linear-progress :max="200" class="progress" mode="determinate" color="#1e7fea" :value="item.surplus"/>
          <span>剩余{{item.surplus}}份</span>
        </div>
      </div>
      <router-link :to="{path:'/dist/details',query:{id:item.id,lng:116.30387397,lat:39.91481908}}" tag="div"
                   class="content-right">立即抢购
      </router-link>
    </div>
  </div>
</template>

<script>
  import $ from "jquery";
  import Banner from "../components/Banner.vue";


  import axios from "axios";

  export default {
    components: {
      "app-banner": Banner
    },
    data() {
      return {
        listImg: [],
        items: [],
        classify: [],
        goodsList: [],
        basePath: "http://dev.mp.duduapp.net",
        has_id: "1wxAvPWzQro2G4RXkBrd",
        config: []
      };
    },
    // 组件创建完后获取数据，
    created() {
      this.getImgData()
      this.getClassifyData()
      this.getGoodsData()
    },
    methods: {
      routerClick() {
        this.$router.push("/dist/more");
      },
      routerClassificationClick(id) {
        this.$router.push("/dist/more");
      },
      routerClickcenter() {
        this.$router.push("/dist/mycenter");
      },

      routerClickhome() {
        this.$router.go(0);
      },
      // 轮播图数据获取
      getImgData() {
        let that = this
        let url = `${this.basePath}/h5/${this.has_id}?action=carousel_images`
        axios.get(url, {
          headers: {'Token': 'elo4aEFQdDVMMGZwMFJVb3pub1Rqd1piSklGclY4ZjBjNSthOXNUd1VORT0.'},
        }).then(function (response) {
          that.listImg = response.data.data
        })
      },
      getClassifyData() {
        let that = this
        let url = `${this.basePath}/h5/${this.has_id}?action=classifications`
        axios.get(url, {
          headers: {'Token': 'elo4aEFQdDVMMGZwMFJVb3pub1Rqd1piSklGclY4ZjBjNSthOXNUd1VORT0.'},
        }).then(function (response) {
          that.classify = response.data.data
          console.log(that.classify)
        })
      }, getGoodsData() {
        let that = this
        let url = `${this.basePath}/h5/${this.has_id}?action=goods_list`
        axios.get(url, {
          headers: {'Token': 'elo4aEFQdDVMMGZwMFJVb3pub1Rqd1piSklGclY4ZjBjNSthOXNUd1VORT0.'},
        }).then(function (response) {
          that.goodsList = response.data.data
        })
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
      font-size: rem(22);
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
    }

    .classify {
      display: flex;
      justify-content: space-around;
      background-color: #fff;
      height: rem(170);

      .classify-list {
        // width: 25%;
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
        margin-left: rem(37);
      }
      span:nth-child(2) {
        font-size: rem(30);
        color: #17bafb;
        margin-right: rem(35);
        .iconfont {
          font-family: "iconfont";
          font-style: normal;
          margin-left: rem(13);
        }
      }
    }
    .left-icon {
      width: rem(15);
      height: rem(45);
      background-color: #1e7fea;
      position: absolute;
      border-radius: 0 rem(6) rem(6) 0;
      top: rem(504);
      left: 0;
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
        justify-content: space-between;
        margin-top: rem(28);
        span:nth-child(1) {
          width: rem(300);
          font-size: rem(30);
          line-height: rem(30);
        }
        .price {
          span {
            font-size: rem(25);
            color: #d2d2d2;
            text-decoration: line-through;
            line-height: 1.5;
          }
          span:nth-child(1) {
            color: #1e80eb;
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
          justify-content: space-between;
          flex-wrap: nowrap;
          .progress {
            width: rem(200);
            margin-right: rem(6);
            height: rem(14);
            border-radius: rem(7);
            background-color: #e4e4e4;
          }
          span {
            display: block;
            color: #666;
            height: rem(28);
            font-size: rem(28);
            line-height: rem(28);
            margin-top: rem(-8);
          }
        }
      }
      .content-right {
        background-color: #ff9c00;
        margin: auto;
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
