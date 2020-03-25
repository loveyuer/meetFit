<template>
  <div class="message-management">
    <div class="title">
      当前短信剩余条数：{{ count }}
      <el-button type="text" @click="dialogVisible = true">购买</el-button>
    </div>
    <el-table :data="tableData">
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column label="短信类型" prop="label"> </el-table-column>
      <el-table-column label="类型说明" prop="type"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeStatus(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" width="500px">
      <h2>请微信扫描二维码练习我们！</h2>
      <p>(点击空白处关闭窗口)</p>
      <img src="@/assets/qcode.jpg" class="code" alt="" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 0,
      tableData: [
        {
          label: "登录验证",
          type: "会员帐号登陆验证",
          params: "login_btn",
          status: true
        },
        {
          label: "约课提醒（教练端）",
          type: "约课成功后教练端收到提醒",
          params: "appoint_coach_btn",
          status: true
        },
        {
          label: "约课提醒（会员端）",
          type: "约课成功后会员端收到提醒",
          params: "appoint_customer_btn",
          status: true
        },
        {
          label: "取消提醒（教练端）",
          type: "课程取消后教练端收到提醒",
          params: "cancel_appoint_coach_btn",
          status: true
        },
        {
          label: "取消提醒（会员端）",
          type: "课程取消后会员端收到提醒",
          params: "cancel_appoint_customer_btn",
          status: true
        },
        {
          label: "课前提醒（教练端）",
          type: "开课前2小时教练端收到提醒",
          params: "lession_coach_btn",
          status: true
        },
        {
          label: "课前提醒（会员端）",
          type: "开课前2小时会员端收到提醒",
          params: "lession_customer_btn",
          status: true
        }
      ],
      list: {},
      dialogVisible: false
    };
  },
  created() {
    this.getData();
  },
  methods: {
    changeStatus(row) {
      if (row.status === false) {
        this.list[row.params] = "0";
      } else {
        this.list[row.params] = "1";
      }
      this.$http
        .get("/index.php/admin/message/messageGymUpdate", { params: this.list })
        .then(res => {
          this.getData();
          this.$message(res.msg);
        });
    },
    // 获取数据
    getData() {
      this.$http.get("/index.php/admin/message/messageGymList").then(res => {
        this.list = res.data.list;
        this.tableData.forEach(t => {
          t.status = this.transformBool(res.data.list[t.params]);
        });
        this.count = res.data.message_num;
      });
    },
    // 状态布尔值转化
    transformBool(status) {
      if (status === "1") {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
<style lang="scss">
.title {
  text-align: left;
}
.code {
  width: 80%;
}
</style>
