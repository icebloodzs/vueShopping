<template>
<div class="wrapper">
  <i class="iconfont" @click="routerClickgoback">&#xe600;</i>
  <mu-tabs :value="activeTab" @change="handleTabChange" :lineClass="['blue']">
    <mu-tab value="tab1" title="进行中"/>
    <mu-tab value="tab2" title="已结束"/>
  </mu-tabs>
  <div class="main">
  <div v-if="activeTab === 'tab1'">
    <div class="content">
      <img src="../assets/img/banner1.jpg">
        <moredown :endTime="endTime"></moredown>
      <!-- <div class="time">距结束 &nbsp 00：05：56</div> -->
      <div class="focus"><i class="iconfont">&#xe826;</i><span>1236人在关注</span></div>
      <span class="tilte">组员圆周 您的每日营养专家现实秒杀会员专56元速来抢购</span>
      <div class="content-bottom">
        <div class="price">
           <div class="price-list">
            <span>￥128</span>
            <span>￥198</span>
            </div>
            <div class="remain">
                <mu-linear-progress class="progress" mode="determinate" color="#1e7fea" :size="10" :value="value"/><span>剩余37份</span>
            </div>
        </div>
      
        <div class="button"  @click="routerClickdetails">立即抢购</div>
      </div>
    </div>
  </div>
  <div v-if="activeTab === 'tab2'">
    <div class="content">
      <img src="../assets/img/banner1.jpg">
    <!-- <moredown :endTime="endTime"></moredown> -->
      <div class="focus"><i class="iconfont">&#xe826;</i>1236人在关注</div>
      <span class="tilte">组员圆周 您的每日营养专家现实秒杀会员专56元速来抢购</span>
      <div class="content-bottom">
        <div class="price">
           <div class="price-list">
            <span>￥128</span>
            <span>￥198</span>
            </div>
            <div class="remain">
                <mu-linear-progress class="progress" mode="determinate" color="#1e7fea" :size="10" :value="value"/><span>剩余37份</span>
            </div>
        </div>
      
        <div class="button-end">已结束</div>
      </div>
    </div>
  </div>

  </div>
</div>

</template>
<script>
  import $ from "jquery";
  import moredown from '../components/moredown.vue'
export default {
    components: {
        'moredown':moredown
    },
  data () {
    return {
      activeTab: 'tab1',
      value:37,
        endTime : '2017-12-21 18:00:00',
    }
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val
    },routerClickdetails(){
        this.$router.push("/dist/details");
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
        .iconfont{
            font-family:"iconfont"; font-size:rem(50); font-style:normal;
            position: absolute;
            width: rem(100);
            top:0;
             height: rem(80);
            line-height: rem(90);
            left:rem(25);
            color: #666666;
            z-index: 10;
        }
      .mu-tab-link {
          font-size: rem(30);
          background-color: #fff;
          color: #000;
          border: 1px solid #fff;
          height: rem(80);
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
      .content{
        position: relative;
        margin-top:rem(5);
        .time{
          position: absolute;
          font-size: rem(30);
          color: #fff;
          top: rem(275);
          left: rem(15);
        }
        .focus{
            position: absolute;
            font-size: rem(22);
            color: #fff;
            top: rem(275);
            right: rem(25);
          
          .iconfont{
            top: -0.42rem;
            left: -0.43rem;
            width: rem(17);
            font-size: rem(30);
            height: rem(22);
            position: absolute;
           color: #1f7ee8;
          }
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
                       height: rem(12);
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
              border-radius: rem(5);
            }
            .button-end{
              margin-right: rem(24);
              width: rem(200);
              height: rem(60);
              background-color: #d2d2d2;
              text-align: center;
              line-height: rem(60);
              font-size: rem(25);
                border-radius: rem(5);
              color: #fff;
            }
        }
      }
     }
</style>
<style lang="scss">
 @import '../style/mixin';
.blue {
  background: #1979e7 !important;
  height: rem(4);
}
</style>
