<template>
<div class="wrapper">
  <div class="addprofile">
      <div class="addprofile-head">
        <strong><i class="iconfont" @click="routerClickgoback">&#xe600;</i></strong>
         编辑收获地址
      </div>
      <div class="addprofile-con">
         <label>收货人</label><mu-text-field  :errorText = "namewarn" v-model="name" @input="input" /><br/>
         <label>联系电话</label><mu-text-field :errorText = "phonewarn" v-model="phone" @input="input"  /><br/>  
         <label>详细地址</label><mu-text-field class="address" v-model="address" multiLine :rows="3" :rowsMax="6" :errorText="addresswarn" @input="input" :maxLength="50" /> 
     </div>
     <div class="container">
       <div @click="saveProfile" class="button">
           保存
       </div>
    </div>
      </div>
  </div>
</div>

</template>
<script>
import $ from "jquery";
import axios from "axios"
export default {
    components: {
        
    },
  data () {
    return {
        namewarn:"",
        phonewarn:"",
        addresswarn:"",
        name:"张中原",
        phone:"17638167198",
        address:"",
        basePath:"http://dev.mp.duduapp.net",
        has_id:"1wxAvPWzQro2G4RXkBrd",
        }
  },
  methods: {
    routerClickgoback(){
       this.$router.go(-1);
    },editprofile(){
        let that = this
        let fan_id =this.$route.query.fan_id
        let id = this.$route.query.id
        let consignee_name = this.name  
        let detail_address = this.address  
        let mobile = this.phone
        let url=`${this.basePath}/h5/${this.has_id}?action=shipping_address_edit&fan_id=${fan_id}&id=${id}&consignee_name=${consignee_name}&detail_address=${detail_address}&mobile=${mobile}`
        axios.get(url,{
            headers: {'Token': 'elo4aEFQdDVMMGZwMFJVb3pub1Rqd1piSklGclY4ZjBjNSthOXNUd1VORT0.'},
        }).then(function(response) {
        that.item = response.data
        console.log(that.item.message)
        })
    },
    input(){
         var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
         if(!this.name==''){
          this.namewarn = ""
        }
         if(!this.address==''){
          this.addresswarn = ""
        }
         if(!this.phone==''){
          this.phonewarn = ""
        }
        if(this.address.length > 50){
          this.addresswarn = "超过啦！！！！"
        }
    },
    saveProfile(){
        let that = this
        var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        let fan_id =this.$route.query.fan_id
        if(this.name==''){
           this.namewarn = "请填写收货人姓名 ~"
        }else if(this.phone==''){
          this.phonewarn = "请填写联系电话 ~"
        }else if(!reg.test(this.phone)){
          this.phonewarn = "请正确填写联系电话 ~"
        }else if(this.address==''){
            this.addresswarn = "不能一个字都不输入哦 ~"
        }else if(this.address.length > 50){
          this.addresswarn = "超过啦！！！！"
        }else{
            this.editprofile()
            setTimeout(()=>{
              that.$router.push({path:"/dist/profile",query:{fan_id:fan_id}})
            },1000)
        }
    },
  }
}
</script>
<style lang="scss" scoped>
  @import '../style/mixin';
  @import '../assets/sass/_base.scss';
    .wrapper {
    @include wrapper;
    height: 100vh;
    background-color: #f4f4f4; 
      .addprofile{
          .addprofile-head{
              height: rem(90);
              background-color: #fff;
              font-size: rem(30);
              line-height: rem(90);
              text-align: center;
              .iconfont{
                font-family:"iconfont"; 
                font-size:rem(35); 
                font-style:normal;
                position: absolute;
                width: rem(120);
                left:0;
                color:#666;
              }
          }
            .button{
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