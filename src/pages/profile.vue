<template>
    <div class="wrapper">
        <div class="profile">
            <div class="profile-head">
                <strong>
                    <i class="iconfont" @click="routerClickgoback">&#xe600;</i>收获地址</strong>

            </div>
            <div class="profile-con">
                <div class="profile-list">
                    <div class="profile-item" v-for="(item,index) in items" :key="item.id">
                        <div class="profile-item-head">
                            <span>{{item.consignee_name}}</span>
                            <span>{{item.mobile}}</span>
                        </div>
                        <div class="profile-item-con">
                            <span>{{item.detail_address}}</span>
                        </div>
                        <div class="radio" @click="defaultAdtress(item.id)">
                            <label class="demo--label">
                                <input class="demo--radio" type="radio" name="demo-checkbox2" value="设为默认">
                                <span class="demo--checkbox demo--radioInput"></span>设为默认
                            </label>
                        </div>
                        <div class="profile-item-btn">
                            <div @click="edit(item.id)" class="edit btn">编辑</div>
                            <div class="del btn" @click="del(item.id)">删除</div>
                        </div>
                    </div>
                </div>
            </div>
            <div @click="add" class="add-profile">
                添加新地址
            </div>
        </div>
    </div>

</template>
<script>
import api from "@/api";
export default {
  components: {},
  created() {
    this.getData();
  },
  data() {
    return {
      disabled: false,
      time: 0,
      btntxt: "获取验证码",
      phone: "",
      code: "",
      checked: "",
      defaultaddress: "",
      items: [],
      message: []
    };
  },
  check() {
    if (checked) {
      this.defaultaddress = "qwdwqd";
    }
  },
  methods: {
    routerClickgoback() {
      this.$router.go(-1);
    },
    add() {
      let fan_id = this.$route.query.fan_id;
      this.$router.push({ path: "/dist/addprofile", query: { fan_id: 30 } });
    },
    edit(profile_id) {
      let id = profile_id;
      this.$router.push({
        path: "/dist/editprofile",
        query: { fan_id: 30, id: id }
      });
    },
    async getData() {
      let fan_id = this.$route.query.fan_id;
      const { data } = await api.get("shipping_address_list", {
        'fan_id': fan_id
      });
      this.items = data.data;
    },
    async defaultAdtress(profile_id) {
      let fan_id = this.$route.query.fan_id;
      let id = profile_id;
      const { data } = await api.get("shipping_address_default", {
        'fan_id': fan_id,
        'id': id
      });
      this.message = data.message;
    },
    async del(profile_id) {
      let fan_id = this.$route.query.fan_id;
      let id = profile_id;
      const { data } = await api.get("shipping_address_del", {
        'fan_id': fan_id,
        'id': id
      });
      this.message = data.message;
      this.getData();
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
  .profile {
    .profile-head {
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
        color: #d4d4d4;
      }
    }
    .profile-con {
      .profile-list {
        .profile-item {
          display: flex;
          position: relative;
          flex-direction: column;
          background-color: #fff;
          margin-top: rem(20);
          padding-right: rem(26);
          border-bottom: 1px solid #e5e5e5;
          padding-left: rem(48);
          position: relative;
          .profile-item-head {
            display: flex;
            justify-content: space-between;
            font-size: rem(30);
            line-height: rem(66);
          }
          .radio {
            position: absolute;
            top: rem(110);
            font-size: rem(30);
            .demo--label {
              margin: rem(20) rem(20) 0 0;
              display: inline-block;
            }
            .demo--radio {
              display: none;
            }
            .demo--radioInput {
              background-color: #fff;
              border: 1px solid rgba(0, 0, 0, 0.5);
              border-radius: 100%;
              display: inline-block;
              height: rem(30);
              margin-right: rem(10);
              margin-top: -1px;
              vertical-align: middle;
              width: rem(30);
              line-height: 1;
            }
            .demo--radio:checked + .demo--radioInput:after {
              background-color: #57ad68;
              border-radius: 100%;
              content: "";
              display: inline-block;
              height: rem(20);
              margin: rem(5);
              width: rem(20);
            }
            .demo--checkbox.demo--radioInput,
            .demo--radio:checked + .demo--checkbox.demo--radioInput:after {
              border-radius: 0;
            }
          }
          .profile-item-con {
            font-size: rem(24);
            line-height: rem(40);
          }

          .profile-item-btn {
            display: flex;
            justify-content: space-between;
            height: rem(86);
            font-size: rem(25);
            align-items: center;
            padding-left: rem(474);
            .btn {
              width: rem(72);
              height: rem(46);
              line-height: rem(46);
              border: rem(1) solid #000;
              text-align: center;
              border-radius: rem(5);
            }
          }
        }
      }
    }
    .add-profile {
      position: fixed;
      width: 100%;
      line-height: rem(90);
      background-color: rgb(202, 38, 38);
      bottom: 0;
      text-align: center;
      color: #fff;
    }
  }
}
</style>
<style lang="scss" >
@import "../style/mixin";
</style>


