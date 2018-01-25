<template>
  <div class="wrapper">
    <img :src="item.thumbnail">
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
        <div class="content-purchase" v-if="purchase">
          <div class="content-purchase-left">
            <div v-for="item in purnum"><img :src="item.fan_head_image"></div>
          </div>
          <div class="content-purchase-right">
            已有<span>{{pur_num}}</span>人抢购</div>
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
          <a class="content-website-con-right" :href='`tel:${site.telephone}`'>
            <i class="iconfont">&#xe676;</i>
          </a>
        </div>
        <router-link :to="{path:'/dist/website',query:{id:item.id}}" tag="div" class="content-website-all">
          <div class="content-website-all-left">查看全部 {{count}} 家网点</div>
          <div class="content-website-all-right">
            <i class="iconfont">&#xe62d;</i>
          </div>
        </router-link>
      </div>
      <div class="content-detail">
        <div class="content-detail-title">商品详情</div>
        <div class="content-detail-con" v-html="item.description" :style="detailconstyle"></div>
      </div>
    </div>
    <div class="button" @click="routerClicksubmit">立即抢购</div>
  </div>

</template>
<script>
import api from "@/api";
import { getLocation, setConfig } from "@/utils/wx";
import detailsdown from "../components/detailsdown.vue";
export default {
  components: {
    detailsdown: detailsdown
  },
  created() {
    this.getData();
    this.getNumData();
  },
  data() {
    return {
      activeTab: "tab1",
      offLine: [],
      listImg: [],
      site: [],
      item: [],
      count: [],
      lng: [],
      lat: [],
      purnum: [],
      pur_num: [],
      purchase: true,
      gaintype: [],
      detailconstyle: {
        fontSize: "0.4rem!important"
      }
    };
  },
  methods: {
    handleTabChange(val) {
      this.activeTab = val;
    },
    routerClicksubmit() {
      let id = this.$route.query.id;
      // let fan_id =  Window.AppConfig.uid
      this.$router.push({
        path: "/dist/submit",
        query: {
          fan_id: 30,
          id: id,
          lng: this.lng,
          lat: this.lat,
          gaintype: this.gaintype
        }
      });
    },
    routerClickgoback() {
      this.$router.go(-1);
    },
    routerClickdetails() {
      this.$router.push("/dist/detail");
    },
    //商品详情获取
    async getData() {
      let goods_id = this.$route.query.id;
      await setConfig(Window.AppConfig);
      let _data = await getLocation();
      this.lng = _data.longitude;
      this.lat = _data.latitude;
      const { data } = await api.get("goods_detail", {
        goods_id: goods_id,
        lng: this.lng,
        lat: this.lat
      });
      this.item = data;
      this.gaintype = this.item.extract_type;
      if (this.item.extract_type === 1) {
        this.offLine = false;
      } else {
        this.offLine = true;
        this.count = this.item.site.length;
        this.site = this.item.site[0];
      }
    },
    //商品已购人数及头像获取
    async getNumData() {
      let goods_id = this.$route.query.id;
      const { data } = await api.get("bought_list", {
        goods_id: goods_id
      });
      this.purnum = data.data;
      this.pur_num = this.purnum.length;
      if (!this.pur_num) {
        this.purchase = false;
      }
      if (this.pur_num > 6) {
        for (let i = 0, len = this.pur_num.length; i < 6; i++) {
          this.purnum[i] = data.data[i];
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
  img {
    height: rem(318);
  }
  .focus {
    position: absolute;
    font-size: rem(24);
    color: #fff;
    top: rem(260);
    right: rem(15);
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
        line-height: rem(74);
      }
      .content-price {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: rem(60);
        padding-right: rem(30);
        margin-top: rem(6);
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
            line-height: rem(65);
            font-size: rem(65);
            color: #1e7deb;
            margin-right: rem(15);
          }
          .content-price-left-con {
            display: flex;
            flex-direction: column;
            height: rem(65);
            span:nth-child(1) {
              font-size: rem(22);
              line-height: rem(20);
              color: #878787;
              text-decoration: line-through;
              margin-top: rem(5);
            }
            span:nth-child(2) {
              display: block;
              height: rem(25);
              margin-top: rem(10);
              font-size: rem(24);
              line-height: rem(25);
            }
          }
        }
      }
      .content-indate {
        font-size: rem(24);
        color: #999999;
        display: flex;
        justify-content: space-between;
        margin-top: rem(30);
        line-height: rem(86);
        border-top: 1px solid #e9e9e9;
        border-bottom: 1px solid #e9e9e9;
        padding-right: rem(30);
        padding-bottom: rem(3);
      }
      .content-purchase {
        display: flex;
        justify-content: space-between;
        height: rem(112);
        align-items: center;
        img {
          width: rem(64);
          height: rem(64);
          border-radius: rem(32);
          margin-right: rem(19);
        }
        .content-purchase-right {
          font-size: rem(28);
          line-height: rem(112);
          padding-right: rem(30);
          span {
            text-align: center;
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
        height: rem(88);
        font-size: rem(30);
        line-height: rem(90);
        font-weight: 600;
      }
      .content-website-con {
        display: flex;
        border-top: 1px solid #e9e9e9;
        border-bottom: 1px solid #e9e9e9;
        justify-content: space-between;
        align-items: center;
        .content-website-con-left {
          display: flex;
          flex-direction: column;
          padding: rem(24) rem(55) rem(29) 0;
          line-height: rem(48);
          span:nth-child(1) {
            font-size: rem(28);
            line-height: 1;
          }
          span:nth-child(2) {
            margin-top: rem(10);
            font-size: rem(24);
            color: #666666;
            line-height: rem(44);
          }
          span:nth-child(3) {
            font-size: rem(24);
            color: #999999;
            .iconfont {
              font-family: "iconfont";
              font-size: rem(28);
              font-style: normal;
            }
          }
        }
        .content-website-con-right {
          display: block;
          border-left: 1px solid #e9e9e9;
          width: rem(150);
          height: rem(70);
          padding: rem(15) rem(74) rem(15) rem(35);
          text-decoration: none;
          .iconfont {
            font-family: "iconfont";
            font-size: rem(40);
            line-height: rem(40);
            font-style: normal;
            color: #666;
          }
        }
      }
      .content-website-all {
        display: flex;
        justify-content: space-between;
        height: rem(88);
        line-height: rem(88);
        .content-website-all-left {
          color: rgb(0,129,226);
          font-size: rem(28);
        }
        .content-website-all-right {
          margin-right: rem(30);
          .iconfont {
            font-family: "iconfont";
            font-size: rem(30);
            font-style: normal;
            color: #c7c8cd;
            font-weight: 600;
          }
        }
      }
    }
    .content-detail {
      background-color: #fff;
      padding-left: rem(30);
      margin-top: rem(22);
      .content-detail-title {
        font-size: rem(30);
        line-height: rem(88);
        text-align: left;
        border-bottom: 1px solid #e9e9e9;
        font-weight: 600;
      }
      .content-detail-con {
        height: 100%;
        background-color: #fff;
        font-size: rem(30) !important;
        line-height: 1.5;
        padding-bottom: rem(100);
      }
    }
  }
  .button {
    width: 100%;
    height: rem(98);
    line-height: rem(96);
    color: #fff;
    text-align: center;
    position: fixed;
    bottom: 0;
    background-color: rgb(31,127,234);
    font-size: rem(30);
  }
}
</style>
