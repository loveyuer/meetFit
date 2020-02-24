<template>
  <div class="wrap">
    <div class="search-wrap">
      <el-input
        v-model="searchText"
        placeholder="搜索教练名称"
        prefix-icon="el-icon-search"
        v-if="!filter"
        class="input-search"
        @keyup.enter.native="getCoach"
      ></el-input>
      <div class="filter" v-if="filter">
        <el-form>
          <el-form-item label="教练名称">
            <el-input v-model="name"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="mobile"></el-input>
          </el-form-item>
          <el-form-item label="注册日期">
            <el-date-picker
              v-model="dateCreate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="getCoach">搜索</el-button>
        <el-button @click="clearForm">清空</el-button>
      </div>
      <span @click="filter = !filter" class="select-btn"
        >筛选<i
          :class="filter ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"
        ></i
      ></span>
    </div>
    <el-button
      type="text"
      @click="add"
      style="float: right;color: #434A64;"
      icon="el-icon-circle-plus"
      >添加教练</el-button
    >
    <el-table :data="tableData">
      <el-table-column label="序号" type="index" width="50px"></el-table-column>
      <el-table-column label="教练" prop="name"></el-table-column>
      <el-table-column label="联系方式" prop="mobile"></el-table-column>
      <el-table-column label="注册日期" prop="time_h"></el-table-column>
      <el-table-column label="操作" width="150px">
        <template slot-scope="scope">
          <el-button @click="update(scope.row)" type="text">修改</el-button>
          <el-button @click="del(scope.row)" type="text">删除</el-button>
          <!-- <el-button @click="addDetail" size="mini" type="primary"
            >资质录入</el-button
          > -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <el-dialog :title="msgTitle" :visible.sync="msgVisible" width="500px">
      <el-form :model="msgForm" label-width="80px">
        <el-form-item label="教练姓名">
          <el-input v-model="msgForm.name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="msgForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="教练擅长">
          <div class="input-wrap">
            <el-input
              v-for="(item, index) of 3"
              :key="index"
              v-model="msgForm.good[index]"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="教练标签">
          <div class="input-wrap">
            <el-input
              v-for="(item, index) of 2"
              :key="index"
              v-model="msgForm.tag[index]"
            ></el-input>
          </div>
        </el-form-item>
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button @click="close">取消</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      filter: false,
      // 检索词
      searchText: "",
      tableData: [],
      // 教练名称
      name: "",
      mobile: "",
      dateCreate: "",
      msgTitle: "",
      msgVisible: false,
      msgForm: {
        name: "",
        mobile: "",
        coach_id: "",
        good: [],
        tag: []
      },
      type: "add",
      // 分页
      page: 1,
      page_size: 10,
      total: 0
    };
  },
  methods: {
    update(row) {
      this.type = "edit";
      this.msgTitle = "教练修改";
      this.msgForm.name = row.name;
      this.msgForm.mobile = row.mobile;
      this.msgForm.coach_id = row.coach_id;
      this.msgForm.good = row.lable.split(" ");
      this.msgForm.tag = row.signature.split(" ");
      this.msgVisible = true;
    },
    add() {
      this.type = "add";
      this.msgTitle = "教练添加";
      this.msgForm.name = "";
      this.msgForm.mobile = "";
      this.msgVisible = true;
    },
    submit() {
      const url =
        this.type === "add"
          ? "/index.php/admin/coach/coachAdd"
          : "/index.php/admin/coach/coachUpdate";
      let params = {};
      if (this.type === "add") {
        params = {
          name: this.msgForm.name,
          mobile: this.msgForm.mobile,
          lable: this.msgForm.good.join(" "),
          signature: this.msgForm.tag.join(" ")
        };
      } else {
        params = {
          coach_id: this.msgForm.coach_id,
          mobile: this.msgForm.mobile,
          lable: this.msgForm.good.join(" "),
          signature: this.msgForm.tag.join(" ")
        };
      }
      this.$http.get(url, { params }).then(res => {
        this.$message(res.msg);
        this.getCoach();
        this.msgVisible = false;
      });
    },
    close() {
      this.msgForm.name = "";
      this.msgForm.coach_id = "";
      this.msgForm.mobile = "";
      this.msgVisible = false;
      this.msgForm.good = [];
      this.msgForm.tag = [];
    },
    del(row) {
      this.$confirm("确认删除此教练吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .get(`/index.php/admin/coach/coachDel?coach_id=${row.coach_id}`)
            .then(res => {
              this.$message(res.msg);
              this.getCoach();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 翻页
    handleCurrentChange(v) {
      this.page = v;
      this.getData();
    },
    // 设置每页条数
    handleSizeChange(v) {
      this.page_size = v;
      this.getData();
    },
    // 获取教练列表
    getCoach() {
      const params = {
        name: this.searchText || this.name || null,
        mobile: this.mobile,
        time_start: this.dateCreate && this.dateCreate[0],
        time_end: this.dateCreate && this.dateCreate[1],
        page: this.page,
        page_size: this.page_size
      };
      this.$http
        .get("/index.php/admin/coach/coachlist", { params: params })
        .then(res => {
          this.tableData = res.data.data;
          this.total = res.data.total;
        });
    },
    // 清空表格
    clearForm() {
      this.name = "";
      this.mobile = "";
      this.dateCreate = null;
    },
    // 资质录入跳转
    addDetail() {
      this.$router.push("coachManagement/detail");
    }
  },
  created() {
    this.getCoach();
  }
};
</script>
<style lang="scss" scoped>
.input-wrap {
  display: flex;
  .el-input {
    margin-right: 5px;
  }
}
</style>
