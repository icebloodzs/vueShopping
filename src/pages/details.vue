<template>
<div class="wrapper">
   <app-banner :listImg="listImg"></app-banner>
</div>

</template>
<script>
  import $ from "jquery";
   import Banner from '../components/Banner.vue'
   import a from '../assets/img/banner1.jpg'
    import b from '../assets/img/banner2.jpg'
    import c from '../assets/img/banner3.jpg'
export default {
    components: {
        'app-banner': Banner
    },
  data () {
    return {
      activeTab: 'tab1',
      value:37,
       listImg: [{
                    url: a
                }, {
                    url: b
                }, {
                    url: c
                }]
    }
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../style/mixin';
  @import '../assets/sass/_base.scss';
     .wrapper {
      @include wrapper;
     
     }


</style>
