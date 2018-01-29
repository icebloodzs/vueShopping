<template>
  <div class="wrapper">
    <div class="website">
      <div class="website-head">
        <strong>
          <i class="iconfont" @click="routerClickgoback">&#xe600;</i>
        </strong>
        领取网点
      </div>
      <div class="website-con">
        <div class="content-website">

          <div class="content-website-con" v-for="item in items">
            <div class="content-website-con-left">
              <span>{{item.name}}</span>
              <span>{{item.detailed_address}}</span>
              <span>
                <i class="iconfont">&#xe715;</i>{{item.distance}}km</span>
            </div>
            <a class="content-website-con-right" :href='`tel:${item.telephone}`'>
              <i class="iconfont">&#xe676;</i>
            </a>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  components: {},
  created() {
    this.getData();
  },
  data() {
    return {
      items: [],
      lng: [],
      lat: []
    };
  },
  methods: {
    routerClickgoback() {
      this.$router.go(-1);
    },
    async getData() {
      let goods_id = this.$route.query.id;
      let _data = await this.wx.getLocation();
      this.lng = _data.longitude;
      this.lat = _data.latitude;
      const { data } = await this.api.get("goods_detail", {
        goods_id: goods_id,
        lng: this.lng,
        lat: this.lat
      });
      this.items = data.site;
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
  .website {
    .website-head {
      padding-left: rem(50);
      height: rem(90);
      background-color: #fff;
      font-size: rem(30);
      line-height: rem(90);
      text-align: center;
      .iconfont {
        font-family: "iconfont";
        font-size: rem(30);
        font-style: normal;
        position: absolute;
        width: rem(120);
        left: 0;
      }
    }
    .content-website {
      margin-top: rem(20);
      padding-left: rem(30);
      background-color: #fff;

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
    }
  }
}
</style>
