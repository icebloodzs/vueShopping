export default {
  install(Vue, options){
    Vue.prototype.rem = function (size) {
        return size / 750 * 10 + "rem";
    }
  }
}
