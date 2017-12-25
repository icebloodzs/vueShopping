<template>
<!--个人中心-->
  <div class="wrapper">
    <div class="header">
       <img src="../assets/img/dwqvas_02.jpg">
       <div class="header-middle">
           <span>你好哈士奇</span>
           <span @click="profile">收货地址 &nbsp <i class="iconfont">&#xe62d;</i></span>
       </div>
       <div class="header-right">
            <div class="circle index" @click="routerClickhome">首页</div>
            <div class="circle personal"  @click="routerClickcenter">个人<br>中心</div>
       </div>
    </div>
    <div class="main">
         <mu-tabs :value="bottomNav" @change="handleTabChange" :lineClass="['blue']">
            <mu-tab value="tab1" title="全部"/>
            <mu-tab :titleClass="[data&&data.pay&&'befor']"  @click="checkPay" value="tab2" title="待付款"/>
            <mu-tab :titleClass="[data&&data.cancel&&'befor']" @click="checkCancel" value="tab3" title="未核销"/>
            <mu-tab value="tab4" title="已完成"/>
        </mu-tabs>
       
        <div v-if="bottomNav === 'tab1'">
           <div class="content">
               <div class="content-head">
                   <span>2012-12-12 &nbsp 17:06:24</span><span>支付超时</span>
               </div>
             <div class="content-con">
                <div class="content-con-left">
                    <img src="../assets/img/dwqvas_02.jpg" alt="">
                    <div class="content-con-text">
                        <span>第五空间蔬菜第五空间蔬菜</span>
                        <span>来自：大牌抢购</span>
                        <span>￥89.00</span>
                    </div>
                </div>
             </div>
           </div>
        </div>
        <div v-if="bottomNav === 'tab2'">
           <div class="content">
               <div class="content-head">
                   <span>2012-12-12 &nbsp 17:06:24</span><span>待付款</span>
               </div>
             <div class="content-con tab2">
                   <div class="content-con-left">
                        <img src="../assets/img/dwqvas_02.jpg" alt="">
                        <div class="content-con-text">
                            <span>第五空间蔬菜第五空间蔬菜</span>
                            <span>来自：大牌抢购</span>
                            <span>￥89.00</span>
                        </div>
                    </div>
                    <div class="content-con-button"  @click="routerClickPay">支付</div>
             </div>
           </div>
        </div>
        <div v-if="bottomNav === 'tab3'">
            <div class="content"  @click="routerClickCancel">
               <div class="content-head">
                   <span>2012-12-12 &nbsp 17:06:24</span><span class="use" :class="{befor:data.used}">待使用</span>
               </div>
             <div class="content-con">
                <div class="content-con-left">
                    <img src="../assets/img/dwqvas_02.jpg" alt="">
                    <div class="content-con-text">
                        <span>第五空间蔬菜第五空间蔬菜</span>
                        <span>来自：大牌抢购</span>
                        <span>￥89.00</span>
                    </div>
                </div>
             </div>
           </div>
        </div>
        <div v-if="bottomNav === 'tab4'">
            <div class="content">
               <div class="content-head">
                   <span>2012-12-12 &nbsp 17:06:24</span><span>已完成</span>
               </div>
             <div class="content-con">
                <div class="content-con-left">
                    <img src="../assets/img/dwqvas_02.jpg" alt="">
                    <div class="content-con-text">
                        <span>第五空间蔬菜第五空间蔬菜</span>
                        <span>来自：大牌抢购</span>
                        <span>￥89.00</span>
                    </div>
                </div>
             </div>
           </div>
        </div>
    </div>
</div>
</template>

<script>
import $ from "jquery";
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      bottomNav: "tab1",
      accesstoken: "",
      user: {},
      user_msg: {},
      data: null
    };
  },
  created() {
   
  },
  mounted() {
    axios
      .get("https://www.vue-js.com/api/v1/topic/5a39e628f4eae0865305a6eb")
      .then((err, data) => {
        // if (err) return;
        data = {
            pay: true,
            cancel: true,
            used: true
        };
        this.data = data;
         console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  },
  methods: {
    handleTabChange(val) {
      this.bottomNav = val;
    },
    routerClickcenter() {
      this.$router.go(0);
    },
    routerClickhome() {
      this.$router.push("/");
    },
    routerClickPay() {
      this.$router.push("/dist/pay");
    },
    routerClickCancel() {
      this.$router.push("/dist/cancel");
       this.data.used = false;
    },checkPay(){
        this.data.pay = false
    },checkCancel(){
        this.data.cancel = false
    },profile(){
      this.$router.push("/dist/profile");
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
          opacity: .9;
      }
      span:nth-child(2) {
        display: block;
        font-size: rem(25);
        color: #fff;
        line-height: rem(45);
        background-color: #1772b8;
        text-align: center;
        opacity: .8;
        border-radius: rem(8);
         .iconfont{
            font-family:"iconfont"; font-style:normal;
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
        background-color: rgba(0, 0, 0, .3);

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
          font-size: rem(20);
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
              line-height: rem(40);
            }
            span:nth-child(2) {
              color: #989898;
              font-size: rem(25);
              line-height: rem(40);
            }
            span:nth-child(3) {
              color: #1f7eec;
              font-size: rem(25);
              line-height: rem(40);
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
      }
    }
  }
}
</style>

<style lang="scss">
@import "../style/mixin";
@import "../assets/sass/_base.scss";
// .blue {
//   background: #1979e7 !important;
//   height: rem(4);
// }
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
 .use{
    &:before {
        top: 0;
    }
  }
</style>
