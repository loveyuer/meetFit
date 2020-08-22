import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import element from "element-ui";
import axios from "axios";
import "element-ui/lib/theme-chalk/index.css";
import "./stylesheet/reset.scss";
import "./stylesheet/common.scss";
import echarts from "echarts";
import "../public/UE/themes/default/css/ueditor.css";

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.use(element);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// http请求基础url
Vue.prototype.$http = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-type": "application/x-www-form-urlencoded"
  }
});

// http请求response拦截器（预处理返回值）
Vue.prototype.$http.interceptors.response.use(
  res => {
    const self = Vue.prototype;
    if (res.data.code === "4001") {
      router.replace("/");
      return Promise.reject(res.data);
    } else if (res.data.code === "1" || res.status === 200) {
      return res.data;
    } else {
      self.$message(res.data.message);
      return Promise.reject(res.data);
    }
  },
  err => {
    const self = Vue.prototype;
    self.$message("服务器出错了，请联系管理员");
    return Promise.reject(err);
  }
);
