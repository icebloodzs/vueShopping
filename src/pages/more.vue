<template>
  <div class="wrapper">
    <div class="loading" v-if="isloading">加载中. . .</div>
    <i class="iconfont" @click="routerClickgoback">&#xe600;</i>
    <div class="head-tabs">
      <div class="head-tab">
        <mu-tabs class="tabs" :value="activeTab" @change="handleTabChange" :lineClass="{ blue:isActive,actleft:actleft }">
          <mu-tab value="tab1" @active="tab1Active" title="进行中" />
          <mu-tab value="tab2" @active="tab2Active" title="已结束" />
        </mu-tabs>
      </div>
    </div>
    <div class="main">
      <div v-if="activeTab === 'tab1'">
        <div class="hint" v-if='onhint'></div>
        <div class="content" v-for="item in items">
          <div class="banner-img"></div>
          <img :src="item.thumbnail">
          <moredown :endTime="item.end_time"></moredown>
          <div class="focus">
            <i class="iconfont">&#xe826;</i>
            <span>1236人在关注</span>
          </div>
          <span class="tilte">{{item.name}}</span>
          <div class="content-bottom">
            <div class="price">
              <div class="price-list">
                <span>￥{{item.price_spike}}</span>
                <span>￥{{item.original_price}}</span>
              </div>
              <div class="remain">
                <mu-linear-progress class="progress" mode="determinate" color="#1e7fea" :max="item.total" :value="item.surplus" />
                <span>剩余{{item.surplus}}份</span>
              </div>
            </div>
            <span v-if="!item.surplus" class="button" :style="{backgroundColor:notenoughcolor}">已抢光</span>
            <span v-else class="button" @click="routerClickdetails(item.id)">立即抢购</span>
          </div>
        </div>
        <p class="nomore" v-show="nomore">--------我是有底线的--------</p>
        <!--上拉加载更多的组件-->
        <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" />
      </div>
      <div v-if="activeTab === 'tab2'">
        <div class="hint" v-if='endhint'></div>
        <div class="content" v-for="item in items2">
          <img :src="item.thumbnail">
          <div class="focus">
            <i class="iconfont">&#xe826;</i>1236人在关注</div>
          <span class="tilte">{{item.name}}</span>
          <div class="content-bottom">
            <div class="price">
              <div class="price-list">
                <span>￥{{item.price_spike}}</span>
                <span>￥{{item.original_price}}</span>
              </div>
              <div class="remain">
                <mu-linear-progress class="progress" mode="determinate" color="#1e7fea" :max="item.total" :value="item.surplus" />
                <span>剩余{{item.surplus}}份</span>
              </div>
            </div>
            <div class="button-end">已结束</div>
          </div>
        </div>
        <p class="nomore" v-show="nomore2">--------我是有底线的--------</p>
        <!--上拉加载更多的组件-->
        <mu-infinite-scroll :scroller="scroller" :loading="loading2" @load="loadMore2" />
      </div>

    </div>
  </div>

