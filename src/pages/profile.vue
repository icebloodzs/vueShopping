<template>
<div class="wrapper">
  <div class="profile">
    <div class="profile-head">
        <strong><i class="iconfont" @click="routerClickgoback">&#xe600;</i></strong>
    收获地址
    </div>
    <div class="profile-con">
         <div class="profile-list">
             <div class="profile-item">
                 <div class="profile-item-head">
                     <span>张中原</span><span>17638167198</span>
                 </div>
                 <div class="profile-item-con">
                     <span>河南省郑州市管族回族区心怡路与东站北街交叉口正大乐城2楼410房间进门右拐嘟嘟科技</span>
                 </div>
                 <div class="profile-item-btn">
                     <div  @click="edit" class="edit btn">编辑</div>
                     <div class="del btn">删除</div>
                 </div>
             </div>
         </div>
    </div>
    <div class="add-profile">
             添加新地址
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
     edit(){
       this.$router.push("/dist/addprofile");
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
      .profile{
          .profile-head{
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
          .profile-con{
            .profile-list{
                .profile-item{
                    display: flex;
                    flex-direction: column;
                    background-color: #fff;
                    margin-top: rem(20);
                    padding-right:   rem(26)  ;
                    border-bottom: 1px solid #e5e5e5;
                    padding-left: rem(48);
                    .profile-item-head{
                        display: flex;
                        justify-content: space-between;
                        font-size: rem(30);
                        line-height:rem(66);
                    }
                    .profile-item-con{
                        font-size: rem(24);
                        line-height:rem(40);
                    }
                    .profile-item-btn{
                        display: flex;
                        justify-content: space-between;
                        height: rem(86);
                        font-size: rem(25);
                        align-items: center;
                        padding-left: rem(474);
                            .btn{
                                width: rem(72);
                                height: rem(46);
                                line-height:rem(46);
                                border: 1px solid #000;
                                text-align: center;
                            }
                    }
                }
            }
          } 
          .add-profile{
              position: fixed;
              width: 100%;
              line-height: rem(90);
              background-color: rgb(202, 38, 38);
              bottom:0;
                text-align: center;
                color: #fff;
          }  
      }
    }

</style>

