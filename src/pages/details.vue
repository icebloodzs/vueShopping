<template>
  <div class="wrapper">
    <img :src="item.thumbnail" style="height:4.27rem">
    <div class="focus">
      <i class="iconfont">&#xe826;</i>
      <span>1236人在关注</span>
    </div>
    <div class="goback">
      <i class="iconfont" @click="routerClickgoback">&#xe600;</i>
    </div>
    <div class="content">
      <div class="content-head">
        <div class="content-title">
          <strong>{{item.name}}</strong>
        </div>
        <div class="content-price">
          <div class="content-price-left">
            <span class="original-icon">￥</span>
            <span class="original-price">{{item.price_spike}}</span>
            <div class="content-price-left-con">
              <span>￥{{item.original_price}}</span>
              <span>剩余{{item.surplus}}份</span>
            </div>
          </div>
          <detailsdown :endTime="item.end_time"></detailsdown>
        </div>
        <div class="content-indate">
          <div class="content-indate-left">此商品有效期至</div>
          <div class="content-indate-right">{{item.end_time}}</div>
        </div>
        <div class="content-purchase">
          <div class="content-purchase-left"><img src="../assets/img/dwqvas_02.jpg"></div>
          <div class="content-purchase-right">已有
            <span>67</span>人抢购</div>
        </div>
      </div>
      <div v-if="offLine" class="content-website">
        <div class="content-website-title">领取网点</div>
        <div class="content-website-con">
          <div class="content-website-con-left">
            <span>{{site.name}}</span>
            <span>{{site.detailed_address}}</span>
            <span>
              <i class="iconfont">&#xe715;</i>{{site.distance}}km</span>
          </div>
          <a class="content-website-con-right" :href="site.telephone">
            <i class="iconfont">&#xe676;</i>
          </a>
        </div>
        <router-link :to="{path:'/dist/website',query:{id:item.id,lng:116.30387397,lat:39.91481908}}" tag="div" class="content-website-all">
          <div class="content-website-all-left">查看全部3家网点</div>
          <div class="content-website-all-right">
            <i class="iconfont">&#xe62d;</i>
          </div>
        </router-link>
      </div>
      <div class="content-detail">
        <div class="content-detail-title">商品详情</div>
        <div class="content-detail-con">
        </div>
      </div>
    </div>
    <div class="button" @click="routerClicksubmit">立即抢购</div>
  </div>

