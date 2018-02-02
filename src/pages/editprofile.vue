<template>
  <div class="wrapper">
    <div class="addprofile">
      <div class="addprofile-head">
        <strong>
          <i class="iconfont" @click="routerClickgoback">&#xe600;</i>
        </strong>
        编辑收获地址
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
        <mu-raised-button label="保存" backgroundColor='#1f80eb' @click="saveProfile" :disabled="this.disabled" class="button"/>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  components: {},
  data() {
    return {
      namewarn: "",
      phonewarn: "",
      addresswarn: "",
      name:"",
      phone:"",
      address: "",
      message: [],
      items:[],
      defaultaddress:[],
      disabled: false
    };
  },
  mounted(){
    this.getData()
  },
  methods: {
    routerClickgoback() {
      this.$router.go(-1);
    },
    async getData() {
      let id = this.$route.query.id;
      let fan_id = this.$route.query.fan_id;
      const { data } = await this.api.get("shipping_address_list", {
        fan_id: fan_id
      });
      this.items = data.data;
     for(let i = 0, len = this.items.length; i < len; i++){
        if(this.items[i].id==id){this.defaultaddress=this.items[i]}
     }
    this.name=this.defaultaddress.consignee_name
    this.phone=this.defaultaddress.mobile
    this.address=this.defaultaddress.detail_address
    },
    async editprofile() {
      let fan_id = this.$route.query.fan_id;
      let id = this.$route.query.id;
      let consignee_name = this.name;
      let detail_address = this.address;
      let mobile = this.phone;
      const { data } = await this.api.get("shipping_address_edit", {
        'fan_id': fan_id,
        'consignee_name': consignee_name,
        'detail_address': detail_address,
        'mobile': mobile,
        id: id
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
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      let fan_id = this.$route.query.fan_id;
      if (this.name == "") {
        this.namewarn = "请填写收货人姓名 ~";
      } else if (this.phone == "") {
        this.phonewarn = "请填写联系电话 ~";
      } else if (!reg.test(this.phone)) {
        this.phonewarn = "请正确填写联系电话 ~";
      } else if (this.address == "") {
        this.addresswarn = "不能什么都不填哦 ~";
      } else if (this.address.length > 50) {
        this.addresswarn = "超过啦！！！！";
      } else {
        this.disabled = true;
        this.editprofile();
        setTimeout(() => {
         this.$router.go(-1);
        }, 1000);
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
      display: block;
      width: rem(700);
      height: rem(70);
      font-size: rem(30);
      line-height: rem(70);
      margin: rem(60) auto;
    }
  }
}
</style>