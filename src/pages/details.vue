<template>
<div class="wrapper">
   <app-banner :listImg="listImg"></app-banner>
   <div class="goback"> <i class="iconfont" @click="routerClickgoback">&#xe600;</i></div>
  
   <div class="content">
     <div class="content-head">
     <div class="content-title">祖元花轴 您的每日营养专家现实秒杀会员56元</div>
     <div class="content-price">
       <div class="content-price-left">
         <span class="original-price">￥128</span>
         <div class="content-price-left-con"><span>￥198</span><span>剩余24份</span></div>
       </div>
       <div class="content-price-right">
         距结束<span>00</span>:<span>05</span>:<span>56</span>
       </div>
     </div>
     <div class="content-indate">
       <div class="content-indate-left">此商品有效期至</div>
       <div class="content-indate-right">2017-06-30 21:00</div>
     </div>
     <div class="content-purchase">
       <div class="content-purchase-left"><img src="../assets/img/dwqvas_02.jpg"></div>
       <div class="content-purchase-right">已有<span>67</span>人抢购</div>
     </div>
     </div>
     <div class="content-website">
       <div class="content-website-title">领取网点</div>
       <div class="content-website-con">
         <div class="content-website-con-left">
            <span>涵斧宫自助餐厅（正大乐城店）</span>
            <span>管城回族区心怡路与东站交叉口正大乐城2楼</span>
            <span> <i class="iconfont">&#xe715;</i>4.8km</span>
         </div>
         <div class="content-website-con-right">
           <i class="iconfont">&#xe8bd;</i>
          </div>
       </div>
        <div class="content-website-all"  @click="routerClickwebsite" >
          <div class="content-website-all-left">查看全部3家网点</div>
          <div class="content-website-all-right"> <i class="iconfont">&#xe62d;</i></div>
        </div>
     </div>
     <div class="content-detail">
       <div class="content-detail-title">商品详情</div>
       <div class="content-detail-con"></div>
     </div>
   </div>
   <div class="button" @click="routerClicksubmit">立即抢购</div>
</div>

</template>
<script>
  import $ from "jquery";
   import Banner from '../components/Banner.vue'
   import a from '../assets/img/banner1.jpg'
    import b from '../assets/img/banner2.jpg'
    import c from '../assets/img/banner3.jpg'
export default {
    components: {
        'app-banner': Banner
    },
  data () {
    return {
      activeTab: 'tab1',
      value:37,
       listImg: [{
                    url: a
                }, {
                    url: b
                }, {
                    url: c
                }]
    }
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val
    },routerClickwebsite(){
          this.$router.push("/vue-home/dist/website");
      },routerClicksubmit(){
          this.$router.push("/vue-home/dist/submit");
      }, routerClickgoback(){
       this.$router.go(-1);
    }
  }
}
</script>
<style lang="scss" scoped>

  @import '../style/mixin';
  @import '../assets/sass/_base.scss';
    .wrapper {
    @include wrapper;
    .goback{
        width: rem(60);
        height: rem(60);
        border-radius: rem(30);
        background-color: #2c2c2c;
        color: #fff;
        position: absolute;
        top: rem(12);
        left: rem(15);
        z-index: 1;
        text-align: center;
       .iconfont{
         font-family:"iconfont"; font-size:rem(36); font-style:normal;line-height: rem(60);
        }
    }
   
      .content{
        display: flex;
        flex-direction: column;
        width: 100%;
        // padding : 0 rem(30) 0;
        .content-head{
          background-color: #fff;
          padding: 0 rem(30) 0;
        .content-title{
          font-size: rem(30);
          text-align: left; 
         
          line-height: rem(80);
        }
        .content-price{
          display: flex;
          flex-direction: row;
          // padding: rem(27) 0;
          justify-content: space-between;
          height: rem(55);
        
          .content-price-left{
            display: flex;
            flex-direction: row;
              height: rem(55);
            .original-price{
              display: block;
              height: rem(55);
              line-height: rem(55);
              font-size: rem(55);
              color:#1e7deb;
              margin-right: rem(15);
            }
             .content-price-left-con{
                display: flex;
                flex-direction: column;
                height: rem(55);
                span:nth-child(1){
                  font-size: rem(20);
                  line-height: rem(20);
                  color: #d2d2d2;
                  text-decoration: line-through;
                }
                 span:nth-child(2){
                   display: block;
                   height: rem(25);
                   margin-top: rem(5);
                   font-size: rem(25);
                    line-height:rem(25);
                 }
             }
          }
          .content-price-right{
            display: flex;
            flex-direction: row;
            font-size: rem(25);
            height: rem(55);
            align-items: center;
            span{
              color: #fff;
              display: block;
              width: rem(44);
              height: rem(30);
              background-color: #000;
              line-height: rem(30);
              text-align: center;
              margin: 0 rem(10);
            }
          }
        }
        .content-indate{
          font-size: rem(25);
          color: #999999;
          display: flex;
          justify-content: space-between;
          margin-top: rem(30);
          line-height: rem(88);
          border-top: 1px solid  #e9e9e9;
          border-bottom: 1px solid  #e9e9e9;
         
        }
        .content-purchase{
          display: flex;
          justify-content: space-between;
          height: rem(116);
        
          align-items: center;
          img{
            width: rem(66);
            height: rem(66);
            border-radius: rem(33);
            margin-right: rem(25);
          }
          .content-purchase-right{
              font-size: rem(25);
              line-height: rem(66);
              span{
                color: #28a2f5;
              }
          }
        }
        }
        .content-website{
          margin-top: rem(20);
          padding : 0 rem(30) 0;
          background-color: #fff;
          .content-website-title{
            height: rem(90);
            font-size: rem(30);
            line-height: rem(90);
          }
          .content-website-con{
            display: flex;
            border-top: 1px solid  #e9e9e9;
            border-bottom: 1px solid  #e9e9e9;
            justify-content: space-between;
            align-items: center;
            .content-website-con-left{
              display: flex;
              flex-direction: column;
              // width: rem(572);
              line-height: rem(48);
              span:nth-child(1){
                  font-size: rem(27);
              }
               span:nth-child(2){
                  font-size: rem(25);
                  color: #666666;
              }
               span:nth-child(3){
                  font-size: rem(22);
                  color: #999999;
                  .iconfont{
                     font-family:"iconfont"; font-size:rem(30); font-style:normal;
                  }
              }
            }
            .content-website-con-right{
              border-left:  1px solid  #e9e9e9;
              width: rem(120);
              height: rem(70);
              padding: rem(10) rem(30);
              .iconfont{
                font-family:"iconfont"; font-size:rem(40); font-style:normal;
               }
            }
          }
          .content-website-all{
              display: flex;
              justify-content: space-between;
              height: rem(90);
              line-height: rem(90);
              .content-website-all-left{
                color: #0080e1;
                
              }
              .content-website-all-right{
                 .iconfont{
                font-family:"iconfont"; font-size:rem(30); font-style:normal;
               }
              }
          }
        }
        .content-detail{
           background-color: #fff;
          padding: 0 rem(30) 0;
          margin-top: rem(20);
          .content-detail-title{
            font-size: rem(30);
            line-height: rem(90);
            text-align: left;
            border-bottom: 1px solid  #e9e9e9;
          }
          .content-detail-con{
            height: rem(500);
            background-color: #fff;
          }
        }
      }
      .button{
        width: 100%;
        height: rem(98);
        line-height: rem(98);
        color: #fff;
        text-align: center;
        position: fixed;
        bottom: 0;
        background-color: #1f80eb;
        
      }
    }


</style>
