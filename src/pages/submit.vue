<template>
  <div class="wrapper">
    <div class="confirm">
      <div class="confirm-head">
        <strong>
          <i class="iconfont" @click="routerClickgoback">&#xe600;</i> 信息确认</strong>
      </div>
      <div class="gain-info" @click="routerClickedit(address.id)">
        <img src="../assets/img/border.png">
        <span>收货人：&nbsp;{{address.consignee_name}} &nbsp; {{address.mobile}}</span>
        <span>地&nbsp;&nbsp;&nbsp;址：&nbsp;{{address.detail_address}}</span>
        <img src="../assets/img/border.png">
      </div>
      <div class="info-tilte">
        <span>
          {{goods.name}}
        </span>
      </div>
      <div class="info-content">
        <div class="info-amount price">
          <span> 数量：</span>
          <span class="info-amount-right">
            <div class="minus operation" @click="routerClickminus">一</div>
            <span>{{ counter }}</span>
            <div class="plus operation" v-on:click="counter += 1">
              <i class="iconfont">&#xe6b9;</i>
            </div>
          </span>
        </div>
        <div class="info-subtotal price">
          <span>小计：</span>
          <span>
            <span>&#65509;</span> {{ counter*goods.price_spike | currency }}</span>
        </div>
      </div>
      <div class="bind-phone" @click="bindPhone">
        <div class="bind-phone-tilte">您绑定的电话</div>
        <div class="bind-phone-con">
          <div class="bind-phone-con-left">{{tel}}</div>
          <div class="bind-phone-con-right">绑定新号码
            <i class="iconfont">&#xe62d;</i>
          </div>
        </div>
      </div>
      <div class="submit-order" @click="openBottomSheet">提交订单</div>
      <div class="mu-overlay" v-if="bottomSheet" @click="closeBottomSheet" style="opacity: 0.4; background-color: rgb(0, 0, 0); position: fixed; z-index:1;"></div>
      <div class="muz-list" v-if="bottomSheet">
        <div class="mu-list-head">
          <strong>支付方式</strong>
        </div>
        <div class="mu-list-item" :class="{active: isActive}" @click="isActive1">
          <img src="../assets/img/zhongyuan_logo_02.png" alt=""> 中原银行卡支付（2366）
        </div>
        <div class="mu-list-item" :class="{actives: isActives}" @click="isActive2">
          <img src="../assets/img/weixin_logo_02.png" alt=""> 微信支付
        </div>
        <i class="iconfont" :class="{iconfontsite: isActive}">&#xe721;</i>
        <div class="mu-list-button" @click="payNow">立即支付</div>
      </div>
    </div>
  </div>

