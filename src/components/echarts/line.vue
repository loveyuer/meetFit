<template>
  <div id="lineChart" style="width:900px;height:265px;"></div>
</template>
<script>
export default {
  props: ["lineData"],
  data() {
    return {
      option: {
        color: ["#10d272", "#12a5e9"],
        title: {
          text: "周业绩对比图"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["上周业绩", "本周业绩"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "上周业绩",
            type: "line",
            data: [],
            smooth: true
          },
          {
            name: "本周业绩",
            type: "line",
            data: [],
            smooth: true
          }
        ]
      }
    };
  },
  methods: {
    initData() {
      this.lineData.map(item => {
        if (item.name === "上周业绩") {
          this.option.series[0].data = item.value;
        } else {
          this.option.series[1].data = item.value;
        }
      });
    },
    initEcharts() {
      let myChart = this.$echarts.init(document.getElementById("lineChart"));
      const option = this.option;
      myChart.setOption(option);
    }
  },
  created() {
    this.initData();
  },
  mounted() {
    this.initEcharts();
  }
};
</script>
