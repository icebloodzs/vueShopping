<template>
<div class="wrapper">
  <div class="website">
      <div class="website-head">
          <strong><i class="iconfont" @click="routerClickgoback">&#xe600;</i></strong>
          领取网点
      </div>
      <div class="website-con">
           <div class="content-website">
               
                <div class="content-website-con">
                    <div class="content-website-con-left">
                        <span>涵斧宫自助餐厅（正大乐城店）</span>
                        <span>管城回族区心怡路与东站交叉口正大乐城2楼</span>
                        <span> <i class="iconfont">&#xe715;</i>4.8km</span>
                    </div>
                    <div class="content-website-con-right">
                    <i class="iconfont">&#xe8bd;</i>
                    </div>
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
     
    }
  },
  methods: {
    routerClickgoback(){
       this.$router.go(-1);
    },
  }
}
</script>
<style lang="scss" scoped>
  @import '../style/mixin';
  @import '../assets/sass/_base.scss';
    .wrapper {
    @include wrapper;
      .website{
          .website-head{
              padding-left: rem(50);
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
           .content-website{
                margin-top: rem(20);
                padding-left :  rem(30) ;
                background-color: #fff;
                
                .content-website-con{
                    display: flex;
                    border-top: 1px solid  #e9e9e9;
                    border-bottom: 1px solid  #e9e9e9;
                    justify-content: space-between;
                    align-items: center;
                    .content-website-con-left{
                    display: flex;
                    flex-direction: column;
                    line-height: rem(48);
                    span:nth-child(1){
                        font-size: rem(27);
                    }
                    span:nth-child(2){
                        font-size: rem(25);
                        color: #666666;
                    }
               span:nth-child(3){
                  font-size: rem(22);
                  color: #999999;
                  .iconfont{
                     font-family:"iconfont"; font-size:rem(30); font-style:normal;
                  }
              }
            }
            .content-website-con-right{
              border-left:  1px solid  #e9e9e9;
              width: rem(120);
              height: rem(70);
              padding: rem(10) rem(30);
              .iconfont{
                font-family:"iconfont"; font-size:rem(40); font-style:normal;
               }
            }
          }
         
        }
      }
    }


</style>
