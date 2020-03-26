<template>
  <div id="myChart" style="width:372px;height:240px;"></div>
</template>
<script>
export default {
  props: {
    barData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      option: {
        color: ["#10d272"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            type: "bar",
            barWidth: "32",
            data: []
          }
        ]
      }
    };
  },
  methods: {
    initData() {
      this.barData.map(item => {
        this.option.xAxis[0].data.push(item.name);
        this.option.series[0].data.push(item.value);
      });
    },
    initEcharts() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      this.initData();
      const option = this.option;
      myChart.setOption(option);
    }
  },
  mounted() {
    setTimeout(() => {
      this.initEcharts();
    }, 400);
  }
};
</script>
