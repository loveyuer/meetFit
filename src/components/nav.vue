<template>
  <div class="nav-wrapper">
    <p class="logo-wrapper"><i></i>ONE MORE私教健身工作室</p>
    <el-menu default-active="1" background-color="#20222a" text-color="#c2c2c2">
      <el-menu-item
        v-for="item in nav"
        :key="item.id"
        :index="item.id"
        @click="$router.push(item.router)"
        >{{ item.name }}</el-menu-item
      >
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nav: [
        // {
        //   id: "1",
        //   name: "首页",
        //   router: "index"
        // },
        // {
        //   id: "2",
        //   name: "会员推送管理",
        //   router: "memberPushManagement"
        // },
        {
          id: "3",
          name: "会员管理",
          router: "memberManagement"
        },
        {
          id: "4",
          name: "教练管理",
          router: "coachManagement"
        },
        {
          id: "5",
          name: "课程管理",
          router: "courseManagement"
        },
        // {
        //   id: "6",
        //   name: "预约管理",
        //   router: "orderManagement"
        // },
        {
          id: "7",
          name: "业绩管理",
          router: "achievementManagement"
        }
        // {
        //   id: "8",
        //   name: "薪资模板管理",
        //   router: "payTemplateManagement"
        // },
        // {
        //   id: "9",
        //   name: "薪资计算",
        //   router: "/salary"
        // },
        // {
        //   id: "10",
        //   name: "统计分析",
        //   router: "statistics"
        // },
        // {
        //   id: "11",
        //   name: "短信权限管理",
        //   router: "messageAuthorityManagement"
        // },
        // {
        //   id: "12",
        //   name: "角色权限管理",
        //   router: "roleAuthorityManagement"
        // }
      ]
    };
  }
};
</script>
<style lang="scss">
.nav-wrapper {
  width: 288px;
  height: 100%;
  position: fixed;
  z-index: 1;
  .logo-wrapper {
    font-size: 14px;
    height: 90px;
    background-color: #3399ff;
    font-weight: bold;
    text-align: center;
    line-height: 90px;
    color: #fff;
  }
  .el-menu {
    height: 100%;
    border-right: 0;
    li {
      padding-left: 50px !important;
      text-align: left;
    }
  }
}
</style>
