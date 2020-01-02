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
        {
          path: "memberPushManagement",
          component: () => import("./views/management/memberPushManagement.vue")
        },
        {
          path: "memberManagement",
          component: () => import("./views/management/memberManagement.vue")
        },
        {
          path: "coachManagement",
          component: () => import("./views/management/coachManagement.vue")
        },
        {
          path: "coachManagement/detail",
          component: () => import("./views/management/coach/detail.vue")
        },
        {
          path: "courseManagement",
          component: () => import("./views/management/courseManagement.vue")
        },
        {
          path: "orderManagement",
          component: () => import("./views/management/orderManagement.vue")
        },
        {
          path: "achievementManagement",
          component: () =>
            import("./views/management/achievementManagement.vue")
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
          path: "messageAuthorityManagement",
          component: () =>
            import("./views/management/messageAuthorityManagement.vue")
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
