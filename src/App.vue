<template>
  <div id="app">
    <router-view></router-view>   
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: 'app'
}
</script>

<style>
@import "./style/common.scss";
@import "./style/mixin.scss";

#app {
  font-family: 'Microsoft Yahei','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  /*color: #2c3e50;
  margin-top: 60px;*/
}
::-webkit-scrollbar {
    width: 2px;
    height: 2px;
}

::-webkit-scrollbar-track {
    background: transparent;
}                                                                                                                                                                                                                                                                                                                                                                                                                                         

::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,.1);
}
</style>
