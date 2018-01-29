// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css' // 使用 carbon 主题
import * as filters from './utils/filter' //import * as obj from "xxx" 会将 "xxx" 中所有 export 导出的内容组合成一个对象返回
import './config/flexible'
import util from './config/util'
import {api} from 'h5sdk'
import {wx} from 'h5sdk'

wx.setConfig(Window.AppConfig.wxJsConfig);

Vue.prototype.api= api;
Vue.prototype.wx= wx;

Vue.use(util);
Vue.use(MuseUI)
// Vue.config.productionTip = false

Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) //注册过滤器
Vue.filter("currency", function(value) {   //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
  return Number(value).toFixed(2);
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
