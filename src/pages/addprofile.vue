<template>
  <div class="wrapper">
    <div class="addprofile">
      <div class="addprofile-head">
        <strong>
          <i class="iconfont" @click="routerClickgoback">&#xe600;</i>
        </strong>
        添加收获地址
      </div>
      <div class="addprofile-con">
        <label>收货人</label>
        <mu-text-field :errorText="namewarn" v-model="name" @input="input" /><br/>
        <label>联系电话</label>
        <mu-text-field :errorText="phonewarn" v-model="phone" @input="input" /><br/>
        <label>详细地址</label>
        <mu-text-field class="address" v-model="address" multiLine :rows="3" :rowsMax="6" :errorText="addresswarn" @input="input" :maxLength="50" />
      </div>
      <div class="container">
        <!-- <router-link :to="{path:'/dist/details',query:{id:item.id,lng:116.30387397,lat:39.91481908}}" tag="div" class="button">保存</router-link> -->
        <div @click="saveProfile" class="button">
          保存
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {api} from 'h5sdk'
export default {
  components: {},
  data() {
    return {
      namewarn: "",
      phonewarn: "",
      addresswarn: "",
      name: "",
      phone: "",
      address: "",
      message: []
    };
  },
  methods: {
    routerClickgoback() {
      this.$router.go(-1);
    },
    async addprofile() {
      let fan_id = this.$route.query.fan_id;
      let consignee_name = this.name;
      let detail_address = this.address;
      let mobile = this.phone;
      const { data } = await api.get("shipping_address_add", {
        fan_id: fan_id,
        consignee_name: consignee_name,
        detail_address: detail_address,
        mobile: mobile
      });
      this.message = data.message;
    },
    input() {
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (!this.name == "") {
        this.namewarn = "";
      }
      if (!this.address == "") {
        this.addresswarn = "";
      }
      if (!this.phone == "") {
        this.phonewarn = "";
      }
      if (this.address.length > 50) {
        this.addresswarn = "超过啦！！！！";
      }
    },
    saveProfile() {
      let that = this;
      let fan_id = this.$route.query.fan_id;
      let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      let mobile = this.$route.query.fan_id;
      let action = this.$route.query.action;
      if (this.name == "") {
        this.namewarn = "请填写收货人姓名 ~";
      } else if (this.phone == "") {
        this.phonewarn = "请填写联系电话 ~";
      } else if (!reg.test(this.phone)) {
        this.phonewarn = "请正确填写联系电话 ~";
      } else if (this.address == "") {
        this.addresswarn = "不能一个字都不输入哦 ~";
      } else if (this.address.length > 50) {
        this.addresswarn = "超过啦！！！！";
      } else {
        this.addprofile();
        let fan_id = this.$route.query.fan_id;
        let id = this.$route.query.id;
        let lng = this.$route.query.lng;
        let lat = this.$route.query.lat;
        let gaintype = this.$route.query.gaintype;
        if (!id&&lng&&lat) {
          setTimeout(() => {
            that.$router.push({
              path: "/dist/profile",
              query: { fan_id: fan_id }
            });
          }, 1000);
        }
        if (id&&lng&&lat&&gaintype) {
           setTimeout(() => {
          that.$router.push({
            path: "/dist/profile",
            query: { fan_id: 30, id: id, lng: lng, lat: lat, gaintype :gaintype  }
          });
            }, 1000);
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
  .addprofile {
    .addprofile-head {
      height: rem(90);
      background-color: #fff;
      font-size: rem(30);
      line-height: rem(90);
      text-align: center;
      .iconfont {
        font-family: "iconfont";
        font-size: rem(35);
        font-style: normal;
        position: absolute;
        width: rem(120);
        left: 0;
        color: #666;
      }
    }
    .button {
      width: rem(700);
      height: rem(70);
      background-color: #1f80eb;
      font-size: rem(30);
      text-align: center;
      color: #fff;
      line-height: rem(70);
      margin: rem(60) auto;
      border-radius: rem(5);
    }
  }
}
</style>
<style lang="scss">
@import "../style/mixin";
.addprofile-con {
  background-color: #fff;
  margin-top: rem(20);
  padding-bottom: rem(20);
  label {
    position: absolute;
    font-size: rem(30);
    line-height: rem(105);
    height: rem(105);
    margin-left: rem(50);
  }
  .mu-text-field {
    width: 100%;
    margin: 0;
    .has-label {
      // margin-top:rem(30);
    }
    .mu-text-field-content {
      font-size: rem(30);
      padding-left: 1.27rem;
      height: 100%;
      margin: 0;
      padding-top: rem(50);
      .mu-text-field-input {
        width: rem(300);
        height: rem(90);
        margin-top: rem(-45);
        font-size: rem(32);
        color: #666;
        margin-left: rem(150);
      }
      .mu-text-field-help {
        margin-top: rem(-20);
        margin-left: rem(200);
        font-size: rem(28);
        width: rem(500);
        line-height: 1.1;
        display: flex;
        justify-content: space-between;
        div:nth-child(1) {
          margin-left: rem(200);
        }
      }
    }

    .mu-text-field-line {
      width: 100%;
      margin-left: rem(45);
      margin-top: rem(10);
    }
    .mu-text-field-focus-line {
      display: none;
    }
    &.address {
      .mu-text-field-textarea {
        width: rem(500);
        padding-top: rem(30);
      }
      .mu-text-field-line {
        display: none;
      }
    }
  }
}
</style>
