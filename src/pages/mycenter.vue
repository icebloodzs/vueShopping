<template>
  <!--个人中心-->
  <div class="wrapper">
    <div class="header">
      <img :src="user.headimgurl">
      <div class="header-middle">
        <span>{{user.nickname}}</span>
        <router-link :to="{path:'/dist/profile',query:{fan_id:30}}" tag="div" class="header-profile">
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
        <mu-tab value="tab1" @active="tab1Active" title="全部" />
        <!-- :titleClass="[data&&data.cancel&&'befor']" -->
        <mu-tab  @active="tab2Active" @click="checkPay" value="tab2" title="待付款" />
        <mu-tab  @click="checkCancel" value="tab3" title="未核销" />
        <mu-tab @active="tab4Active" value="tab4" title="已完成" />
      </mu-tabs>

      <div v-if="bottomNav === 'tab1'">
        <div class="content" v-for="item in items" :key="item.id">
          <div class="content-head">
            <span>{{item.created_at}}</span>
            <span>待付款</span>
          </div>
          <div class="content-con tab2">
            <div class="content-con-left">
              <img :src="item.thumbnail" alt="">
              <div class="content-con-text">
                <span>{{item.goods_name}}</span>
                <!-- <span>来自：大牌抢购</span> -->
                <span>￥{{item.total}}</span>
              </div>
            </div>
            <div class="content-con-button" @click="routerClickPay(item.id,item.extract_type)">支付</div>
          </div>
        </div>
        <div class="content" @click="routerClickCancel(item.id)" v-for="item in items3" :key="item.id">
          <div class="content-head">
            <span>{{item.created_at}}</span>
            <span class="use">待使用</span>
            <!-- :class="{befor:data.used}" -->
          </div>
          <div class="content-con">
            <div class="content-con-left">
              <img :src="item.thumbnail" alt="">
              <div class="content-con-text">
                <span>{{item.goods_name}}</span>
                <!-- <span>来自：大牌抢购</span> -->
                <span>￥{{item.total}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="content" v-for="item in items4" :key="item.id">
          <div class="content-head">
            <span>2012-12-12 &nbsp; 17:06:24</span>
            <span>已完成</span>
          </div>
          <div class="content-con tab4">
            <div class="content-con-left">
              <img :src="item.thumbnail" alt="">
              <div class="content-con-text">
                <span>{{item.goods_name}}</span>
                <!-- <span>来自：大牌抢购</span> -->
                <span>￥{{item.total}}</span>
              </div>
            </div>
            <div class="content-physical-button" @click="routerClickPhysical(item.id)">查看物流</div>
          </div>
        </div>
        <div class="content" v-for="item in items5">
          <div class="content-head">
            <span>2012-12-12 &nbsp; 17:06:24</span>
            <span>已核销</span>
          </div>
          <div class="content-con tab4">
            <div class="content-con-left">
              <img :src="item.thumbnail" alt="">
              <div class="content-con-text">
                <span>{{item.goods_name}}</span>
                <!-- <span>来自：大牌抢购</span> -->
                <span>￥{{item.total}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="bottomNav === 'tab2'">
        <div class="content" v-for="item in items2">
          <div class="content-head">
            <span>{{item.created_at}}</span>
            <span>待付款</span>
          </div>
          <div class="content-con tab2">
            <div class="content-con-left">
              <img :src="item.thumbnail" alt="">
              <div class="content-con-text">
                <span>{{item.goods_name}}</span>
                <!-- <span>来自：大牌抢购</span> -->
                <span>￥{{item.total}}</span>
              </div>
            </div>
            <div class="content-con-button" @click="routerClickPay(item.id,item.extract_type)">支付</div>
          </div>
        </div>
      </div>
      <div v-if="bottomNav === 'tab3'">
        <div class="content" @click="routerClickCancel(item.id)" v-for="item in items3">
          <div class="content-head">
            <span>{{item.created_at}}</span>
            <span class="use">待使用</span>
          </div>
          <div class="content-con">
            <div class="content-con-left">
              <img :src="item.thumbnail" alt="">
              <div class="content-con-text">
                <span>{{item.goods_name}}</span>
                <!-- <span>来自：大牌抢购</span> -->
                <span>￥{{item.total}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="bottomNav === 'tab4'">
        <div class="content" v-for="item in items4">
          <div class="content-head">
            <span>2012-12-12 &nbsp; 17:06:24</span>
            <span>已完成</span>
          </div>
          <div class="content-con tab4">
            <div class="content-con-left">
              <img :src="item.thumbnail" alt="">
              <div class="content-con-text">
                <span>{{item.goods_name}}</span>
                <!-- <span>来自：大牌抢购</span> -->
                <span>￥{{item.total}}</span>
              </div>
            </div>
            <div class="content-physical-button" @click="routerClickPhysical(item.id)">查看物流</div>
          </div>
        </div>
         <div class="content" v-for="item in items5">
          <div class="content-head">
            <span>2012-12-12 &nbsp; 17:06:24</span>
            <span>已核销</span>
          </div>
          <div class="content-con tab4"  @click="routerClickCancel(item.id)">
            <div class="content-con-left">
              <img :src="item.thumbnail" alt="">
              <div class="content-con-text">
                <span>{{item.goods_name}}</span>
                <!-- <span>来自：大牌抢购</span> -->
                <span>￥{{item.total}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import api from "@/api";
export default {
  components: {},
  data() {
    return {
      bottomNav: "tab1",
      // accesstoken: "",
      // user: {},
      // user_msg: {},
      // data: null,
      classObject: {
        tabone: true,
        tabtwo: false,
        tabthree: false,
        tabfour: false
      },
      items: [],
      items2: [],
      items3: [],
      items4: [],
      items5:[],
      pay: true,
      cancel: true,
      used: true,
      user:[]
    };
  },
  created() {},
  mounted() {
    this.getCenterData();
    this.getUserData();
    // axios
    //   .get("https://www.vue-js.com/api/v1/topic/5a39e628f4eae0865305a6eb")
    //   .then((err, data) => {
    //     // if (err) return;
    //     data = {
    //       pay: true,
    //       cancel: true,
    //       used: true
    //     };
    //     this.data = data;
    //     console.log(data);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
  },
  methods: {
    handleTabChange(val) {
      this.bottomNav = val;
    },
    routerClickcenter() {
      this.$router.go(0);
      this.getCenterData();
    },
    routerClickhome() {
      this.$router.push("/");
    },
    routerClickPay(order_id, extract_type) {
      this.$router.push({
        path: "/dist/pay",
        query: { order_id: order_id, extract_type: extract_type }
      });
    },
    routerClickCancel(order_id, extract_type) {
      this.$router.push({
        path: "/dist/cancel",
        query: { order_id: order_id, extract_type: extract_type }
      });
      // this.data.used = false;
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
    checkPay() {
      // this.data.pay = false;
    },
    checkCancel() {
      this.classObject.tabone = false;
      this.classObject.tabtwo = false;
      this.classObject.tabthree = true;
      this.classObject.tabfour = false;
      // this.data.cancel = false;
    },
    tab4Active() {
      this.classObject.tabone = false;
      this.classObject.tabtwo = false;
      this.classObject.tabthree = false;
      this.classObject.tabfour = true;
    },
    routerClickPhysical(orderId) {
      window.location.href =
        `http://m.kuaidi100.com/index_all.html?postid=${orderId}#result`;
    },
     async getUserData() {
       let fan_id = this.$route.query.fan_id;
      const { data } = await api.get("user_info",{
        'fan_id': fan_id
      });
      this.user = data.data[0];
      console.log(this.user)
    },
    async getCenterData() {
      let fan_id = this.$route.query.fan_id;
      const { data } = await api.get("order_list", {
        'fan_id': fan_id
      });
      this.items = data.data;
      for (let i = 0, len = this.items.length; i < len; i++) {
        if (this.items[i].status == 1) {
          this.items2[i] = this.items[i];
        }
      }
      for (let i = 0, len = this.items.length; i < len; i++) {
        if (this.items[i].status == 4) {
          this.items3[i] = this.items[i];
        }
      }
      for (let i = 0, len = this.items.length; i < len; i++) {
        if (this.items[i].status == 5 && this.items[i].extract_type == 1 ) {
          this.items4[i] = this.items[i];
        }
      }
      for (let i = 0, len = this.items.length; i < len; i++) {
        if (this.items[i].status == 5 && this.items[i].extract_type == 2 ) {
          this.items5[i] = this.items[i];
        }
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
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: rem(220);
    background-color: #1979e7;
    img {
      width: rem(120);
      height: rem(120);
      border-radius: rem(60);
      margin-left: rem(24);
    }
    .header-middle {
      margin-left: rem(30);
      width: rem(175);
      span:nth-child(1) {
        display: block;
        font-size: rem(35);
        color: #fff;
        line-height: 1.5;
        margin-bottom: rem(15);
        text-align: left;
        opacity: 0.9;
      }
      .header-profile {
        display: block;
        font-size: rem(25);
        color: #fff;
        line-height: rem(45);
        background-color: #1772b8;
        text-align: center;
        opacity: 0.8;
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
        width: rem(80);
        height: rem(82);
        border-radius: rem(40);
        background-color: rgba(0, 0, 0, 0.3);

        color: #dde4ea;
        font-size: rem(20);
        z-index: 1;
      }
      .index {
        line-height: rem(80);
        top: rem(23);
        right: rem(24);
        font-size: rem(24);
      }
      .personal {
        top: rem(123);
        right: rem(24);
      }
    }
  }
  .main {
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
      padding: rem(28) rem(24) 0 rem(24);
      background-color: #fff;
      margin: rem(15) auto;
      .content-head {
        display: flex;
        justify-content: space-between;
        span:nth-child(1) {
          color: #656565;
          font-size: rem(22);
        }
        span:nth-child(2) {
          color: #299ff6;
          font-size: rem(25);
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
          img {
            width: rem(146);
            height: rem(160);
          }
          .content-con-text {
            display: flex;
            flex-direction: column;
            margin-left: rem(15);
            margin-top: rem(15);
            span:nth-child(1) {
              color: #000;
              font-size: rem(25);
              line-height: rem(35);
            }
            // span:nth-child(2) {
            //   color: #989898;
            //   font-size: rem(25);
            //   line-height: rem(44);
            // }
            span:nth-child(2) {
              color: #1d80e8;
              font-size: rem(25);
              line-height: rem(44);
              margin-top:rem(30);
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
