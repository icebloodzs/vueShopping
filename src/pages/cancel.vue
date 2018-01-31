<template>
    <div class="wrapper">
        <div class="cancel">
            <div class="cancel-head">
                <strong>
                    <i class="iconfont" @click="routerClickgoback">&#xe600;</i>
                </strong>
                订单详情
            </div>
            <div class="cancel-head-con" @click="routerClickdetails(items.goods_id)">
                <img :src="items.goods_thumbnail" alt="">
                <div class="cancel-head-right">
                    <div class="cancel-head-title">{{items.goods_name}}</div>
                    <div class="cancel-head-down">
                        <div class="cancel-head-down-left">总价:￥{{items.total}}</div>
                        <div class="cancel-head-down-right">
                            <i class="iconfont">&#xe62d;</i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cancel-code">
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
            <div class="cancel-con">
                <div class="content-cancel">

                    <div class="content-cancel-title">
                        <strong>适用门店</strong>
                    </div>
                    <div class="content-cancel-con">
                        <div class="content-cancel-con-left">
                            <span>{{site.name}}</span>
                            <span>{{site.detailed_address}}</span>
                            <span>
                                <i class="iconfont">&#xe715;</i>{{site.distance}}km
                            </span>
                        </div>
                        <div class="content-cancel-con-right">
                            <i class="iconfont">&#xe676;</i>
                        </div>
                    </div>
                    <div class="content-cancel-info">
                        <div class="content-cancel-info-title">
                            <strong>订单信息</strong>
                        </div>
                        <div class="content-cancel-info-con">
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
      items: [],
      site: [],
      ticket: [],
      codeStyle: [],
      stateStyle: {

      },
      state: "",
        lng: [],
      lat: [],
    };
  },
  mounted() {
    this.getPayData();
  },
  methods: {
    routerClickgoback() {
      this.$router.go(-1);
    },
    routerClickdetails(goodsId) {
      this.$router.push({
        path: "/dist/details",
        query: { id: goodsId, lng: this.lng, lat: this.lat }
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
      this.site = this.items.sites[0];
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
};
</script>
<style lang="scss" scoped>
@import "../style/mixin";
@import "../assets/sass/_base.scss";
.wrapper {
  @include wrapper;
  background-color: #f4f4f4;
  padding-bottom: rem(20);
  .cancel {
    font-size: rem(30);
    .cancel-head {
      height: rem(90);
      background-color: #fff;
      font-size: rem(35);
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
        color: #9d9d9d;
      }
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
    .cancel-head-con {
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
      .cancel-head-right {
        display: flex;
        flex-direction: column;
        width: rem(525);
        .cancel-head-title {
          font-size: rem(30);
          line-height: rem(90);
        }
        .cancel-head-down {
          font-size: rem(30);
          display: flex;
          justify-content: space-between;
          color: #666;
          margin-top: rem(20);
          .cancel-head-down-right {
            .iconfont {
              font-family: "iconfont";
              font-size: rem(30);
              font-style: normal;
              color: #9d9d9d;
            }
          }
        }
      }
    }
    .content-cancel {
      margin: 0 rem(25);
      padding: 0 rem(20);
      background-color: #fff;
      .content-cancel-title {
        font-size: rem(30);
        line-height: rem(88);
        text-align: left;
      }
      .content-cancel-con {
        display: flex;
        border-top: 1px solid #e9e9e9;
        border-bottom: rem(4) dashed #f4f4f4;
        justify-content: space-between;
        align-items: center;
        .content-cancel-con-left {
          display: flex;
          flex-direction: column;
          line-height: rem(48);
          padding: rem(15) rem(35) rem(15) 0;
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
        .content-cancel-con-right {
          border-left: 1px solid #e9e9e9;
          width: rem(120);
          height: rem(70);
          padding: rem(10) rem(30);
          .iconfont {
            font-family: "iconfont";
            font-size: rem(45);
            font-style: normal;
            color: #666;
          }
        }
      }
      .content-cancel-info {
        font-size: rem(30);
        text-align: left;

        .content-cancel-info-title {
          line-height: rem(88);
          border-bottom: 1px solid #e9e9e9;
        }
        .content-cancel-info-con {
          display: flex;
          flex-direction: column;
          color: #666;
          line-height: rem(50);
          padding: rem(20) 0;
        }
      }
    }
  }
}
</style>
