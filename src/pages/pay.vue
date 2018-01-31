<template>
  <div class="wrapper">
    <div class="pay">
      <div class="pay-head">
        <strong>
          <i class="iconfont" @click="routerClickgoback">&#xe600;</i>
        </strong>
        订单详情
      </div>
      <div class="pay-head-con" @click="routerClickdetails(items.goods_id)">
        <img :src="items.goods_thumbnail">
        <div class="pay-head-right">
          <div class="pay-head-title">
            <strong>{{items.goods_name}}</strong>
          </div>
          <div class="pay-head-down">
            <div class="pay-head-down-left">总价:{{items.total}}</div>
            <div class="pay-head-down-right">
              <i class="iconfont">&#xe62d;</i>
            </div>
          </div>
        </div>
      </div>
      <div class="cancel-code" v-if="ticket&&ticket.ticket_code_deadline">
        <div class="cancel-code-title">
          <strong>核销码</strong>
        </div>
        <div class="cancel-code-con">
          <div class="cancel-code-icon left"></div>
          <div class="cancel-code-icon right"></div>
          <div class="cancel-code-up">
            <span>有效期至{{ticket.ticket_code_deadline}}</span>
            <span :style="stateStyle">{{state}}核销</span>
          </div>
          <div class="cancel-code-down">
            核销码:&nbsp;
            <span :style="codeStyle">{{ticket.ticket_code}}</span>
          </div>
        </div>
      </div>
      <!-- <div class="pay-button" @click="routerClicksubmit(items.goods_id,items.id)">立即付款</div> -->
      <div class="pay-con">
        <div class="content-pay">
          <div v-if="type === 'store'" class="content-store">
            <div class="content-pay-title">
              <strong>适用门店</strong>
            </div>
            <div class="content-pay-con">
              <div class="content-pay-con-left">
                <span>{{site.name}}</span>
                <span>{{site.detailed_address}}</span>
                <span>
                  <i class="iconfont">&#xe715;</i>{{site.distance}}km</span>
              </div>
              <a class="content-pay-con-right" :href='`tel:${site.telephone}`'>
                <i class="iconfont">&#xe676;</i>
              </a>
            </div>
          </div>
          <div v-if="type === 'gain'" class="gain-info">
            <span>收货人：&nbsp;{{address.consignee_name}} &nbsp; {{address.mobile}}</span>
            <span>地&nbsp;&nbsp;&nbsp;址：&nbsp;{{address.detail_address}}</span>
          </div>
          <div class="content-pay-info">
            <div class="content-pay-info-title">
              <strong>订单信息</strong>
            </div>
            <div class="content-pay-info-con">
              <span>订单总额：&nbsp; ￥{{items.total}}</span>
              <span>优惠金额：&nbsp; ￥{{items.reduced_price}}</span>
              <span>实付金额：&nbsp; ￥{{items.actual_price}}</span>
              <span>联系方式：&nbsp; {{items.mobile}}</span>
              <span>订单编号：&nbsp; {{items.order_id}}</span>
              <span>下单时间：&nbsp; {{items.created_at}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  components: {},
  data() {
    return {
      type: "",
      items: [],
      lng: [],
      lat: [],
      site: [],
      address: [],
      gaintype: [],
      ticket: [],
      codeStyle: [],
      stateStyle: {},
      state: "",
    };
  },
  mounted() {
    this.getPayData();
  },
  methods: {
    routerClickgoback() {
       this.$router.push({
        path: "/dist/mycenter",
        query: { fan_id: 30 }
      });
    },
    routerClicksubmit(goodsId, order_id) {
      this.$router.push({
        path: "/dist/submit",
        query: {
          fan_id: 30,
          id: goodsId,
          lng: this.lng,
          lat: this.lat,
          gaintype: this.gaintype,
          order_id: order_id
        }
      });
    },
    routerClickdetails(goodsId) {
      this.$router.push({
        path: "/dist/details",
        query: { id: goodsId }
      });
    },
    async getPayData() {
      let order_id = this.$route.query.order_id;
      let _data = await this.wx.getLocation();
      this.lng = _data.longitude;
      this.lat = _data.latitude;
      const { data } = await this.api.get("order_detail", {
        order_id: order_id,
        lng: this.lng,
        lat: this.lat
      });
      this.items = data;
      if (data.address) {
        this.address = data.address;
        this.type = "gain";
      }
      if (!data.address) {
        this.site = data.sites[0];
        this.type = "store";
        this.ticket = this.items.ticket;
        if (this.ticket.ticket_code_status == 1) {
          this.state = "未";
          this.codeStyle = "color:#1c7ee9";
        }
        if (this.ticket.ticket_code_status == 2) {
          this.state = "已";
          this.stateStyle = "color: #1c7ee9;";
          this.codeStyle = "color: #c8c8c8";
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
  height: 100vh;
  background-color: #f4f4f4;
  .pay {
    .pay-head {
      height: rem(90);
      background-color: #fff;
      font-size: rem(30);
      line-height: rem(90);
      text-align: center;
      color: #000;
      font-weight: 600;
      border-bottom: 1px solid #e9e9e9;
      .iconfont {
        font-family: "iconfont";
        font-size: rem(30);
        font-style: normal;
        position: absolute;
        width: rem(120);
        left: 0;
        color: #d4d4d4;
      }
    }
    .pay-button {
      width: rem(700);
      height: rem(75);
      color: #fff;
      background-color: #ff9c00;
      font-size: rem(30);
      line-height: rem(75);
      text-align: center;
      border-radius: rem(12);
      margin: rem(20) rem(25);
    }
    .cancel-code {
      .cancel-code-title {
        line-height: rem(74);
        text-align: left;
        padding-left: rem(50);
      }
      .cancel-code-con {
        margin: 0 rem(25) rem(20);
        background-color: #fff;
        position: relative;
        .cancel-code-icon {
          width: rem(22);
          height: rem(22);
          position: absolute;
          border-radius: 50%;
          z-index: 2;
          background-color: #f4f4f4;
          top: rem(85);
        }
        .left {
          left: rem(-11);
          margin-right: rem(30);
        }
        .right {
          margin-left: rem(30);
          right: rem(-11);
        }
        .cancel-code-up {
          line-height: rem(94);
          display: flex;
          justify-content: space-between;
          span:nth-child(1) {
            padding-left: rem(25);
          }
          span:nth-child(2) {
            //  color: #1c7ee9;
            padding-right: rem(35);
          }
        }
        .cancel-code-down {
          border-top: rem(4) dashed #f4f4f4;
          line-height: rem(94);
          text-align: center;
          //   color: #c8c8c8;
          //   span {
          //     color: #1c7ee9;
          //   }
        }
      }
    }
    .pay-head-con {
      display: flex;
      flex-direction: row;
      padding-right: rem(27);
      height: rem(180);
      background-color: #fff;
      img {
        width: rem(160);
        height: rem(123);
        margin: rem(23) rem(24) 0 rem(30);
      }
      .pay-head-right {
        display: flex;
        flex-direction: column;
        width: rem(525);
        .pay-head-title {
          font-size: rem(30);
          line-height: rem(90);
        }
        .pay-head-down {
          font-size: rem(30);
          display: flex;
          justify-content: space-between;
          color: #666666;
          margin-top: rem(20);
          .pay-head-down-right {
            .iconfont {
              font-family: "iconfont";
              font-size: rem(30);
              font-style: normal;
              color: #d4d4d4;
            }
          }
        }
      }
    }
    .content-pay {
      margin: rem(30) rem(25);
      padding: 0 rem(20);
      background-color: #fff;
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
      .content-pay-title {
        font-size: rem(32);
        line-height: rem(88);
        text-align: left;
      }
      .content-pay-con {
        display: flex;
        border-top: 1px solid #e9e9e9;
        border-bottom: 2px dashed #e9e9e9;
        justify-content: space-between;
        align-items: center;
        .content-pay-con-left {
          display: flex;
          flex-direction: column;
          line-height: rem(48);
          padding: rem(24) rem(55) rem(29) 0;
          span:nth-child(1) {
            font-size: rem(28);
            line-height: 1;
          }
          span:nth-child(2) {
            margin-top: rem(10);
            font-size: rem(24);
            color: #666;
            line-height: rem(44);
          }
          span:nth-child(3) {
            font-size: rem(24);
            color: #999;
            .iconfont {
              font-family: "iconfont";
              font-size: rem(28);
              font-style: normal;
            }
          }
        }
        .content-pay-con-right {
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
      .content-pay-info {
        font-size: rem(30);
        text-align: left;

        .content-pay-info-title {
          line-height: rem(88);
          border-bottom: 1px solid #e9e9e9;
        }
        .content-pay-info-con {
          display: flex;
          flex-direction: column;
          color: #a1a1a1;
          line-height: rem(50);
          padding: rem(20) 0;
        }
      }
    }
  }
}
</style>
