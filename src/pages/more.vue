<template>
<div class="wrapper">
  <i class="iconfont" @click="routerClickgoback">&#xe600;</i>
  <mu-tabs class="tabs" :value="activeTab" @change="handleTabChange" :lineClass= "{ blue:isActive,actleft:actleft }">
    <mu-tab value="tab1"  @active="tab1Active" title="进行中"/>
    <mu-tab value="tab2"  @active="tab2Active" title="已结束"/>
  </mu-tabs>
  <div class="main">
  <div v-if="activeTab === 'tab1'">
    <div class="content" v-for="item in items">
      <img src="../assets/img/banner1.jpg">
        <moredown :endTime="endTime"></moredown>
      <!-- <div class="time">距结束 &nbsp 00：05：56</div> -->
      <div class="focus"><i class="iconfont">&#xe826;</i><span>1236人在关注</span></div>
      <span class="tilte">{{item.name}}</span>
      <div class="content-bottom">
        <div class="price">
           <div class="price-list">
            <span>￥{{item.price_spike}}</span>
            <span>￥{{item.original_price}}</span>
            </div>
            <div class="remain">
                <mu-linear-progress class="progress" mode="determinate" color="#1e7fea" :max="50"  :value="value"/><span>剩余{{item.surplus}}份</span>
            </div>
        </div>
      
        <div class="button"  @click="routerClickdetails">立即抢购</div>
      </div>
    </div>
  </div>
  <div v-if="activeTab === 'tab2'">
    <div class="content" v-for="item in items2">
      <img src="../assets/img/banner1.jpg">
    <!-- <moredown :endTime="endTime"></moredown> -->
      <div class="focus"><i class="iconfont">&#xe826;</i>1236人在关注</div>
      <span class="tilte">{{item.name}}</span>
      <div class="content-bottom">
        <div class="price">
           <div class="price-list">
            <span>￥{{item.price_spike}}</span>
            <span>￥{{item.original_price}}</span>
            </div>
            <div class="remain">
                <mu-linear-progress class="progress" mode="determinate" color="#1e7fea" :max="50" :value="value"/><span>剩余{{item.surplus}}份</span>
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
import axios from "axios";
import moredown from '../components/moredown.vue'
export default {
  components: {
    'moredown':moredown
  },
  data () {
    return {
      actleft:true,
      isActive: false,
      activeTab: 'tab1',
      value:37,
      endTime : '2017-12-21 18:00:00',
      basePath:"http://dev.mp.duduapp.net",
      has_id:"1wxAvPWzQro2G4RXkBrd",
      items:[],
      items2:[]
    }
  },
  mounted(){
    this.getMoreData()
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val
    },routerClickdetails(){
      this.$router.push("/dist/details");
    },routerClickgoback(){
      this.$router.go(-1);
    },tab2Active () {
      this.isActive = true
      this.getMoreData2() 
    },tab1Active () {
      this.isActive = false
    },getMoreData() {
      let that = this
      let classId = this.$route.query.classId
      let url=`${this.basePath}/h5/${this.has_id}?action=goods_list&classification_id=${classId}`
      console.log(url)
      axios.get(url,{
         headers: {'Token': 'elo4aEFQdDVMMGZwMFJVb3pub1Rqd1piSklGclY4ZjBjNSthOXNUd1VORT0.'},
      }).then(function(response) {
        that.items = response.data.data
        console.log(that.items)
      })
    },getMoreData2() {
      let that = this
      let status = 1
      
      let url=`${this.basePath}/h5/${this.has_id}?action=goods_list&status=${status}`
      axios.get(url,{
         headers: {'Token': 'elo4aEFQdDVMMGZwMFJVb3pub1Rqd1piSklGclY4ZjBjNSthOXNUd1VORT0.'},
      }).then(function(response) {
        that.items2 = response.data.data
        // console.log(that.items2)
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
          color: #1979e7;
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
          top: rem(270);
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
          padding-top: rem(23);
          padding-bottom: rem(23);
          padding-left: rem(24);
          background-color: #fff;
        }
        .content-bottom{
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #fff;
          padding-bottom:rem(10);
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
                      margin-left:rem(10);
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
                    height: rem(14);
                    border-radius: rem(7);
                    background-color: #e4e4e4;
                  }
                  span{
                    display: block;
                    margin-top: rem(-10);
                    color: #666;
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
.tabs{
  height: rem(90)!important;
  background-color: #fff!important;
  .actleft{
    background: #1979e7 !important;
    height: rem(4) !important;
    width:rem(150)  !important;
    transform: translate3d(rem(110),0px,0px)!important;
    &.blue{
      transform: translate3d(rem(490),0px,0px)!important;
    }
  }
} 
</style>
