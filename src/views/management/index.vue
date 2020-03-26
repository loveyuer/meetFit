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
          value: 0
        },
        {
          name: "昨日销售",
          value: 0
        },
        {
          name: "本月累计",
          value: 0
        },
        {
          name: "上月累计",
          value: 0
        }
      ],
      // 会员总量
      memberCount: {
        num: "0",
        text: "会员总量/人",
        data: {
          today: "0",
          month: "0"
        },
        color: "#10d272"
      },
      // 会员余额汇总
      stayCount: {
        num: "3029400.00元",
        text: "会员余额汇总/元",
        data: {
          today: "0",
          month: "0"
        },
        color: "#12a5e9"
      },
      // 今日数据
      todayData: {
        appointment: 0,
        cancle: 0,
        surplus: 0
      },
      // 折线图数据
      lineData: {},
      // 双柱状图数据
      multiBarData: [
        {
          key: "本周销售金额",
          value: []
        },
        {
          key: "本周消课金额",
          value: []
        }
      ],
      // 雷达图数据
      radarData: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http.post("/index.php/admin/index/index_data").then(res => {
        this.barData[0].value = res.data.today_money;
        this.barData[1].value = res.data.yestoday_money;
        this.barData[2].value = res.data.month_money;
        this.barData[3].value = res.data.last_month_money;
        this.memberCount.num = res.data.user_total;
        this.memberCount.data.today = res.data.user_today_total;
        this.memberCount.data.month = res.data.user_month_total;
        this.stayCount.num = res.data.user_money_total;
        this.stayCount.data.today = res.data.user_momey_today_total;
        this.stayCount.data.month = res.data.user_momey_month_total;
        this.todayData.appointment = res.data.today_course_total;
        this.todayData.cancle = res.data.today_course_cancel;
        this.todayData.surplus = res.data.today_course_surplus;
        this.lineData = res.data.month_money_list;
        if (res.data.week_money_list.length)
          this.handleCoachData(res.data.week_money_list);
        if (res.data.course_end_list)
          this.handleCourseData(res.data.course_end_list);
      });
    },
    // 处理教练数据
    handleCoachData(data) {
      data.forEach(item => {
        this.multiBarData[0].value.push({
          name: item.coach_name,
          data: item.sale_money
        });
        this.multiBarData[1].value.push({
          name: item.coach_name,
          data: item.over_money
        });
      });
    },
    // 处理课程消耗数据
    handleCourseData(data) {
      for (const item of Object.keys(data)) {
        this.radarData.push({
          name: data[item].course_name,
          value: data[item].course_num
        });
      }
    }
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
      padding: 10px;
    }
  }
}
</style>
