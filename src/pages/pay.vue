<template>
    <div class="wrapper">
        <div class="pay">
            <div class="pay-head">
                <strong>
                    <i class="iconfont" @click="routerClickgoback">&#xe600;</i>
                </strong>
                订单详情
            </div>
            <div class="pay-head-con" @click="routerClickdetails">
                <img src="../assets/img/dwqvas_02.jpg" alt="">
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
            <div class="pay-button" @click="routerClicksubmit">立即付款</div>
            <div class="pay-con">
                <div class="content-pay">
                    <div v-if="type === 'store'" class="content-store">
                        <div class="content-pay-title">
                            <strong>适用门店</strong>
                        </div>
                        <div class="content-pay-con">
                            <div class="content-pay-con-left">
                                <span>涵斧宫自助餐厅（正大乐城店）</span>
                                <span>管城回族区心怡路与东站交叉口正大乐城2楼</span>
                                <span>
                                    <i class="iconfont">&#xe715;</i>4.8km</span>
                            </div>
                            <div class="content-pay-con-right">
                                <i class="iconfont">&#xe676;</i>
                            </div>
                        </div>
                    </div>
                    <div v-if="type === 'gain'" class="gain-info">
                        <span>收货人：&nbsp;孙富贵 &nbsp; 13345668899</span>
                        <span>地&nbsp;&nbsp;&nbsp;址：&nbsp;北京市劲舞路花园路男300米路东...</span>
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
import api from "@/api";
export default {
  components: {},
  data() {
    return {
      type: "",
      items: []
    };
  },
  mounted() {
    this.getPayData();
  },
  methods: {
    routerClickgoback() {
      this.$router.go(-1);
    },
    routerClicksubmit() {
      this.$router.push("/dist/submit");
    },
    routerClickdetails() {
      this.$router.push("/dist/details");
    },
    async getPayData() {
      let order_id = this.$route.query.order_id;
      let extract_type = this.$route.query.extract_type;
      if (extract_type == 1) {
        this.type = "gain";
      } else if (extract_type == 2) {
        this.type = "store";
      }
      const { data } = await api.get("order_detail", {
        order_id: order_id
      });
      this.items = data.data;
      console.log(this.items);
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
    .pay-head-con {
      display: flex;
      flex-direction: row;
      padding-right: rem(27);
      height: rem(180);
      background-color: #fff;
      img {
        width: rem(225);
        height: rem(180);
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
      margin: 0 rem(25);
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
        height: rem(170);
        .content-pay-con-left {
          display: flex;
          flex-direction: column;
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
        .content-pay-con-right {
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
