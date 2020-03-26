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
          text: "月业绩对比图"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["业绩", "消课金额"]
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
          data: []
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "业绩",
            type: "line",
            data: [],
            smooth: true
          },
          {
            name: "消课金额",
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
      const every_month_money = [];
      const every_month_money_over = [];
      for (const item of Object.keys(this.lineData.every_month_money)) {
        this.option.xAxis.data.push(`${item}月`);
        every_month_money.push(this.lineData.every_month_money[item]);
      }
      for (const item of Object.keys(this.lineData.every_month_money_over)) {
        every_month_money_over.push(this.lineData.every_month_money_over[item]);
      }
      this.option.series[0].data = every_month_money;
      this.option.series[1].data = every_month_money_over;
    },
    initEcharts() {
      this.initData();
      let myChart = this.$echarts.init(document.getElementById("lineChart"));
      const option = this.option;
      myChart.setOption(option);
    }
  },
  mounted() {
    setTimeout(() => {
      this.initEcharts();
    }, 500);
  }
};
</script>
