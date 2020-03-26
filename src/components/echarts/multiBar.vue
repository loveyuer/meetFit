<template>
  <div id="multiBarChart" style="width:900px;height:265px;"></div>
</template>
<script>
export default {
  props: ["multiBarData"],
  data() {
    return {
      option: {
        color: ["#10d272", "#12a5e9"],
        title: {
          text: "教练销售统计"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["本周销售金额", "本周消课金额"]
        },
        xAxis: {
          type: "value"
        },
        yAxis: {
          type: "category",
          inverse: true,
          data: []
        },
        series: [
          {
            name: "本周销售金额",
            type: "bar",
            data: []
          },
          {
            name: "本周消课金额",
            type: "bar",
            data: []
          }
        ]
      }
    };
  },
  methods: {
    initData() {
      this.multiBarData.map(item => {
        if (item.key === "本周销售金额") {
          item.value.map(v => {
            this.option.series[0].data.push(v.data);
          });
        } else {
          item.value.map(v => {
            this.option.series[1].data.push(v.data);
          });
        }
      });
      this.multiBarData[0].value.map(item => {
        this.option.yAxis.data.push(item.name);
      });
    },
    initEcharts() {
      this.initData();
      let myChart = this.$echarts.init(
        document.getElementById("multiBarChart")
      );
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
