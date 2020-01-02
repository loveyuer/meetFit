<template>
  <div class="login">
    <div class="login-box">
      <h1>后台管理系统</h1>
      <el-form class="login-form" label-width="80px">
        <el-form-item label="用户名">
          <el-input
            type="text"
            v-model="mobile"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            type="password"
            v-model="pwd"
            placeholder="请输入密码"
            @keyup.enter.native="login"
          ></el-input>
          <el-button @click="login" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import md5 from "js-md5";
export default {
  data() {
    return {
      mobile: "",
      pwd: ""
    };
  },
  methods: {
    login() {
      this.$http
        .get("/admin/index/login", {
          params: { mobile: this.mobile, pwd: md5(this.pwd) }
        })
        .then(() => {
          this.$router.push({ path: "/home/memberManagement" });
          sessionStorage.setItem("user", this.mobile);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
}
.login-box {
  background: #2b3b52;
  width: 400px;
  height: 400px;
  margin: 0 auto;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 8px;
  h1 {
    color: #fff;
    margin-top: 50px;
  }
  .login-form {
    width: 85%;
    margin-top: 80px;
    .el-button {
      margin-top: 40px;
    }
  }
}
</style>
