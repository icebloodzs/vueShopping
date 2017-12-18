<template>
<div class="wrapper">
  <mu-tabs :value="activeTab" @change="handleTabChange" class="tabs" lineClass>
    <mu-tab value="tab1" title="进行中"/>
    <mu-tab value="tab2" title="已结束"/>
  </mu-tabs>
  <div class="main">
  <div v-if="activeTab === 'tab1'">
    <div class="content">
      <img src="../assets/img/banner1.jpg">
      <div class="time">距结束 &nbsp 00：05：56</div>
      <div class="focus">1236人在关注</div>
      <span class="tilte">组员圆周 您的每日营养专家现实秒杀会员专56元速来抢购</span>
      <div class="content-bottom">
        <div class="price">
           <div class="price-list">
            <span>￥128</span>
            <span>￥198</span>
            </div>
            <div class="remain">
                <mu-linear-progress class="progress" mode="determinate" color="#1e7fea" size="10" :value="value"/><span>剩余37份</span>
            </div>
        </div>
      
        <div class="button">立即抢购</div>
      </div>
    </div>
  </div>
  <div v-if="activeTab === 'tab2'">
    <div class="content">
      <img src="../assets/img/banner1.jpg">
      <div class="time"></div>
      <div class="focus"></div>
      <span class="tilte">组员圆周 您的每日营养专家现实秒杀会员专56元速来抢购</span>
      <div class="content-bottom">
        <div class="price">
           <div class="price-list">
            <span>￥128</span>
            <span>￥198</span>
            </div>
            <div class="remain">
                <mu-linear-progress class="progress" mode="determinate" color="#1e7fea" size="10" :value="value"/><span>剩余37份</span>
            </div>
        </div>
      
        <div class="button">立即抢购</div>
      </div>
    </div>
  </div>

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
      activeTab: 'tab1',
      value:37
    }
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../style/mixin';
  @import '../assets/sass/_base.scss';
     .wrapper {
      @include wrapper;
      .lineClass{
        width: 25%;
        width: rem(20);
      }
      .mu-tab-link{
        font-size: rem(30);
         background-color: #fff;
         color: #000;
      }
      .content{
        position: relative;
        .time{
          position: absolute;
          font-size: rem(30);
          color: #fff;
          top: rem(275);
          left: rem(15);
        }
        .focus{
          position: absolute;
           font-size: rem(25);
          color: #fff;
           top: rem(275);
          right: rem(25);
        }
        margin-bottom: rem(40);
        img{
          height: rem(320);
        }
       .tilte{
          display: block;
          font-size: rem(25);
          margin-top: rem(23);
          margin-bottom: rem(23);
          margin-left: rem(24);
        }
        .content-bottom{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .price{
             margin-left: rem(24);
           .price-list{
                    span:nth-child(1){
                        color: #1e7fea;
                        font-size: rem(30);
                    }
                    span:nth-child(2){
                        font-size: rem(25);
                       color: #d2d2d2;
                      text-decoration: line-through;
                    }
              }
              .remain{
                  display: flex;
                  flex-direction: row;
                  font-size: rem(25);
                  color: #d2d2d2;
                  height: rem(25);
                  line-height: rem(25);
                  margin-top: rem(20);
                  .progress{
                      width: rem(200);
                      margin-right: rem(6);
                  }
                  span{
                    display: block;
                    margin-top: rem(-10);
                  }
              }
            }
            .button{
               margin-right: rem(24);
              width: rem(200);
              height: rem(60);
              background-color: #ff9c00;
              text-align: center;
              line-height: rem(60);
              font-size: rem(25);
              color: #fff;
            }
        }
      }
     }


</style>
