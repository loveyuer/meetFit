import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/home",
      name: "home",
      component: () => import("./views/Home.vue"),
      children: [
        {
          path: "index",
          component: () => import("./views/management/index.vue")
        },
        // {
        //   path: "memberPushManagement", // 会员推送管理
        //   component: () =>
        //     import("./views/management/push/memberPushManagement.vue")
        // },
        {
          path: "memberPushManagement/push", // 会员推送录入或修改
          component: () => import("./views/management/push/update.vue")
        },
        {
          path: "memberManagement", // 会员管理
          component: () =>
            import("./views/management/member/memberManagement.vue")
        },
        {
          path: "memberManagement/update/:id", // 会员信息修改
          component: () => import("./views/management/member/updateMessage.vue")
        },
        {
          path: "coachManagement", // 教练管理
          component: () =>
            import("./views/management/coach/coachManagement.vue")
        },
        {
          path: "coachManagement/detail", // 教练资质录入
          component: () => import("./views/management/coach/detail.vue")
        },
        {
          path: "courseManagement", // 课程管理
          component: () =>
            import("./views/management/course/courseManagement.vue")
        },
        {
          path: "eliminationClassManagement", // 消课管理
          component: () =>
            import(
              "./views/management/eliminating/eliminationClassManagement.vue"
            )
        },
        {
          path: "eliminationClassManagement/detail/:id", // 消课管理详情
          component: () => import("./views/management/eliminating/detail.vue")
        },
        {
          path: "orderManagement",
          component: () => import("./views/management/orderManagement.vue")
        },
        {
          path: "achievementManagement", // 业绩管理
          component: () =>
            import("./views/management/achievement/achievementManagement.vue")
        },
        {
          path: "achievementManagement/detail/:id", // 业绩管理详情
          component: () => import("./views/management/achievement/detail.vue")
        },
        {
          path: "payTemplateManagement",
          component: () =>
            import("./views/management/payTemplateManagement.vue")
        },
        {
          path: "salary",
          component: () => import("./views/management/salary.vue")
        },
        {
          path: "statistics",
          component: () => import("./views/management/statistics.vue")
        },
        {
          path: "messageManagement",
          component: () => import("./views/management/messageManagement.vue")
        },
        {
          path: "roleAuthorityManagement",
          component: () =>
            import("./views/management/roleAuthorityManagement.vue")
        }
      ]
    },
    {
      path: "/",
      name: "login",
      component: () => import("./views/login.vue")
    }
  ]
});
