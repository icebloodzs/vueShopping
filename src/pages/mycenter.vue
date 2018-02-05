<template>
  <!--个人中心-->
  <div class="wrapper">
    <div class="loading" v-if="isloading">加载中. . .</div>
    <div class="header">
      <img :src="user.headimgurl">
      <div class="header-middle">
        <span>{{user.nickname}}</span>
        <router-link :to="{path:'/dist/profile',query:{center:'center'}}" tag="div" class="header-profile">
          收货地址 &nbsp;
          <i class="iconfont">&#xe62d;</i>
        </router-link>
      </div>
      <div class="header-right">
        <div class="circle index" @click="routerClickhome">首页</div>
        <div class="circle personal" @click="routerClickcenter">个人<br>中心</div>
      </div>
    </div>
    <div class="main">
      <mu-tabs class="centertab" :value="bottomNav" @change="handleTabChange" :lineClass="classObject">
        <mu-tab @active="tab1Active" value="all" title="全部" />
        <mu-tab @active="tab2Active" value="1" title="待付款" />
        <mu-tab @click="checkCancel" value="2" title="未核销" />
        <mu-tab @active="tab4Active" value="3" title="已完成" />
      </mu-tabs>
      <div v-if="bottomNav === 'all'">
        <div class="hint" v-if='!allitems.length'></div>
        <!-- 待付款 -->
        <div class="content" @click="routerClickdetail(item.id)" v-for="item in items1">
          <div class="content-head">
            <span>{{item.created_at}}</span>
            <span>待付款</span>
          </div>
          <div class="content-con tab2">
            <div class="content-con-left">
              <img :src="item.thumbnail" alt="">
              <div class="content-con-text">
                <span>{{item.goods_name}}</span>
                <span>￥{{item.actual_price}}</span>
              </div>
            </div>
            <div class="content-con-button" @click.stop="routerClickPay(item.id)">支付</div>
          </div>
        </div>
        <!-- 未核销 -->
        <div class="content" @click="routerClickCancel(item.id)" v-for="item in items2">
          <div class="content-head">
            <span>{{item.created_at}}</span>
            <span class="use">待使用</span>
          </div>
          <div class="content-con">
            <div class="content-con-left">
              <img :src="item.thumbnail" alt="">
              <div class="content-con-text">
                <span>{{item.goods_name}}</span>
                <span>￥{{item.actual_price}}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 已支付 -->
        <div class="content" @click="routerClickdetail(item.id)" v-for="item in items3">
          <div class="content-head">
            <span>{{item.created_at}}</span>
            <span>已支付</span>
          </div>
          <div class="content-con tab4">
            <div class="content-con-left">
              <img :src="item.thumbnail" alt="">
              <div class="content-con-text">
                <span>{{item.goods_name}}</span>
                <span>￥{{item.actual_price}}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 已发货 -->
        <div class="content" @click="routerClickCancel(item.id)" v-for="item in items4">
          <div class="content-head">
            <span>{{item.created_at}}</span>
            <span>已发货</span>
          </div>
          <div class="content-con tab4">
            <div class="content-con-left">
              <img :src="item.thumbnail" alt="">
              <div class="content-con-text">
                <span>{{item.goods_name}}</span>
                <span>￥{{item.actual_price}}</span>
              </div>
            </div>
            <div class="content-physical-button" @click.stop="routerClickPhysical(item.id)">查看物流</div>
          </div>
        </div>
        <!-- 已核销 -->
        <div class="content" @click="routerClickdetail(item.id)" v-for="item in items5">
          <div class="content-head">
            <span>{{item.created_at}}</span>
            <span>已核销</span>
          </div>
          <div class="content-con tab4">
            <div class="content-con-left">
              <img :src="item.thumbnail" alt="">
              <div class="content-con-text">
                <span>{{item.goods_name}}</span>
                <span>￥{{item.actual_price}}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 已完成 -->
        <div class="content" @click="routerClickdetail(item.id,item.extract_type)" v-for="item in items6">
          <div class="content-head">
            <span>{{item.created_at}}</span>
            <span>已完成</span>
          </div>
          <div class="content-con tab4">
            <div class="content-con-left">
              <img :src="item.thumbnail" alt="">
              <div class="content-con-text">
                <span>{{item.goods_name}}</span>
                <span>￥{{item.actual_price}}</span>
              </div>
            </div>
          </div>
        </div>
        <p class="nomore" v-show="nomore">--------我是有底线的--------</p>
        <!--上拉加载更多的组件-->
        <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" />
      </div>
      <div v-if="bottomNav === '1'">
        <div class="hint" v-if='!items.length'></div>
        <div class="content" @click="routerClickdetail(item.id)" v-for="item in items">
          <div class="content-head">
            <span>{{item.created_at}}</span>
            <span>待付款</span>
          </div>
          <div class="content-con tab2">
            <div class="content-con-left">
              <img :src="item.thumbnail" alt="">
              <div class="content-con-text">
                <span>{{item.goods_name}}</span>
                <span>￥{{item.actual_price}}</span>
              </div>
            </div>
            <div class="content-con-button" @click.stop="routerClickPay(item.id)">支付</div>
          </div>
        </div>
        <p class="nomore" v-show="nomore2">--------我是有底线的--------</p>
        <!--上拉加载更多的组件-->
        <mu-infinite-scroll :scroller="scroller" :loading="loading2" @load="loadMore2" />
      </div>
      <div v-if="bottomNav === '2'">
        <div class="hint" v-if='!items.length'></div>
        <div class="content" @click="routerClickCancel(item.id)" v-for="item in items">
          <div class="content-head">
            <span>{{item.created_at}}</span>
            <span class="use">待使用</span>
          </div>
          <div class="content-con">
            <div class="content-con-left">
              <img :src="item.thumbnail" alt="">
              <div class="content-con-text">
                <span>{{item.goods_name}}</span>
                <span>￥{{item.actual_price}}</span>
              </div>
            </div>
          </div>
        </div>
        <p class="nomore" v-show="nomore3">--------我是有底线的--------</p>
        <!--上拉加载更多的组件-->
        <mu-infinite-scroll :scroller="scroller" :loading="loading3" @load="loadMore3" />
      </div>
      <div v-if="bottomNav === '3'">
        <div class="hint" v-if='!itemss.length'></div>
        <div class="content" @click="routerClickdetail(item.id)" v-for="item in itemss3">
          <div class="content-head">
            <span>{{item.created_at}}</span>
            <span>已支付</span>
          </div>
          <div class="content-con tab4">
            <div class="content-con-left">
              <img :src="item.thumbnail" alt="">
              <div class="content-con-text">
                <span>{{item.goods_name}}</span>
                <span>￥{{item.actual_price}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="content" @click="routerClickCancel(item.id)" v-for="item in itemss4">
          <div class="content-head">
            <span>{{item.created_at}}</span>
            <span>已发货</span>
          </div>
          <div class="content-con tab4">
            <div class="content-con-left">
              <img :src="item.thumbnail" alt="">
              <div class="content-con-text">
                <span>{{item.goods_name}}</span>
                <span>￥{{item.actual_price}}</span>
              </div>
            </div>
            <div class="content-physical-button" @click.stop="routerClickPhysical(item.id)">查看物流</div>
          </div>
        </div>
        <div class="content" @click="routerClickdetail(item.id)" v-for="item in itemss5">
          <div class="content-head">
            <span>{{item.created_at}}</span>
            <span>已核销</span>
          </div>
          <div class="content-con tab4">
            <div class="content-con-left">
              <img :src="item.thumbnail" alt="">
              <div class="content-con-text">
                <span>{{item.goods_name}}</span>
                <span>￥{{item.actual_price}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="content" @click="routerClickdetail(item.id)" v-for="item in itemss6">
          <div class="content-head">
            <span>{{item.created_at}}</span>
            <span>已完成</span>
          </div>
          <div class="content-con tab4">
            <div class="content-con-left">
              <img :src="item.thumbnail" alt="">
              <div class="content-con-text">
                <span>{{item.goods_name}}</span>
                <span>￥{{item.actual_price}}</span>
              </div>
            </div>
          </div>
        </div>
        <p class="nomore" v-show="nomore4">--------我是有底线的--------</p>
        <!--上拉加载更多的组件-->
        <mu-infinite-scroll :scroller="scroller" :loading="loading4" @load="loadMore4" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      bottomNav: "all",
      isloading: false,
      classObject: {
        tabone: true,
        tabtwo: false,
        tabthree: false,
        tabfour: false
      },
      allitems: [],
      items: [],
      itemss: [],
      items1: [],
      items2: [],
      items3: [],
      items4: [],
      items5: [],
      items6: [],
      itemss3: [],
      itemss4: [],
      itemss5: [],
      itemss6: [],
      pay: true,
      cancel: true,
      used: true,
      user: [],
      nomore: false,
      nomore2: false,
      nomore3: false,
      nomore4: false,
      scroller: null,
      page: 1,
      page2: 1,
      page3: 1,
      page4: 1,
      loading: false,
      loading2: false,
      loading3: false,
      loading4: false,
      url: []
    };
  },
  created() {},
  mounted() {
    this.scroller = this.$el;
    this.getUserData();
    this.getCenterData("all");
  },
  methods: {
    routerClickdetail(order_id){
      this.$router.push({
        path: "/dist/pay",
        query: { order_id: order_id }
      });
    },
    handleTabChange(val) {
      this.bottomNav = val;
      this.getCenterData(val);
    },
    routerClickcenter() {
      this.$router.go(0);
    },
    routerClickhome() {
      this.$router.push("/");
    },
    async routerClickPay(order_id) {
      const { data } = await this.api.get("pay", {
        order_id: order_id
      });
      this.url = data.url;
      window.location.href = this.url;
    },
    routerClickCancel(order_id) {
      this.$router.push({
        path: "/dist/pay",
        query: { order_id: order_id }
      });
    },
    tab1Active() {
      this.classObject.tabone = true;
      this.classObject.tabtwo = false;
      this.classObject.tabthree = false;
      this.classObject.tabfour = false;
    },
    tab2Active() {
      this.classObject.tabone = false;
      this.classObject.tabtwo = true;
      this.classObject.tabthree = false;
      this.classObject.tabfour = false;
    },
    checkCancel() {
      this.classObject.tabone = false;
      this.classObject.tabtwo = false;
      this.classObject.tabthree = true;
      this.classObject.tabfour = false;
    },
    tab4Active() {
      this.classObject.tabone = false;
      this.classObject.tabtwo = false;
      this.classObject.tabthree = false;
      this.classObject.tabfour = true;
    },
    routerClickPhysical(orderId) {
      window.location.href = `http://m.kuaidi100.com/index_all.html?postid=${orderId}#result`;
    },
    async getUserData() {
      const { data } = await this.api.get("user_info");
      this.user = data.data[0];
    },
    //全部、待付款、未核销、已完成数据获取
    async getCenterData(val) {
      this.isloading = true;
      //待付款、未核销
      if (val === "1" || val === "2") {
        this.items = []
        const { data } = await this.api.get("order_list", {
          status: val
        });
        this.items = data.data;
        this.isloading = false;
      }
      // 已完成
      if (val == "3") {
        const { data } = await this.api.get("order_list", {
          status: val
        });
        this.itemss = data.data;
        this.isloading = false;
        this.itemss3 = [];
        this.itemss4 = [];
        this.itemss5 = [];
        this.itemss6 = [];
        for (let i = 0, len = this.itemss.length; i < len; i++) {
          // 已支付
          if (this.itemss[i].status == 2) {
            this.itemss3.push(this.itemss[i]);
          }
          //已发货
          if (this.itemss[i].status == 3) {
            this.itemss4.push(this.itemss[i]);
          }
          //已核销
          if (this.itemss[i].status == 5 && this.itemss[i].extract_type == 2) {
            this.itemss5.push(this.itemss[i]);
          }
          // 已完成
          if (this.itemss[i].status == 5 && this.itemss[i].extract_type == 1) {
            this.itemss6.push(this.itemss[i]);
          }
        }
      }
      if (val == "all") {
        //全部订单获取
        const { data } = await this.api.get("order_list");
        this.allitems = data.data;
        this.items1 = [];
        this.items2 = [];
        this.items3 = [];
        this.items4 = [];
        this.items5 = [];
        this.items6 = [];
        for (let i = 0, len = this.allitems.length; i < len; i++) {
          // 未支付
          if (this.allitems[i].status == 1) {
            this.items1.push(this.allitems[i]);
            // this.items1[i] = this.allitems[i];
          }
          // 未核销
          if (this.allitems[i].status == 4) {
            this.items2.push(this.allitems[i]);
          }
          // 已支付
          if (this.allitems[i].status == 2) {
            this.items3.push(this.allitems[i]);
          }
          //已发货
          if (this.allitems[i].status == 3) {
            this.items4.push(this.allitems[i]);
          }
          //已核销
          if (
            this.allitems[i].status == 5 &&
            this.allitems[i].extract_type == 2
          ) {
            this.items5.push(this.allitems[i]);
          }
          // 已完成
          if (
            this.allitems[i].status == 5 &&
            this.allitems[i].extract_type == 1
          ) {
            this.items6.push(this.allitems[i]);
          }
        }
        this.isloading = false;
      }
    },
    //全部更多订单数据获取
    async getMoreData() {
      let arr = [];
      let arr1 = [];
      let arr2 = [];
      let arr3 = [];
      let arr4 = [];
      let arr5 = [];
      let arr6 = [];
      let that = this;
      const { data } = await this.api.get("order_list", {
        page: this.page
      });
      arr = data.data;
      if (arr.length == 0) {
        that.loading = false;
        that.nomore = true;
        return false;
      }
      for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i].status == 1) {
          arr1.push(arr[i]);
        }
        if (arr[i].status == 4) {
          arr2.push(arr[i]);
        }
        if (arr[i].status == 2) {
          arr3.push(arr[i]);
        }
        if (arr[i].status == 3) {
          arr4.push(arr[i]);
        }
        if (arr[i].status == 5 && arr[i].extract_type == 2) {
          arr5.push(arr[i]);
        }
        if (arr[i].status == 5 && arr[i].extract_type == 1) {
          arr6.push(arr[i]);
        }
      }
      that.items1 = [...that.items1, ...arr1];
      that.items2 = [...that.items2, ...arr2];
      that.items3 = [...that.items3, ...arr3];
      that.items4 = [...that.items4, ...arr4];
      that.items5 = [...that.items5, ...arr5];
      that.items6 = [...that.items6, ...arr6];
      arr = [];
      arr1 = [];
      arr2 = [];
      arr3 = [];
      arr4 = [];
      arr5 = [];
      arr6 = [];
      that.loading = false;
    },
    //  全部上拉加载
    async loadMore() {
      if (!this.nomore) {
        this.loading = true;
        this.page += 1;
        setTimeout(() => {
          this.getMoreData();
        }, 2000);
      }
    },
    //待付款更多订单数据获取
    async getMorePayData() {
      let that = this;
      let arr = [];
      const { data } = await this.api.get("order_list", {
        status: 1,
        page: this.page2
      });
      arr = data.data;
      if (arr.length === 0) {
        that.loading2 = false;
        that.nomore2 = true;
        return false;
      }
      that.items = [...that.items, ...arr];
      arr = [];
      that.loading2 = false;
    },
    //  待付款上拉加载
    async loadMore2() {
      if (!this.nomore2) {
        this.loading2 = true;
        this.page2 += 1;
        setTimeout(() => {
          this.getMorePayData();
        }, 2000);
      }
    },
    //未核销更多订单数据获取
    async getMoreCancelData() {
      let that = this;
      let arr = [];
      const { data } = await this.api.get("order_list", {
        status: 2,
        page: this.page3
      });
      arr = data.data;
      if (arr.length === 0) {
        that.loading3 = false;
        that.nomore3 = true;
        return;
      }
      that.items = [...that.items, ...arr];
      arr = [];
      that.loading3 = false;
    },
    //  未核销上拉加载
    async loadMore3() {
      if (!this.nomore3) {
        this.loading3 = true;
        this.page3 += 1;
        setTimeout(() => {
          this.getMoreCancelData();
        }, 2000);
      }
    },
    //已完成更多订单数据获取
    async getMoreDoneData() {
      let that = this;
      let arr = [];
      let arr3 = [];
      let arr4 = [];
      let arr5 = [];
      let arr6 = [];
      const { data } = await this.api.get("order_list", {
        status: 3,
        page: this.page4
      });
      arr = data.data;
      if (arr.length === 0) {
        that.loading4 = false;
        that.nomore4 = true;
        return;
      }
      for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i].status == 2) {
          arr3.push(arr[i]);
        }
        if (arr[i].status == 3) {
          arr4.push(arr[i]);
        }
        if (arr[i].status == 5 && arr[i].extract_type == 2) {
          arr5.push(arr[i]);
        }
        if (arr[i].status == 5 && arr[i].extract_type == 1) {
          arr6.push(arr[i]);
        }
      }
      that.itemss3 = [...that.itemss3, ...arr3];
      that.itemss4 = [...that.itemss4, ...arr4];
      that.itemss5 = [...that.itemss5, ...arr5];
      that.itemss6 = [...that.itemss6, ...arr6];
      arr = [];
      arr3 = [];
      arr4 = [];
      arr5 = [];
      arr6 = [];
      that.loading4 = false;
    },
    //  已完成上拉加载
    async loadMore4() {
      if (!this.nomore4) {
        this.loading4 = true;
        this.page4 += 1;
        setTimeout(() => {
          this.getMoreDoneData();
        }, 2000);
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
  .nomore {
    color: #666;
    text-align: center;
    line-height: 2;
    font-size: rem(30);
  }
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: rem(219);
    background-color: #1979e7;
    position: relative;
    img {
      width: rem(120);
      height: rem(120);
      border-radius: rem(60);
      margin-left: rem(24);
    }
    .header-middle {
      margin-left: rem(31);
      width: rem(174);
      span:nth-child(1) {
        display: block;
        font-size: rem(34);
        color: #fff;
        line-height: 1;
        margin-bottom: rem(20);
        text-align: left;
      }
      .header-profile {
        display: block;
        font-size: rem(22);
        color: #fff;
        line-height: rem(41);
        background-color: #1772b8;
        text-align: center;
        opacity: 0.9;
        border-radius: rem(8);
        .iconfont {
          font-family: "iconfont";
          font-style: normal;
        }
      }
    }
    .header-right {
      .circle {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: rem(76);
        height: rem(76);
        border-radius: rem(40);
        background-color: rgba(0, 0, 0, 0.3);
        color: #dde4ea;
        font-size: rem(20);
        z-index: 1;
      }
      .index {
        top: rem(31);
        right: rem(24);
      }
      .personal {
        bottom: rem(21);
        right: rem(24);
      }
    }
  }
  .main {
    // padding-bottom:rem(100); 
    .hint {
      padding-top: rem(300);
      width: 100%;
      height: rem(1010);
      background: #fff url(../assets/img/vn2l_fw658.png) no-repeat 50% 25%;
      background-size: rem(197) rem(287);
    }
    .mu-tab-link {
      font-size: rem(30);
      background-color: #fff;
      color: #000;
      border: 1px solid #fff;
      line-height: rem(80);
    }
    .mu-tab-active {
      color: #1f7ee8;
    }
    .mu-tabs {
      span:nth-child(5) {
        background-color: #1f7ee8 !important;
      }
    }
    .content {
      width: 100%;
      padding: rem(27) rem(24) rem(20) rem(24);
      background-color: #fff;
      margin: rem(16) auto;
      .content-head {
        display: flex;
        justify-content: space-between;
        line-height: 1;
        font-size: rem(24);
        span:nth-child(1) {
          color: #656565;
        }
        span:nth-child(2) {
          color: #299ff6;
        }
      }
      .content-con {
        display: flex;
        flex-direction: row;
        &.tab2 {
          justify-content: space-between;
        }
        &.tab4 {
          justify-content: space-between;
        }
        .content-con-left {
          display: flex;
          flex-direction: row;
          margin-top: rem(10);
          img {
            width: rem(160);
            height: rem(120);
          }
          .content-con-text {
            display: flex;
            flex-direction: column;
            margin-left: rem(24);
            margin-top: rem(15);
            span:nth-child(1) {
              color: #000;
              font-size: rem(28);
              line-height: rem(35);
            }
            span:nth-child(2) {
              color: #1d80e8;
              font-size: rem(30);
              line-height: rem(44);
              margin-top: rem(30);
            }
          }
        }
        .content-con-button {
          color: #fff;
          width: rem(106);
          height: rem(60);
          line-height: rem(60);
          text-align: center;
          background-color: #fe9d00;
          border-radius: rem(5);
          margin-top: rem(70);
        }
        .content-physical-button {
          width: rem(130);
          height: rem(42);
          border: 1px solid #666;
          color: #666;
          font-size: rem(25);
          border-radius: rem(5);
          text-align: center;
          line-height: rem(42);
          margin-top: rem(60);
        }
      }
    }
  }
}
</style>

<style lang="scss">
@import "../style/mixin";
@import "../assets/sass/_base.scss";
.centertab {
  height: rem(100) !important;
  background-color: #fff !important;
  .mu-tab-link-highlight {
    background: #1979e7 !important;
    height: rem(4) !important;
    width: rem(110) !important;
  }
  .tabone {
    transform: translate3d(rem(45), 0px, 0px) !important;
  }
  .tabtwo {
    transform: translate3d(rem(230), 0px, 0px) !important;
  }
  .tabthree {
    transform: translate3d(rem(415), 0px, 0px) !important;
  }
  .tabfour {
    transform: translate3d(rem(600), 0px, 0px) !important;
  }
}
.befor {
  position: relative;
  &:before {
    display: block;
    content: "";
    width: rem(20);
    height: rem(20);
    border-radius: 50%;
    position: absolute;
    top: 0.3rem;
    right: -0.1rem;
    background: #ff243e;
  }
}
.use {
  &:before {
    top: 0;
  }
}
</style>
