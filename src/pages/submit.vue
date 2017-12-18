<template>
<div class="wrapper">
  <div class="confirm">
      <div class="confirm-head">
          <strong><i class="iconfont" @click="routerClickgoback">&#xe600;</i></strong>
         信息确认
      </div>
      <div class="gain-info">
            <img src="../assets/img/border.png">
            <span>收货人：孙富贵 13345668899</span>
            <span>地址：北京市劲舞路花园路男300米路东</span>
            <img src="../assets/img/border.png">    
      </div>
      <div class="info-tilte">
          <span>
              川锅一号大火锅全豪华套餐
          </span>
      </div>
      <div class="info-content ">
          <div class="info-amount price">
              
              <span> 数量:</span><span class="info-amount-right"> <div class="minus operation" @click="routerClickminus">-</div><span>{{ counter }}</span><div class="plus operation" v-on:click="counter += 1">+</div></span>
          </div>
          <div class="info-subtotal price">
              <span>小计:</span><span>￥{{ counter*unitprice }}</span>
          </div>
      </div>
      <div class="bind-phone">
         <div class="bind-phone-tilte">您绑定的电话</div> 
         <div class="bind-phone-con">
            <div class="bind-phone-con-left">150****5158</div>
            <div class="bind-phone-con-right">绑定新号码 <i class="iconfont">&#xe62d;</i></div>
         </div>
      </div>
      <div class="submit-order">提交订单</div>
  </div>
</div>

</template>
<script>
  import $ from "jquery";

export default {
    components: {
        
    },
  data () {
    return {
     counter:1,
     unitprice:180.00
    }
  },
  methods: {
    routerClickgoback(){
       this.$router.go(-1);
    },routerClickminus(){
        if(this.counter>1)
        this.counter -= 1;
    }
        
        // renturn (counter>)1 ? "counter -= 1;
    
  }
}
</script>
<style lang="scss" scoped>
  @import '../style/mixin';
  @import '../assets/sass/_base.scss';
    .wrapper {
    @include wrapper;
      .confirm{
          height: 100vh;
          background-color: #f2f2f2;
          .confirm-head{
              padding-left: rem(50);
              height: rem(90);
              background-color: #fff;
              font-size: rem(30);
              line-height: rem(90);
              text-align: center;
              .iconfont{
                   font-family:"iconfont"; font-size:rem(30); font-style:normal;
                    position: absolute;
                    width: rem(120);
                    left:0;
                    color: #28a2f7;
              }
          }
          .gain-info{
                display: flex;
                flex-direction: column;
                background-color: #fff;
                    span{
                        padding-left: rem(20);
                        font-size: rem(30);
                        line-height: rem(60);
                    }
                     span:nth-child(2){
                        margin-top: rem(15);
                    }
                     span:nth-child(3){
                        margin-bottom: rem(15);
                    }
                  
                   
          }
          .info-tilte{
              background-color: #f2f2f2;
              font-size: rem(30);
              line-height: rem(100);
              font-weight: 600;
              padding-left: rem(30);
              color :#666666;
          }
          .info-content{
              .price{
                  display: flex;
                  justify-content: space-between;
                 
                  height: rem(90);
                  font-size: rem(30);
                  background-color: #fff;
                  border: 1px solid  #f2f2f2;
                   padding: 0 rem(30);
                   line-height: rem(90);

                   .operation{
                       border: 1px solid #999999;
                       width: rem(42);
                       height: rem(42);
                       margin: auto 0;
                       font-size: rem(50);
                       line-height: rem(35);
                       text-align: center;
                   }
                   .info-amount-right{
                       display: flex;
                        flex-direction: row;
                        span:nth-child(2){
                         margin: 0 rem(18);
                         }
                   }
                  

              }
              .info-subtotal{
                    span:nth-child(2){
                       color:#ff5500;
                   }
              }
              
          }
          .bind-phone{
              .bind-phone-tilte{
                    height: rem(82);
                    font-size: rem(30);
                    line-height: rem(82);
                    padding-left: rem(30)
              }
              .bind-phone-con{
                    display: flex;
                    justify-content: space-between;
                     font-size: rem(30);
                     line-height: rem(90);
                    background-color: #fff;
                     padding: 0 rem(30);
                    .bind-phone-con-left{
                        color: #989898;
                    }
                    .bind-phone-con-right{
                         .iconfont{
                              font-family:"iconfont"; font-size:rem(30); font-style:normal;
                  }
                    }
              }
          }
          .submit-order{
              width: 100%;
              position: fixed;
              bottom: 0;
              background-color: #29a1f7;
              height: rem(106);
              color: #fff;
              font-size: rem(35);
              line-height: rem(106);
              text-align: center;
          }
      }
    }


</style>
