<template>
<!--个人中心-->
  <div class="wrapper">
    <div class="header">
       <img src="../assets/img/dwqvas_02.jpg">
       <div class="header-middle">
           <span>你好哈士奇</span>
           <span>收货地址 &nbsp  <strong>></strong></span>
          
       </div>
       <div class="header-right">
            <div class="circle index" @click="routerClickhome">首页</div>
            <div class="circle personal"  @click="routerClickcenter">个人<br>中心</div>
       </div>
    </div>
    <div class="main">
         <mu-tabs :value="bottomNav" @change="handleTabChange">
            <mu-tab value="tab1" title="全部"/>
            <mu-tab value="tab2" title="待付款"/>
            <mu-tab value="tab3" title="未核销"/>
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
                   <span>2012-12-12 &nbsp 17:06:24</span><span>待使用</span>
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
  import axios from 'axios'
  export default {
    components: {
     
    },
    data() {
      return {
        bottomNav: 'tab1',
        accesstoken: '',
        user: {},
        user_msg: {}
      }
    },
    // 获取储存的accesstoken
    created() {
      this.accesstoken = localStorage.getItem("accesstoken")
      // alert(this.accesstoken)
      this.getData()
      // this.oldGetData()
    },
    // 传递accesstoken参数然后 post 取得用户登录名
    methods: {
      handleTabChange (val) {
        this.bottomNav = val
      },routerClickcenter(){
               this.$router.go(0);
            },routerClickhome(){
              this.$router.push("/vue-home/dist");
            },routerClickPay(){
              this.$router.push("/vue-home/dist/pay");
            },routerClickCancel(){
              this.$router.push("/vue-home/dist/cancel");
            },
      getData() {
        // let that = this
        // axios.post('https://www.vue-js.com/api/v1/accesstoken', {
        //     accesstoken: that.accesstoken
        //   })
        //   .then(function(response) {
        //     that.user = response.data
        //     that.getUserData()
        //     // this.oldGetData()
        //   })
      },
      // 根据用户登录名和get方法取得用户信息
      getUserData() {
        // let that = this
        // axios.get("https://www.vue-js.com/api/v1/user/" + that.user.loginname)
        //   .then(function(response) {
        //     that.user_msg = response.data.data
        //     // console.log(that.user_msg)
        //   })
      },
      // 登出并清除缓存
      logout() {
        localStorage.removeItem('accesstoken')
        localStorage.removeItem('user_id')
        localStorage.removeItem('loginname')
        this.$router.push({
          path: "/vue-home/dist"
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
 @import '../style/mixin';
  @import '../assets/sass/_base.scss';
   .wrapper {
      @include wrapper;
    .header{
        display: flex;
        flex-direction: row;
        align-items: center;
        height: rem(220);
        background-color: #1979e7;
        img{
            width: rem(120);
            height: rem(120);
            border-radius:rem(60); 
            margin-left: rem(24);
        }
        .header-middle{
            margin-left: rem(30);
             span:nth-child(1){
                display: block;
                 font-size:rem(30); 
                 color: #fff;
                 line-height: 1.5;
                 margin-bottom: rem(15);
             }
             span:nth-child(2){
                display: block;
                font-size:rem(25); 
                color: #fff;
                line-height: rem(40);
                background-color: #1772b8;
                text-align: center;
             }
        }
        .header-right{
            .circle{
                position: absolute;
                width: rem(80);
                height: rem(80);
                border-radius: rem(40);
                background-color: #104f96;
                color: #fff;
                font-size: rem(20);
                // line-height: rem(70);
                text-align: center;
                z-index: 1;  
            }
            .index{
                line-height: rem(80);
                top: rem(30);
                right:rem(24);
            }
            .personal{
                top: rem(122);
                right:rem(24);
                line-height: rem(35);
            }
        }
    }
    .main{
        .mu-tab-link{
            font-size: rem(30);
            background-color: #fff;
            color: #000;
             border: 1px solid #fff;
        }
        .mu-tab-active{
            color: #1f7ee8;
           
        }
        .mu-tabs{
        span:nth-child(5){
            background-color: #1f7ee8 !important;
        }
        }
      .content{
          width:100%;
          padding:rem(28) rem(24) 0 rem(24);
          background-color: #fff;
          margin: rem(15) auto;
          .content-head{
              display: flex;
              justify-content: space-between;
              span:nth-child(1){
                  color: #656565;
                  font-size: rem(20); 
              }
              span:nth-child(2){
                  color: #299ff6;
                  font-size: rem(25); 
              }
          }
          .content-con{
              display: flex;
              flex-direction: row;
              &.tab2{
                     justify-content: space-between;
              }
                .content-con-left{
                    display: flex;
                    flex-direction: row;
                    img{
                        width: rem(146);
                        height: rem(160);
                    }
                .content-con-text{
                    display: flex;
                    flex-direction: column;
                    margin-left: rem(15);
                    margin-top: rem(15);
                        span:nth-child(1){
                            color: #000;
                            font-size: rem(25); 
                            line-height: rem(40);
                        }
                        span:nth-child(2){
                            color: #989898;
                            font-size: rem(25); 
                            line-height: rem(40);
                        }
                        span:nth-child(3){
                            color: #1f7eec;
                            font-size: rem(25);
                            line-height: rem(40); 
                        }
                }
              }
              .content-con-button{
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