</template>
<script>
import api from "@/api";
import detailsdown from "../components/detailsdown.vue";
export default {
  components: {
    'detailsdown': detailsdown
  },
  created() {
    this.getData();
  },
  data() {
    return {
      activeTab: "tab1",
      offLine: [],
      listImg: [],
      site: [],
      item: []
    };
  },
  methods: {
    handleTabChange(val) {
      this.activeTab = val;
    },
    routerClicksubmit() {
      let id = this.$route.query.id;
      let lng = this.$route.query.lng;
      let lat = this.$route.query.lat;
      this.$router.push({
        path: "/dist/submit",
        query: { 'fan_id': 30, 'id': id,'lng':lng,'lat':lat }
      });
    },
    routerClickgoback() {
      this.$router.go(-1);
    },
    routerClickdetails() {
      this.$router.push("/dist/detail");
    },
    async getData() {
      let goods_id = this.$route.query.id;
      let lng = this.$route.query.lng;
      let lat = this.$route.query.lat;
      const { data } = await api.get("goods_detail", {
        'goods_id': goods_id,
        'lng': lng,
        'lat': lat
      });
      this.item = data;
      if (this.item.extract_type === 1) {
        this.offLine = false;
      } else {
        this.offLine = true;
        this.site = this.item.site[0];
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
  .focus {
    position: absolute;
    font-size: rem(22);
    color: #fff;
    top: rem(275);
    right: rem(25);
    z-index: 2;
    .iconfont {
      font-family: "iconfont";
      font-style: normal;
      top: -0.1rem;
      left: -0.43rem;
      width: rem(17);
      font-size: rem(30);
      height: rem(22);
      position: absolute;
      color: #1f7ee8;
    }
  }
  .goback {
    width: rem(60);
    height: rem(60);
    border-radius: rem(30);
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    position: absolute;
    top: rem(12);
    left: rem(15);
    z-index: 1;
    text-align: center;
    .iconfont {
      font-family: "iconfont";
      font-size: rem(36);
      font-style: normal;
      line-height: rem(60);
      margin-left: rem(10);
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
    .content-head {
      background-color: #fff;
      padding-left: rem(30);
      .content-title {
        font-size: rem(30);
        text-align: left;

        line-height: rem(80);
      }
      .content-price {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: rem(60);
        padding-right: rem(30);
        .content-price-left {
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          height: rem(60);
          .original-icon {
            display: block;
            line-height: rem(45);
            font-size: rem(45);
            color: #1e7deb;
          }
          .original-price {
            display: block;
            line-height: rem(60);
            font-size: rem(60);
            color: #1e7deb;
            margin-right: rem(15);
          }
          .content-price-left-con {
            display: flex;
            flex-direction: column;
            height: rem(60);
            span:nth-child(1) {
              font-size: rem(20);
              line-height: rem(20);
              color: #878787;
              text-decoration: line-through;
              margin-top: rem(5);
            }
            span:nth-child(2) {
              display: block;
              height: rem(25);
              margin-top: rem(10);
              font-size: rem(25);
              line-height: rem(25);
            }
          }
        }
      }
      .content-indate {
        font-size: rem(25);
        color: #999999;
        display: flex;
        justify-content: space-between;
        margin-top: rem(30);
        line-height: rem(88);
        border-top: 1px solid #e9e9e9;
        border-bottom: 1px solid #e9e9e9;
        padding-right: rem(30);
      }
      .content-purchase {
        display: flex;
        justify-content: space-between;
        height: rem(116);

        align-items: center;
        img {
          width: rem(66);
          height: rem(66);
          border-radius: rem(33);
          margin-right: rem(25);
        }
        .content-purchase-right {
          font-size: rem(25);
          line-height: rem(66);
          padding-right: rem(30);
          span {
            color: #28a2f5;
          }
        }
      }
    }
    .content-website {
      margin-top: rem(20);
      padding-left: rem(30);
      background-color: #fff;
      .content-website-title {
        height: rem(90);
        font-size: rem(30);
        line-height: rem(90);
      }
      .content-website-con {
        display: flex;
        border-top: 1px solid #e9e9e9;
        border-bottom: 1px solid #e9e9e9;
        justify-content: space-between;
        align-items: center;
        height: rem(168);
        .content-website-con-left {
          display: flex;
          flex-direction: column;
          // width: rem(572);
          line-height: rem(48);
          span:nth-child(1) {
            font-size: rem(27);
          }
          span:nth-child(2) {
            font-size: rem(25);
            color: #666666;
          }
          span:nth-child(3) {
            font-size: rem(22);
            color: #999999;
            .iconfont {
              font-family: "iconfont";
              font-size: rem(30);
              font-style: normal;
            }
          }
        }
        .content-website-con-right {
          display: block;
          border-left: 1px solid #e9e9e9;
          width: rem(120);
          height: rem(70);
          padding: rem(10) rem(30);
          margin-right: rem(30);
          .iconfont {
            font-family: "iconfont";
            font-size: rem(45);
            font-style: normal;
            color: #666;
          }
        }
      }
      .content-website-all {
        display: flex;
        justify-content: space-between;
        height: rem(90);
        line-height: rem(90);
        .content-website-all-left {
          color: #0280e6;
        }
        .content-website-all-right {
          margin-right: rem(30);
          .iconfont {
            font-family: "iconfont";
            font-size: rem(30);
            font-style: normal;
            color: #c7c8cd;
          }
        }
      }
    }
    .content-detail {
      background-color: #fff;
      padding-left: rem(30);
      margin-top: rem(20);
      .content-detail-title {
        font-size: rem(30);
        line-height: rem(90);
        text-align: left;
        border-bottom: 1px solid #e9e9e9;
      }
      .content-detail-con {
        height: rem(300);
        background-color: #fff;
      }
    }
  }
  .button {
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
