<template>
  <div class="wrapper">
    <div class="profile">
      <div class="profile-head">
        <strong>
          <i class="iconfont" @click="routerClickgoback">&#xe600;</i>收获地址</strong>

      </div>
      <div class="profile-con">
        <div class="profile-list">
          <div class="profile-item" v-for="(item,index) in items" :key="item.id" @click="select(item.id)">
            <div class="profile-item-head">
              <span>{{item.consignee_name}}</span>
              <span>{{item.mobile}}</span>
            </div>
            <div class="profile-item-con">
              <span>{{item.detail_address}}</span>
            </div>
            <div class="profile-item-btn">
              <div @click.stop="edit(item.id)" class="edit btn">编辑</div>
              <div class="del btn" @click.stop="open">删除</div>
            </div>
            <mu-dialog :open="dialog" title="提示" @close="close">
              确认删除这个收获地址吗
              <mu-flat-button slot="actions" @click="close" primary label="取消" />
              <mu-flat-button slot="actions" primary @click="del(item.id)" label="确定" />
            </mu-dialog>
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
      message: [],
      dialog: false
    };
  },
  check() {
    if (checked) {
      this.defaultaddress = "qwdwqd";
    }
  },
  methods: {
    routerClickgoback() {
      this.$router.push({
        path: "/dist/mycenter",
        query: { fan_id: 30 }
      });
    },
    add() {
      let id = this.$route.query.id;
      let lng = this.$route.query.lng;
      let lat = this.$route.query.lat;
      let fan_id = this.$route.query.fan_id;
      this.$router.push({
        path: "/dist/addprofile",
        query: { fan_id: 30, id: id, lng: lng, lat: lat }
      });
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
        fan_id: fan_id
      });
      this.items = data.data;
    },
    async del(profile_id) {
      let fan_id = this.$route.query.fan_id;
      let id = profile_id;
      const { data } = await api.get("shipping_address_del", {
        fan_id: fan_id,
        id: id
      });
      this.message = data.message;
      this.dialog = false;
      this.getData();
    },
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    select(addtressId) {
      let fan_id = this.$route.query.fan_id;
      let id = this.$route.query.id;
      let lng = this.$route.query.lng;
      let lat = this.$route.query.lat;
      let gaintype = this.$route.query.gaintype;
      if (id && lng && lat&&gaintype) {
        this.$router.push({
          path: "/dist/submit",
          query: {
            fan_id: 30,
            id: id,
            lng: lng,
            lat: lat,
            addtressid: addtressId,
            gaintype: gaintype
          }
        });
      } else {
        return false;
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
        padding-bottom: rem(100);
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
            z-index: 88;
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
.mu-dialog {
  // height: rem(200);
  padding: rem(30)rem(20) !important;
  .mu-dialog-title {
    font-size: rem(35);
  }
  .mu-dialog-body {
    font-size: rem(30);
    margin: rem(15) 0;
  }
  .mu-dialog-actions {
    .mu-flat-button-label {
      font-size: rem(30);
    }
  }
  .mu-flat-button {
    overflow: visible;
  }
}
</style>


