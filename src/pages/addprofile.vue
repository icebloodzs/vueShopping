<template>
<div class="wrapper">
  <div class="addprofile">
      <div class="addprofile-head">
          <strong><i class="iconfont" @click="routerClickgoback">&#xe600;</i></strong>
         添加收获地址
      </div>
      <div class="addprofile-con">
        <mu-text-field  :errorText = "namewarn" v-model="name" @input="input" label="收货人" labelFloat/><br/>
        <mu-text-field :errorText = "phonewarn" v-model="phone" @input="input" label="联系电话" labelFloat /><br/>  
        <mu-text-field v-model="address" multiLine :rows="3" :rowsMax="6"  label="详细地址"  :errorText="addresswarn" @input="input" @textOverflow="handleInputOverflow" :maxLength="50" labelFloat/> 
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
   
export default {
    components: {
        
    },
  data () {
    return {
        namewarn:"",
        phonewarn:"",
        addresswarn:"",
        name:"",
        phone:"",
        address:"",
        inputErrorText: '',
        }
  },
  methods: {
    routerClickgoback(){
       this.$router.go(-1);
    },
    input(){
         var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
         if(!this.name==''){
          this.namewarn = ""
        }
         if(!this.phone==''&&reg.test(this.phone)){
          this.phonewarn = ""
        }
          if(!this.address==''){
          this.addresswarn = ""
        }
    },
    saveProfile(){
        var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      
        if(this.name==''){
           this.namewarn = "请填写收货人姓名 ~"
        } 
         if(this.address==''){
          this.addresswarn = "不能一个字都不输入哦 ~"
        }
        if(this.phone==''){
          this.phonewarn = "请填写联系电话 ~"
        }else if(!reg.test(this.phone)){
          this.phonewarn = "请正确填写联系电话 ~"
        }else{
             this.$router.push("/dist/profile");
        }
        
       
    },
     handleInputOverflow (isOverflow) {
         if(!this.address==''){
            this.addresswarn = ""
         }
      this.addresswarn = isOverflow ? '超过啦！！！！' : ''
    }

  }
}
</script>
<style lang="scss" scoped>
  @import '../style/mixin';
  @import '../assets/sass/_base.scss';
    .wrapper {
    @include wrapper;
    height: 100vh; 
      .addprofile{
          .addprofile-head{
              height: rem(90);
              background-color: #fff;
              font-size: rem(30);
              line-height: rem(90);
              text-align: center;
              .iconfont{
                   font-family:"iconfont"; font-size:rem(30); font-style:normal;
                    position: absolute;
                    width: rem(120);
                    left:0;
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
                
            }
      }
    }

</style>
<style lang="scss">
  @import '../style/mixin';
  .addprofile-con{
        background-color: #fff;
        margin-top:rem(20);
    padding-bottom:rem(20);
    .has-label{
        margin-top:rem(30);
         
    }
    .mu-text-field-content{
        width:rem(750);
        font-size:rem(30);
        padding-left:1.27rem;
         padding-top:rem(50);
         margin:rem(20) 0;
         .mu-text-field-input{
             height: rem(60);
             width:rem(450);
            //    position: relative;
         }
    }
    .mu-text-field-line{
        width:rem(450);
        margin-left:1.27rem;
    }
    .mu-text-field-help{
        margin-top:rem(20);
        margin-left:0.6rem;
        font-size:rem(30);
        width:rem(500);
        display: flex;
      justify-content: space-between;
        div:nth-child(1){
         margin-left:rem(45);
        }
    }
    .mu-text-field-focus-line{
          width:rem(450);
        margin-left:1.27rem;
    }
    
    .mu-text-field-label{
        width:rem(300);
        color:#000;
        font-size:rem(40);
        color: #1f80eb;
        &.float{
        font-size:rem(30);
        color:#000;
        }
    }
     .focus-state{
            .mu-text-field-label{
                width:rem(300);
            }
            .mu-text-field-help{

            }
        }
    .multi-line{
        
    }
       
   
    }
   
</style>
