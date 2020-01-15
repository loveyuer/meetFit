<template>
  <div class="home">
    <nav-menu></nav-menu>
    <div class="bd-right">
      <div class="right-top">
        <div class="title"><img src alt />遇健私教平台管理后台</div>
        <div class="option">
          <span style="margin-right: 10px;">
            <i class="el-icon-service"></i>联系客服
          </span>
          <el-popover>
            <span @click="logOut" class="cursor logout">退出</span>
            <span slot="reference" class="cursor">
              {{ user }}<i class="el-icon-caret-bottom"></i>
            </span>
          </el-popover>
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
  },
  computed: {
    user() {
      return sessionStorage.getItem("user");
    }
  },
  methods: {
    // 退出登录
    logOut() {
      this.$http.get("/admin/index/logout").then(() => {
        this.$router.push("/");
      });
    }
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
    .wrap {
      padding: 30px;
      background: #fff;
    }
  }
}
.cursor {
  cursor: pointer;
}
.logout {
  width: 100%;
  display: block;
  text-align: center;
}
</style>
