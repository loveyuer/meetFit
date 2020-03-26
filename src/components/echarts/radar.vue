<template>
  <div id="radarChart" style="width:636px;height:560px;"></div>
</template>
<script>
export default {
  props: ["radarData"],
  data() {
    return {
      option: {
        title: {
          text: "课程消耗分布统计",
          subtextStyle: {
            fontSize: "16px",
            color: "#ccc"
          },
          left: "center"
        },
        radar: {
          name: {
            textStyle: {
              color: "#666699",
              fontSize: "16px"
            }
          },
          indicator: []
        },
        series: [
          {
            name: "课程消耗分布统计",
            type: "radar",
            data: [
              {
                value: [],
                areaStyle: {
                  normal: {
                    color: "rgba(204, 255, 255, 0.5)"
                  }
                },
                lineStyle: {
                  normal: {
                    color: "#ccffff"
                  }
                }
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    initData() {
      if (this.radarData.length) {
        this.radarData.map(item => {
          this.option.radar.indicator.push({
            text: item.name,
            max: 7
          });
          this.option.series[0].data[0].value.push(item.value);
        });
      }
    },
    initEcharts() {
      this.initData();
      let myChart = this.$echarts.init(document.getElementById("radarChart"));
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
