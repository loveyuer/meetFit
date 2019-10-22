<template>
  <div class="today">
    <div class="item">
      <p class="count green">{{ todayData.appointment }}</p>
      <p class="text">今日预约</p>
    </div>
    <div class="item">
      <p class="count orange">{{ todayData.cancle }}</p>
      <p class="text">今日取消</p>
    </div>
    <div class="item">
      <p class="count blue">{{ todayData.surplus }}</p>
      <p class="text">今日剩余</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["todayData"]
};
</script>
<style lang="scss" scoped>
.today {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 636px;
  height: 240px;
  box-sizing: border-box;
  padding: 0 20px;
  .item {
    text-align: center;
    .count {
      width: 115px;
      height: 115px;
      border-radius: 50%;
      font-size: 36px;
      font-weight: bold;
      color: #fff;
      margin-bottom: 18px;
      text-align: center;
      line-height: 115px;
    }
    .text {
      font-size: 22px;
    }
    .green {
      background-color: #10d272;
    }
    .orange {
      background-color: #fa901d;
    }
    .blue {
      background-color: #12a5e9;
    }
  }
}
</style>
