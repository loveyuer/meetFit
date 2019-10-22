<template>
  <div class="card">
    <p class="font22 color">{{ cardData.num }}</p>
    <p>{{ cardData.text }}</p>
    <div class="row">
      <div>
        <p class="font22 color-dark">{{ cardData.data.today }}</p>
        <p>今日</p>
      </div>
      <div>
        <p class="font22 color-dark">{{ cardData.data.month }}</p>
        <p>本月</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["cardData"]
};
</script>
<style lang="scss" scoped>
.card {
  padding: 26px 28px;
  width: 240px;
  height: 240px;
  box-sizing: border-box;
  text-align: center;
  .font22 {
    font-size: 22px;
  }
  .color {
    color: #10d272;
    font-weight: bold;
  }
  .row {
    display: flex;
    justify-content: space-between;
    margin-top: 68px;
    .color-dark {
      color: #212112;
      margin-bottom: 20px;
    }
  }
}
</style>
