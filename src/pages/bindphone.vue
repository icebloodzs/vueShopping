<template>
<div class="wrapper">
  <div class="bind">
        <div class="bind-head">
            <strong><i class="iconfont" @click="routerClickgoback">&#xe600;</i></strong>
            绑定手机号
        </div>
        <div class="bind-con">
            <label>手机号</label><mu-text-field hintText="填写手机号" v-model="phone" /><br/>
            <label>验证码</label><mu-text-field hintText="请输入短信验证码" v-model="code" /><br/>  
            <div :disabled="disabled" @click="sendCode" class="btns">{{btntxt}}</div>
        </div>
        <div class="container">
            <div @click="saveCode" class="button">
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
        disabled:false,
        time:0,
        btntxt:"获取验证码",
        phone:"",
        code:""

    }
  },
  methods: {
    routerClickgoback(){
       this.$router.go(-1);
    },
    //验证手机号码部分
    sendCode(){
        var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        //var url="/nptOfficialWebsite/apply/sendSms?mobile="+this.ruleForm.phone;
        if(this.phone==''){
            alert("请输入手机号码");
        }else if(!reg.test(this.phone)){
            alert("手机格式不正确");
        }else{
            this.time=60;
            this.disabled=true;
            this.timer();
            /*axios.post(url).then(
                res=>{
                this.phonedata=res.data;
            })*/
        }
    },
    timer() {
        if (this.time > 0) {
                this.time--;
                this.btntxt=this.time+"s后重新获取";
                setTimeout(this.timer, 1000);
        } else{
                this.time=0;
                this.btntxt="获取验证码";
                this.disabled=false;
        }
    },saveCode(){
        if(this.code==''){
            alert("请输入验证码");
        }
        else{
          this.$router.push("/dist/submit");
        }
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
      background-color: #f4f4f4;
      .bind{
          .bind-head{
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
          .bind-con{
              position: relative;
            .btns{
                position: absolute;
                font-size: rem(25);
                color: #1f80eb;
                border: 1px solid  #1f80eb;
                width: rem(170);
                text-align: center;
                line-height: rem(52);
                height: rem(52);
                right: rem(38);
                bottom: rem(36);
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
  .bind-con{
        background-color: #fff;
        margin-top:rem(20);
        label{
            position: absolute;
            // margin-top:rem(38);
            font-size:rem(30);
            line-height: rem(105);
            height: rem(105);
            margin-left:rem(50);
        }
        .mu-text-field{
            width: 100%;
            height:rem(105);
            .mu-text-field-content{
                width:rem(750);
                font-size:rem(30);
                padding-left:rem(242);
                padding-top:rem(50);
                .mu-text-field-input{
                    height: rem(105);
                    margin-top: rem(-50);
                    font-size:rem(36);
                }
            }
            .mu-text-field-line{
                width:100%;
                margin-left:rem(45);
                  margin-top:rem(6);
            }
            .mu-text-field-focus-line{
                width:100%;
                margin-left:rem(45);
                margin-top:rem(6);
                &.focus{
                    width:100%;
                }
            }
            .mu-text-field-hint{
             
                height: rem(100);
                line-height:rem(100);
                margin-top:rem(-50);
            }
            .mu-text-field-help{
                margin-left:1.27rem;
                font-size:rem(30);
                width:100%;
            }
            .mu-text-field-label{
                width:100%;
                color:#000;
                font-size:rem(40);
                color: #1f80eb;
                &.float{
                    font-size:rem(30);
                    color:#000;
                }
            }
        }
    }
   
</style>
