<template>
  <div class="time">距结束 &nbsp; {{hour}}：{{min}}：{{sec}}</div>
</template>
<script>
export default {
  props: {
    endTime: {
      type: String
    }
  },
  data: function() {
    return {
      time: "",
      flag: false,
      hour: "",
      min: "",
      sec: ""
    };
  },
  computed: {
    endTtime: function() {
      return this.endTime.substring(0, 10) + "T" + this.endTime.substring(11);
    }
  },
  methods: {
    timeDown() {
      const endTime = new Date(this.endTtime);
      const nowTime = new Date();
      let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);
      let d = parseInt(leftTime / (24 * 60 * 60));
      let h = this.formate(parseInt((leftTime / (60 * 60)) % 24));
      let m = this.formate(parseInt((leftTime / 60) % 60));
      let s = this.formate(parseInt(leftTime % 60));
      this.hour = h;
      this.min = m;
      this.sec = s;
      if (leftTime <= 0) {
        this.flag = true;
        this.$emit("time-end");
      }
      this.time = `${d}天${h}小时${m}分${s}秒`;
    },
    formate(time) {
      if (time >= 10) {
        return time;
      } else {
        return `0${time}`;
      }
    }
  },
  mounted() {
    let time = setInterval(() => {
      if (this.flag == true) {
        clearInterval(time);
      }
      this.timeDown();
    }, 500);
  }
};
</script>