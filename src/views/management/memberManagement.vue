<template>
  <div class="wrap">
    <div class="search-wrap">
      <el-input
        v-model="searchText"
        placeholder="搜索会员名称"
        prefix-icon="el-icon-search"
        v-if="!filter"
        class="input-search"
        @keyup.enter.native="getData"
      ></el-input>
      <div class="filter" v-if="filter">
        <el-form>
          <el-form-item label="会员名称">
            <el-input v-model="name"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="mobile"></el-input>
          </el-form-item>
          <el-form-item label="分配状态">
            <el-select v-model="status">
              <el-option value="未分配">未分配</el-option>
              <el-option value="已分配">已分配</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="负责教练">
            <el-select v-model="coach">
              <el-option
                v-for="item in coachList"
                :key="item.coach_id"
                :label="item.name"
                :value="item.coach_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="注册日期">
            <el-date-picker
              v-model="dateCreate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-form>
        <el-button type="primary">搜索</el-button>
        <el-button @click="clearForm">清空</el-button>
      </div>
      <span @click="filter = !filter" class="select-btn">筛选</span>
    </div>
    <el-table :data="tableData" border>
      <el-table-column label="序号" type="index" width="50px"></el-table-column>
      <el-table-column label="会员名称" prop="name"></el-table-column>
      <el-table-column label="联系方式" prop="mobile"></el-table-column>
      <el-table-column label="注册日期" prop="time_h"></el-table-column>
      <el-table-column
        label="分配状态"
        prop="defalut_coach_status"
      ></el-table-column>
      <el-table-column label="负责教练" prop="coach_name"></el-table-column>
      <el-table-column
        label="剩余课时（节）"
        prop="publishDate"
      ></el-table-column>
      <el-table-column label="备注" prop="note"></el-table-column>

      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
          <!-- <el-button @click="publish(scope.row)" size="mini" type="success"
            >录入</el-button
          > -->
          <el-button @click="update(scope.row)" size="mini" type="warning"
            >修改</el-button
          >
          <el-button @click="del(scope.row)" size="mini" type="danger"
            >删除</el-button
          >
          <el-button @click="sendCoach(scope.row)" size="mini" type="primary"
            >分配</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="分配教练" :visible.sync="statusVisible" width="360px">
      <el-form>
        <el-form-item label="请选择教练">
          <el-select v-model="chooseCoach">
            <el-option
              v-for="item in coachList"
              :key="item.coach_id"
              :label="item.name"
              :value="item.coach_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="confirmCoach">确定</el-button>
      </el-form>
    </el-dialog>
    <el-dialog
      :title="msgTitle"
      :visible.sync="msgVisible"
      width="500px"
      class="update-dialog"
    >
      <el-form class="msgForm" :model="msgForm" label-width="80px">
        <el-form-item label="会员名称">
          <el-input v-model="msgForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="msgForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="msgForm.sex" style="width: 100%">
            <el-option label="保密" :value="0"></el-option>
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker
            v-model="msgForm.birthday"
            type="date"
            placeholder="请选择日期"
            value-format="yyyy-MM-DD"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="msgForm.address"></el-input>
        </el-form-item>
        <el-form-item label="过往病史">
          <el-input v-model="msgForm.medical"></el-input>
        </el-form-item>
        <el-form-item label="备注提醒">
          <el-input v-model="msgForm.note"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button @click="msgVisible = false">取消</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      filter: false,
      searchText: "",
      tableData: [],
      name: "",
      mobile: "",
      coach: "",
      coachList: [],
      status: "",
      dateCreate: "",
      chooseCoach: "",
      chooseUser: "",
      statusVisible: false,
      msgVisible: false,
      msgTitle: "",
      msgForm: {},
      type: "add"
    };
  },
  methods: {
    update(row) {
      this.type = "edit";
      this.msgVisible = true;
      this.msgForm = row;
    },
    del(row) {
      this.$confirm("确认删除该会员吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .get(`/admin/Customer/customerDel?customer_id=${row.customer_id}`)
            .then(res => {
              this.$message(res.msg);
              this.getData();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    publish(row) {
      alert(row);
    },
    submit() {
      const url = this.type === "add" ? "" : "/admin/Customer/customerUpdate";
      this.$http.get(url, { params: this.msgForm }).then(res => {
        if (res.code === "1") {
          this.$message(res.msg);
          this.msgVisible = false;
          this.getData();
        }
      });
    },
    getData() {
      this.$http
        .get("/admin/Customer/customerList", {
          params: { name: this.searchText }
        })
        .then(res => {
          this.tableData = res.data.data;
        });
    },
    // 获取教练列表
    getCoach() {
      this.$http.get("/admin/coach/coachlist").then(res => {
        this.coachList = res.data.data;
      });
    },
    // 清空表格
    clearForm() {
      this.name = "";
      this.mobile = "";
      this.coach = "";
      this.status = "";
      this.dateCreate = null;
    },
    // 分配教练
    sendCoach(row) {
      this.chooseCoach = "";
      this.statusVisible = true;
      this.chooseUser = row.customer_id;
    },
    // 选择教练
    confirmCoach() {
      this.$http
        .get(
          `/admin/Customer/customerDefaultCoach?coach_id=${this.chooseCoach}&customer_id=${this.chooseUser}`
        )
        .then(res => {
          if (res.code === "1") {
            this.$message(res.msg);
            this.statusVisible = false;
            this.getData();
          }
        })
        .catch(e => {
          this.$message(e.msg);
        });
    }
  },
  created() {
    this.getData();
    this.getCoach();
  }
};
</script>
<style lang="scss">
.el-table td,
.el-table th.is-leaf {
  text-align: center;
}
.search-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  border: 1px solid #ebeef5;
  padding: 10px;
  .input-search {
    width: 300px;
  }
  .select-btn {
    cursor: pointer;
  }
  .filter {
    text-align: left;
    .el-form {
      display: flex;
      .el-form-item {
        margin-right: 20px;
      }
    }
  }
}
.el-table .cell {
  text-align: center;
}
.update-dialog {
  .el-dialog {
    display: flex;
  }
}
.el-dialog__header {
  display: flex;
}
</style>