</template>
<script>
import api from "@/api";
export default {
  components: {},
  data() {
    return {
      counter: 1,
      bottomSheet: false,
      isActive: true,
      isActives: false,
      items: [],
      goods: [],
      tel: [],
      address: [],
      alladdress: []
    };
  },
  mounted() {
    this.getGoodsData();
    this.getTelData();
    this.getAddressData();
  },
  methods: {
    routerClickgoback() {
      this.$router.go(-1);
    },
    bindPhone() {
      let fan_id = this.$route.query.fan_id;
      this.$router.push({ path: "/dist/bindphone", query: { fan_id: fan_id } });
    },
    routerClickminus() {
      if (this.counter > 1) this.counter -= 1;
    },
    closeBottomSheet() {
      this.bottomSheet = false;
    },
    openBottomSheet() {
      this.bottomSheet = true;
    },
    isActive1() {
      (this.isActive = true), (this.isActives = false);
    },
    isActive2() {
      (this.isActive = false), (this.isActives = true);
    },
    async payNow() {
      let fan_id = this.$route.query.fan_id;
      let goods_id = this.$route.query.id;
      let amount = this.counter;
      let lng = this.$route.query.lng;
      let lat = this.$route.query.lat;
      const { data } = await api.get("create_order", {
        goods_id: goods_id,
        fan_id: fan_id,
        amount: amount,
        lng: lng,
        lat: lat
      });
      this.items = data;
      console.log(this.items);
    },
    async getGoodsData() {
      let goods_id = this.$route.query.id;
      let lng = this.$route.query.lng;
      let lat = this.$route.query.lat;
      const { data } = await api.get("goods_detail", {
        goods_id: goods_id,
        lng: lng,
        lat: lat
      });
      this.goods = data;
    },
    async getTelData() {
      let fan_id = this.$route.query.fan_id;
      const { data } = await api.get("get_bind_mobile", {
        fan_id: fan_id
      });
      this.tel = data.data.mobile;
    },
    async getAddressData() {
      let that = this;
      let fan_id = this.$route.query.fan_id;
      const { data } = await api.get("shipping_address_list", {
        fan_id: fan_id
      });
      this.alladdress = data.data;
      for (let i = 0, len = this.alladdress.length; i < len; i++) {
        if (that.alladdress[i].is_default == 1) {
          that.address = that.alladdress[i];
        } else {
          this.address = this.alladdress[0];
        }
      }
    },
    routerClickedit(profile_id) {
      let id = profile_id;
      this.$router.push({
        path: "/dist/editprofile",
        query: { fan_id: 30, id: id }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../style/mixin";
@import "../assets/sass/_base.scss";

.wrapper {
  @include wrapper;
  .confirm {
    height: 100vh;
    background-color: #f2f2f2;
    .confirm-head {
      height: rem(90);
      background-color: #fff;
      font-size: rem(30);
      line-height: rem(90);
      text-align: center;
      .iconfont {
        font-family: "iconfont";
        font-size: rem(48);
        font-style: normal;
        position: absolute;
        width: rem(120);
        left: 0;
        color: #28a2f7;
      }
    }
    .gain-info {
      display: flex;
      flex-direction: column;
      background-color: #fff;
      span {
        padding-left: rem(20);
        font-size: rem(30);
        line-height: rem(60);
      }
      span:nth-child(2) {
        margin-top: rem(15);
      }
      span:nth-child(3) {
        margin-bottom: rem(15);
      }
    }
    .info-tilte {
      background-color: #f2f2f2;
      font-size: rem(30);
      line-height: rem(100);
      font-weight: 600;
      padding-left: rem(30);
      color: #666666;
    }
    .info-content {
      width: 100%;
      background-color: #fff;
      padding: 0 rem(30);
      .price {
        display: flex;
        justify-content: space-between;
        height: rem(90);
        font-size: rem(30);
        line-height: rem(90);
        .operation {
          border: rem(2) solid #999;
          width: rem(44);
          height: rem(44);
          margin: auto 0;
          color: #999;
          text-align: center;
          border-radius: rem(5);
        }
        .minus {
          font-size: rem(28);
          line-height: rem(42);
          text-align: center;
        }
        .plus {
          line-height: rem(42);
          .iconfont {
            text-align: center;
            font-family: "iconfont";
            font-size: rem(40);
            font-style: normal;
          }
        }
        .info-amount-right {
          display: flex;
          flex-direction: row;
          span:nth-child(2) {
            margin: 0 rem(18);
          }
        }
      }
      .info-subtotal {
        border-top: 1px solid #f2f2f2;
        span:nth-child(2) {
          color: #ff5500;
          font-weight: 600;
          font-size: rem(32);
          span {
            font-family: "SimSun";
            font-size: rem(26);
            font-weight: 600;
          }
        }
      }
    }
    .bind-phone {
      .bind-phone-tilte {
        height: rem(82);
        font-size: rem(30);
        line-height: rem(82);
        padding-left: rem(30);
        color: #666;
      }
      .bind-phone-con {
        display: flex;
        justify-content: space-between;
        font-size: rem(30);
        line-height: rem(90);
        background-color: #fff;
        padding: 0 rem(30);
        .bind-phone-con-left {
          color: #989898;
        }
        .bind-phone-con-right {
          .iconfont {
            font-family: "iconfont";
            font-size: rem(30);
            font-style: normal;
            color: #858585;
          }
        }
      }
    }
    .submit-order {
      width: 100%;
      position: fixed;
      bottom: 0;
      background-color: #29a1f7;
      height: rem(100);
      color: #fff;
      font-size: rem(30);
      line-height: rem(106);
      text-align: center;
    }
    .muz-list {
      width: 100%;
      bottom: 0;
      position: absolute;
      font-size: rem(30);
      line-height: rem(100);
      text-align: center;
      z-index: 2;
      background: #fff;
      .mu-list-item {
        display: flex;
        flex-direction: row;
        border-top: 1px solid #fff;
        border-bottom: 1px solid #fff;
        img {
          height: rem(100);
          width: rem(120);
        }
      }
      .mu-list-button {
        color: #fff;
        background: #29a1f7;
      }
      .iconfont {
        font-family: "iconfont";
        font-size: rem(50);
        font-style: normal;
        position: absolute;
        height: rem(100);
        bottom: rem(100);
        right: rem(65);
        color: #29a1f7;
        z-index: 3;
        &.iconfontsite {
          bottom: rem(200);
        }
      }
      .active {
        border-top: 1px solid #e9e9e9;
        border-bottom: 1px solid #e9e9e9;
      }
      .actives {
        border-top: 1px solid #e9e9e9;
        border-bottom: 1px solid #e9e9e9;
      }
    }
  }
}
</style>