</template>
<script>
import moredown from "../components/moredown.vue";
export default {
  components: {
    moredown: moredown
  },
  data() {
    return {
      actleft: true,
      isActive: false,
      activeTab: "tab1",
      endTime: "",
      items: [],
      items2: [],
      isloading: false,
      endhint: false,
      onhint: false,
      nomore: false,
      nomore2: false,
      scroller: null,
      page: 1,
      page2: 1,
      loading: false,
      loading2: false,
      notenoughcolor: "#ccc"
    };
  },
  mounted() {
    this.scroller = this.$el;
    this.getMoreData();
  },
  methods: {
    handleTabChange(val) {
      this.activeTab = val;
    },
    routerClickdetails(goodId) {
      this.$router.push({
        path: "/dist/details",
        query: { id: goodId }
      });
    },
    routerClickgoback() {
      this.$router.go(-1);
    },
    tab2Active() {
      this.isActive = true;
      this.getMoreData2();
    },
    tab1Active() {
      this.isActive = false;
      this.getMoreData();
    },
    // 进行中分类数据获取
    async getMoreData() {
      let classId = this.$route.query.classId;
      this.isloading = true;
      if (classId) {
        const { data } = await this.api.get("goods_list", {
          classification_id: classId
        });
        this.items = data.data;
      } else {
        const { data } = await this.api.get("goods_list");
        this.items = data.data;
      }
      this.isloading = false;
      if (!this.items.length) {
        this.onhint = true;
      }
    },
    //进行中更多商品数据获取
    async getMoreDatas() {
      let arr = [];
      let that = this;
      let classId = this.$route.query.classId;
      if (classId) {
        const { data } = await this.api.get("goods_list", {
          classification_id: classId,
          page: this.page
        });
        arr = data.data;
      } else {
        const { data } = await this.api.get("goods_list", {
          page: this.page
        });
        arr = data.data;
      }
      if (arr.length === 0) {
        that.loading = false;
        that.nomore = true;
        return;
      }
      that.items = [...that.items, ...arr];
      arr = [];
      that.loading = false;
    },
    //  进行中上拉加载
    async loadMore() {
      if (!this.nomore) {
        this.loading = true;
        this.page += 1;
        setTimeout(() => {
          this.getMoreDatas();
        }, 1000);
      }
    },
    // 已结束分类数据获取
    async getMoreData2() {
      let classId = this.$route.query.classId;
      this.isloading = true;
      if (classId) {
        const { data } = await this.api.get("goods_list", {
          status: "1",
          classification_id: classId
        });
        this.items2 = data.data;
      } else {
        const { data } = await this.api.get("goods_list", {
          status: "1"
        });
        this.items2 = data.data;
      }
      this.isloading = false;
      if (!this.items2.length) {
        this.endhint = true;
      }
    },
    //已结束更多商品数据获取
    async getMoreDatas2() {
      let arr = [];
      let that = this;
      let classId = this.$route.query.classId;
      if (classId) {
        const { data } = await this.api.get("goods_list", {
          status: "1",
          classification_id: classId,
          page: this.page2
        });
        arr = data.data;
      } else {
        const { data } = await this.api.get("goods_list", {
          status: "1",
          page: this.page2
        });
        arr = data.data;
      }
      if (arr.length === 0) {
        that.loading2 = false;
        that.nomore2 = true;
        return;
      }
      that.items2 = [...that.items2, ...arr];
      arr = [];
      that.loading2 = false;
    },
    //  已结束上拉加载
    async loadMore2() {
      if (!this.nomore2) {
        this.loading2 = true;
        this.page2 += 1;
        setTimeout(() => {
          this.getMoreDatas2();
        }, 1000);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../style/mixin";
@import "../assets/sass/_base.scss";
.wrapper {
  @include wrapper;
  height: 100vh;
  .nomore {
    color: #666;
    text-align: center;
    line-height: 1.5;
    font-size: rem(30);
  }
  .head-tabs {
    background-color: #fff;
    .head-tab {
      width: rem(440);
      margin: 0 auto;
    }
  }
  .hint {
    padding-top: rem(300);
    width: 100%;
    height: rem(1240);
    background: #fff url(../assets/img/vn2l_fw658.png) no-repeat 50% 25% ;
    background-size: rem(197) rem(287);
  }
  .iconfont {
    font-family: "iconfont";
    font-size: rem(50);
    font-style: normal;
    position: absolute;
    width: rem(100);
    top: 0;
    height: rem(80);
    line-height: rem(90);
    padding-left: rem(25);
    color: #666666;
    z-index: 10;
  }
  .mu-tab-link {
    font-size: rem(32);
    background-color: #fff;
    color: #000;
    border: 1px solid #fff;
    height: rem(80);
    line-height: rem(80);
    &.mu-tab-active {
      color: #1979e7;
      height: rem(80);
    }
  }
  .content {
    position: relative;
    margin-top: rem(6);
    margin-bottom: rem(16);
    .banner-img{
      position: absolute;
      width: 100%;
      top: 0;
      height: rem(318);
      background:-webkit-gradient(linear,left top,left bottom,
       from(rgba(255,255,255,0)),
       to(rgba(0,0,0,.5)));
    }
    .time {
      position: absolute;
      font-size: rem(30);
      line-height: 1;
      color: #fff;
      top: rem(268);
      left: rem(12);
    }
    .focus {
      position: absolute;
      font-size: rem(24);
      color: #fff;
      top: rem(270);
      right: rem(28);
      .iconfont {
        top: -0.4rem;
        left: -0.75rem;
        width: rem(17);
        font-size: rem(30);
        height: rem(22);
        position: absolute;
        color: #1f7ee8;
      }
    }
    img {
      width: 100%;
      height: rem(318);
      z-index: 2018;
    }
    .tilte {
      display: block;
      font-size: rem(30);
      line-height: rem(74);
      padding-left: rem(30);
      background-color: #fff;
    }
    .content-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      padding-bottom: rem(23);
      .price {
        margin-left: rem(30);
        .price-list {
          span:nth-child(1) {
            color: #1e7fea;
            font-size: rem(36);
          }
          span:nth-child(2) {
            font-size: rem(26);
            color: #d2d2d2;
            text-decoration: line-through;
            margin-left: rem(10);
          }
        }
        .remain {
          display: flex;
          flex-direction: row;
          color: #d2d2d2;
          height: rem(25);
          line-height: rem(25);
          margin-top: rem(20);
          .progress {
            width: rem(201);
            margin-right: rem(6);
            height: rem(14);
            border-radius: rem(7);
            background-color: #e4e4e4;
          }
          span {
            display: block;
            margin-top: rem(-10);
            color: #666;
            font-size: rem(24);
          }
        }
      }
      .button {
        margin-right: rem(24);
        width: rem(209);
        height: rem(68);
        background-color: #ff9c00;
        text-align: center;
        line-height: rem(68);
        font-size: rem(26);
        color: #fff;
        border-radius: rem(10);
      }
      .button-end {
        margin-right: rem(24);
        width: rem(209);
        height: rem(68);
        background-color: #d2d2d2;
        text-align: center;
        line-height: rem(68);
        font-size: rem(25);
        border-radius: rem(10);
        color: #fff;
      }
    }
  }
}
</style>
<style lang="scss">
@import "../style/mixin";
.tabs.mu-tabs {
  height: rem(90) !important;
  background-color: #fff !important;
  .actleft {
    background: #1979e7 !important;
    height: rem(4) !important;
    width: rem(150) !important;
    transform: translate3d(rem(38), 0px, 0px) !important;
    &.blue {
      transform: translate3d(rem(260), 0px, 0px) !important;
    }
  }
}
</style>
