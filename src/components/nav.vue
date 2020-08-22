<template>
  <div class="nav-wrapper">
    <p class="logo-wrapper">
      <i></i>
      {{ gymName }}
    </p>
    <el-menu
      :default-active="this.$route.path"
      router
      background-color="#323844"
      text-color="#c2c2c2"
    >
      <div>
        <el-menu-item v-for="item in nav" :key="item.router" :index="item.router">
          <i :class="item.icon"></i>
          {{ item.name }}
        </el-menu-item>
      </div>
      <div v-if="admin">
        <el-menu-item v-for="item in adminNav" :key="item.router" :index="item.router">
          <i :class="item.icon"></i>
          {{ item.name }}
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      adminNav: [
        {
          id: "123",
          name: "管理平台",
          router: "/home/messageManage",
          icon: "el-icon-s-tools"
        }
      ],
      nav: [
        {
          id: "1",
          name: "首页",
          router: "/home/index",
          icon: "el-icon-s-home"
        },
        // {
        //   id: "2",
        //   name: "会员推送管理",
        //   router: "memberPushManagement"
        // },
        {
          id: "3",
          name: "会员管理",
          router: "/home/memberManagement",
          icon: "el-icon-s-custom"
        },
        {
          id: "4",
          name: "教练管理",
          router: "/home/coachManagement",
          icon: "el-icon-user-solid"
        },
        {
          id: "5",
          name: "课程管理",
          router: "/home/courseManagement",
          icon: "el-icon-notebook-1"
        },
        // {
        //   id: "6",
        //   name: "消课统计",
        //   router: "eliminationClassManagement"
        // },
        {
          id: "7",
          name: "业绩管理",
          router: "/home/achievementManagement",
          icon: "el-icon-s-check"
        },
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
        {
          id: "11",
          name: "短信管理",
          router: "/home/messageManagement",
          icon: "el-icon-chat-line-round"
        }
        // {
        //   id: "12",
        //   name: "角色权限管理",
        //   router: "roleAuthorityManagement"
        // }
      ],
      admin: false
    };
  },
  computed: {
    gymName() {
      const info = JSON.parse(sessionStorage.getItem("user"));
      return info.gymName;
    }
  },
  created() {
    if (sessionStorage.getItem('admin') === "1") {
      this.admin = true;
    } else {
      this.admin = false;
    }
  }
};
</script>
<style lang="scss">
.nav-wrapper {
  width: 300px;
  height: 100%;
  position: fixed;
  z-index: 1;
  .logo-wrapper {
    font-size: 14px;
    height: 90px;
    background-color: #22262f;
    font-weight: bold;
    text-align: center;
    line-height: 90px;
    color: #fff;
  }
  .el-menu {
    height: 100%;
    border-right: 0;
    .is-active {
      background: #22262f !important;
    }
    li {
      padding-left: 54px !important;
      text-align: left;
      height: 70px;
      line-height: 70px;
      i {
        vertical-align: middle;
        margin-bottom: 2px;
        margin-right: 30px;
      }
    }
  }
}
</style>
