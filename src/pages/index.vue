<template>
  <!--首页-->
  <div class="wrapper">
    <!-- 轮播 -->
    <app-banner :listImg="listImg"></app-banner>
    <div class="circles index" @click="routerClickhome">首页</div>
    <div class="circles personal" @click="routerClickcenter">个人<br>中心</div>
    <div class="classify">
      <div class="classify-list list1" v-for="item in classify" @click="clickClassify(item.id)"><img :src="item.icon">{{item.name}}</div>
    </div>
    <div class="more">
      <span>大牌抢购</span>
      <span @click="routerClick">更多
        <i class="iconfont">&#xe62d;</i>
      </span>
    </div>
    <div class="left-icon"></div>
    <div class="content">
      <div class="content-item" v-for="item in goodsList">
        <router-link :to="{path:'/dist/details',query:{id:item.id}}" tag="img" class="content-img" :src="item.thumbnail"></router-link>
        <div class="content-middle">
          <span>
            <strong>{{item.name}}</strong>
          </span>
          <div class="price">
            <span>{{item.price_spike}}</span>
            <span>元</span>
            <span>{{item.original_price}}元</span>
          </div>
          <div class="remain">
            <mu-linear-progress :max="item.total" class="progress" mode="determinate" color="#1e7fea" :value="item.surplus" />
            <span>剩余{{item.surplus}}份</span>
          </div>
        </div>
         <span v-if="!item.surplus" class="content-right" :style="{backgroundColor:notenoughcolor}">已抢光</span>
          <span v-else class="content-right" @click="routerDetail(item.id)">立即抢购</span>
      </div>
      <p class="nomore" v-show="nomore">--------我是有底线的--------</p>
      <!--上拉加载更多的组件-->
      <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" />
    </div>
  </div>
</template>

<script>
import Banner from "../components/Banner.vue";
import api from "@/api";
import InfiniteLoading from "vue-infinite-loading";

export default {
  components: {
    "app-banner": Banner
    // InfiniteLoading
  },
  data() {
    return {
      listImg: [],
      items: [],
      classify: [],
      goodsList: [],
      config: [],
      fan_id: 30,
      config: [],
      total: [],
      total_pages: [],
      nomore: false,
      scroller: null,
      page: 1,
      loading: false,
      notenoughcolor:'#ccc'
    };
  },
  created() {},
  mounted() {
    this.scroller = this.$el;
    this.getImgData();
    this.getClassifyData();
    this.getGoodsData();
    this.getConfigData();
  },
  methods: {
    routerDetail(goodsid){
      this.$router.push({
        path: "/dist/details",
        query: {id:goodsid}
      });
    },
    routerClick() {
      this.$router.push("/dist/more");
    },
    routerClickcenter() {
      this.$router.push({
        path: "/dist/mycenter",
        query: { fan_id: this.fan_id }
      });
    },
    clickClassify(classId) {
      this.$router.push({ path: "/dist/more", query: { classId: classId } });
    },
    routerClickhome() {
      this.$router.go(0);
    },
    //配置获取
    async getConfigData() {
      const { data } = await api.get("app_config");
      this.config = data;
      Window.AppConfig.uid = this.config.uid;
      // console.log(this.config)
    },
    // 轮播图数据获取
    async getImgData() {
      const { data } = await api.get("carousel_images");
      this.listImg = data.data;
    },
    // 分类数据获取
    async getClassifyData() {
      const { data } = await api.get("classifications");
      this.classify = data.data;
    },
    //首页商品数据获取
    async getGoodsData() {
      const { data } = await api.get("goods_list", {
        order: "index"
      });
      this.goodsList = data.data;
    },
    //更多商品数据获取
    async getMoreData() {
      let arr = [];
      let that = this;
      const { data } = await api.get("goods_list", {
        order: "index",
        page: this.page
      });
      arr = data.data;
      if (arr.length === 0) {
        that.loading = false;
        that.nomore = true;
        return;
      }
      that.goodsList = [...that.goodsList, ...arr];
      arr = [];
      that.loading = false;
    },
    //  上拉加载
    async loadMore() {
      if (!this.nomore) {
        this.loading = true;
        this.page += 1;
        setTimeout(() => {
          this.getMoreData();
        }, 1000);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "../style/mixin";
.wrapper {
  position: relative;
  background-color: #fbfcfe;
  height: 100%;
   .nomore {
    color: #666;
    text-align: center;
    line-height: 2;
    font-size: rem(30);
  }
  .circles {
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
    opacity: 0.8;
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
      height: rem(170);
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: rem(27);
      img {
        height: rem(66);
        margin-top: rem(35);
        margin-bottom: rem(20);
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
  .content {
    // margin-bottom: rem(23);
    .content-item {
      position: relative;
      height: rem(212);
      background-color: #fff;
      display: flex;
      flex-direction: row;
      margin-bottom: rem(15);
      .content-img {
        width: rem(212);
        margin-right: rem(5);
      }
      .content-middle {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: rem(30) 0;
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
        position: absolute;
        background-color: #ff9c00;
        right: rem(30);
        top: rem(70);
        width: rem(150);
        height: rem(66);
        font-size: rem(25);
        color: #fff;
//  background-color: rgb(254, 254, 254);
        text-align: center;
        line-height: rem(66);
        border-radius: rem(5);
      }
    }
  }
}
</style>
<style lang="scss">
@import "../style/mixin";
.mu-infinite-scroll {
  background-color: rgb(254, 254, 255);
   overflow: auto;
   -webkit-overflow-scrolling: touch;
  .mu-infinite-scroll-text {
    font-size: rem(30);
    line-height:2;
  }
}
</style>