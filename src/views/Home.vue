<template>
  <div class="home">
    <nav-menu></nav-menu>
    <div class="bd-right">
      <div class="right-top">
        <div class="title"><img src alt />遇健私教平台管理后台</div>
        <div class="option">
          <span> <i></i>联系客服 </span>
          <span> <i></i>超级管理员 </span>
        </div>
      </div>
      <div class="right-bd">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import NavMenu from "../components/nav";
export default {
  name: "home",
  components: {
    NavMenu
  }
};
</script>
<style lang="scss" scoped>
.bd-right {
  margin-left: 288px;
  background-color: #f2f2f2;
  .right-top {
    height: 90px;
    display: flex;
    justify-content: space-between;
    line-height: 90px;
    padding: 0 40px;
    background-color: #fff;
  }
  .right-bd {
    background-color: #f8f9fb;
    padding: 20px 40px;
  }
}
</style>
