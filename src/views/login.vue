<template>
  <div class="login">
    <div class="login-wrap">
      <div class="logo">
        <img src="../assets/logo.png" alt="" />
        <div class="tt">
          <h2>MEET-FIT私教约课平台管理系统</h2>
          <h3>你值得遇见更好的自己</h3>
        </div>
      </div>
      <div class="login-box">
        <h1>登录</h1>
        <el-tabs v-model="activeName">
          <el-tab-pane label="短信登录" name="1">
            <el-form class="login-form">
              <el-form-item>
                <el-input
                  type="text"
                  v-model="mobile"
                  placeholder="请输入手机号码"
                  prefix-icon="el-icon-mobile-phone"
                ></el-input>
              </el-form-item>
              <el-form-item class="code-wrap">
                <el-input
                  type="text"
                  v-model="mobileCode"
                  placeholder="请输入验证码"
                  prefix-icon="el-icon-key"
                  style="width: 600px;margin-right: 10px"
                ></el-input>
                <el-button
                  type="primary"
                  @click="getMsgCode"
                  v-if="!show"
                  style="margin-top: 0"
                  >获取验证码</el-button
                >
                <el-button type="primary" disabled v-else style="margin-top: 0"
                  >{{ count }}s</el-button
                >
              </el-form-item>
              <el-button @click="login" type="primary">登录</el-button>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="密码登录" name="2">
            <el-form class="login-form">
              <el-form-item>
                <el-input
                  type="text"
                  v-model="userName"
                  placeholder="请输入用户名"
                  prefix-icon="el-icon-user"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  type="password"
                  v-model="pwd"
                  placeholder="请输入密码"
                  prefix-icon="el-icon-unlock"
                  @keyup.enter.native="login"
                ></el-input>
              </el-form-item>
              <el-form-item class="code-wrap">
                <el-input
                  type="text"
                  v-model="valid"
                  placeholder="请输入验证码"
                  prefix-icon="el-icon-key"
                  style="width: 220px;margin-right: 10px"
                ></el-input>
                <img :src="codeSrc" class="code-img" @click="getImgCode" />
              </el-form-item>
              <el-button @click="login" type="primary">登录</el-button>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import md5 from "js-md5";
export default {
  data() {
    return {
      // 手机号
      mobile: "",
      // 密码
      pwd: "",
      // 手机验证码
      mobileCode: "",
      // tab
      activeName: "1",
      // 验证码
      valid: "",
      // 用户名
      userName: "",
      // 验证码地址
      codeSrc: "",
      // 计时器
      timer: null,
      // 倒计时数据
      count: "",
      // 倒计时是否显示
      show: false
    };
  },
  mounted() {
    this.getImgCode();
  },
  methods: {
    // 点击登录
    login() {
      this.$http
        .get("/index.php/admin/index/login", {
          params: {
            mobile: this.mobile || this.userName,
            pwd: this.activeName === "2" ? md5(this.pwd) : null,
            type: this.activeName,
            code: this.activeName === "1" ? this.mobileCode : this.valid
          }
        })
        .then(res => {
          if (res.code === "1") {
            this.$router.push({ path: "/home/index" });
            const info = {
              userName: this.mobile || this.userName,
              gymName: res.gym_name
            };
            this.pwd = "";
            sessionStorage.setItem("user", JSON.stringify(info));
          } else {
            this.$message.warning(res.msg);
          }
        });
    },
    // 获取短信验证码
    getMsgCode() {
      this.$http
        .get(`/index.php/index/user/sendCode?mobile=${this.mobile}`)
        .then(res => {
          if (res.code === "0") {
            this.$message.warning(res.msg);
          } else {
            this.show = true;
            this.time();
          }
        });
    },
    // 倒计时
    time() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = false;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    // 获取验证码
    getImgCode() {
      this.$http
        .get("/index.php/admin/index/captcha", { responseType: "arraybuffer" })
        .then(res => {
          return (
            "data:image/png;base64," +
            btoa(
              new Uint8Array(res).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            )
          );
        })
        .then(data => {
          this.codeSrc = data;
        });
    },
    // 验证码验证
    imgValid() {
      this.$http
        .get("/index.php/admin/index/captcha_check", {
          params: { code: this.valid }
        })
        .then(res => {
          if (res.code === "0") {
            this.$message.warning(res.msg);
          } else {
            this.login();
          }
        });
    }
  }
};
</script>
<style lang="scss">
.login {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  background: url(../assets/bg.png);
  background-size: cover;
}
.login-wrap {
  display: flex;
  width: 1126px;
  margin: auto;
}
.logo {
  background: url(../assets/login-bg.png);
  width: 626px;
  height: 670px;
  box-sizing: border-box;
  padding: 40px;
  text-align: left;
  position: relative;
  .tt {
    position: absolute;
    right: 40px;
    bottom: 140px;
    h2 {
      color: #3d4653;
      font-size: 28px;
      margin-bottom: 10px;
    }
    h3 {
      color: #313945;
      font-size: 18px;
      text-align: right;
    }
  }
}
.login-box {
  background: #fff;
  width: 500px;
  height: 670px;
  margin: 0 auto;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 60px;
  box-sizing: border-box;
  .el-tabs {
    margin-top: 70px;
  }
  .el-tabs__nav-wrap::after {
    height: 0;
  }
  .el-tabs__item {
    color: #aaafb8;
    font-size: 16px;
  }
  .el-tabs__item.is-active {
    color: #313945;
  }
  .el-tabs__active-bar {
    background-color: #575d67;
  }
  h1 {
    display: inline-block;
    color: #454e5c;
    margin-top: 100px;
    border-bottom: 2px solid #313945;
    padding-bottom: 10px;
    font-size: 22px;
  }
  .login-form {
    margin-top: 5px;
    .el-button {
      margin-top: 20px;
      background-color: #313945;
      color: #fff;
      border-color: #313945;
      width: 100%;
    }
    .code-wrap {
      .el-form-item__content {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    .code-img {
      height: 40px;
    }
  }
}
</style>
