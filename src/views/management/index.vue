<template>
  <div class="index-container">
    <p class="menu-tt">首页</p>
    <p class="page-tt">管理详情概括</p>
    <div class="row">
      <div class="item-container">
        <bar-chart :barData="barData"></bar-chart>
      </div>
      <div class="item-container">
        <card-item :cardData="memberCount"></card-item>
      </div>
      <div class="item-container">
        <card-item :cardData="stayCount"></card-item>
      </div>
      <div class="item-container">
        <today-item :todayData="todayData"></today-item>
      </div>
    </div>
    <div class="row">
      <div>
        <div class="item-container">
          <line-chart :lineData="lineData"></line-chart>
        </div>
        <div class="item-container">
          <multi-bar :multiBarData="multiBarData"></multi-bar>
        </div>
      </div>
      <div class="item-container">
        <radar-chart :radarData="radarData"></radar-chart>
      </div>
    </div>
  </div>
</template>
<script>
import BarChart from "../../components/echarts/bar";
import CardItem from "../../components/card";
import TodayItem from "../../components/today";
import LineChart from "../../components/echarts/line";
import MultiBar from "../../components/echarts/multiBar";
import RadarChart from "../../components/echarts/radar";

export default {
  components: {
    BarChart,
    CardItem,
    TodayItem,
    LineChart,
    RadarChart,
    MultiBar
  },
  data() {
    return {
      // 柱状图数据
      barData: [
        {
          name: "今日销售",
          value: 2.1
        },
        {
          name: "昨日销售",
          value: 3.8
        },
        {
          name: "本月累计",
          value: 4.5
        },
        {
          name: "上月累计",
          value: 3.4
        }
      ],
      // 会员总量
      memberCount: {
        num: "15223人",
        text: "会员总量",
        data: {
          today: "+7999",
          month: "+5009"
        },
        color: "#10d272"
      },
      // 会员余额汇总
      stayCount: {
        num: "3029400.00元",
        text: "会员余额汇总",
        data: {
          today: "+15.3万",
          month: "+25.8万"
        },
        color: "#12a5e9"
      },
      // 今日数据
      todayData: {
        appointment: 88,
        cancle: 22,
        surplus: 4
      },
      // 折线图数据
      lineData: [
        {
          name: "上周业绩",
          value: [0, 4, 15, 11, 3, 5, 9]
        },
        {
          name: "本周业绩",
          value: [0, 2, 13, 7, 10, 3, 11]
        }
      ],
      // 双柱状图数据
      multiBarData: [
        {
          key: "上周业绩",
          value: [
            {
              name: "徐玲玲",
              data: 2
            },
            {
              name: "李冰",
              data: 7
            },
            {
              name: "孙芳芳",
              data: 2
            },
            {
              name: "吴晓东",
              data: 9
            },
            {
              name: "林强",
              data: 6
            },
            {
              name: "王楠",
              data: 3
            }
          ]
        },
        {
          key: "本周业绩",
          value: [
            {
              name: "徐玲玲",
              data: 5
            },
            {
              name: "李冰",
              data: 6
            },
            {
              name: "孙芳芳",
              data: 2
            },
            {
              name: "吴晓东",
              data: 4
            },
            {
              name: "林强",
              data: 6
            },
            {
              name: "王楠",
              data: 2
            }
          ]
        }
      ],
      // 雷达图数据
      radarData: [
        {
          name: "一对一私教课",
          value: 2
        },
        {
          name: "精品格斗课",
          value: 5
        },
        {
          name: "普拉提小团课",
          value: 2
        },
        {
          name: "竞技减脂课",
          value: 5
        },
        {
          name: "精品拉伸课",
          value: 5
        },
        {
          name: "体适能训练课",
          value: 7
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.index-container {
  text-align: left;
  .page-tt {
    color: #666;
    background-color: #fff;
    padding: 0 15px;
    line-height: 50px;
    margin-top: 18px;
  }
  .row {
    display: flex;
    justify-content: space-between;
    margin-top: 25px;
    .item-container {
      background-color: #fff;
    }
  }
}
</style>
