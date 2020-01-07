<template>
  <div class="wrap">
    <div class="search-wrap">
      <el-input
        v-model="searchText"
        placeholder="搜索课程名称"
        prefix-icon="el-icon-search"
        v-if="!filter"
        class="input-search"
      ></el-input>
      <div class="filter" v-if="filter">
        <el-form>
          <el-form-item label="课程名称">
            <el-input v-model="name"></el-input>
          </el-form-item>
          <el-form-item label="创建时间">
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
    <el-button type="text" @click="add" style="float: right"
      >添加课程</el-button
    >
    <el-table :data="tableData" border>
      <el-table-column label="序号" type="index" width="50px"></el-table-column>
      <el-table-column label="课程名称" prop="name"></el-table-column>
      <el-table-column label="会员人数（人）" prop="number"></el-table-column>
      <el-table-column label="课程时间（分钟）" prop="period"></el-table-column>
      <el-table-column label="课程售价（元）" prop="price"></el-table-column>
      <el-table-column
        label="自动签课状态"
        prop="auto_finish"
      ></el-table-column>
      <el-table-column label="创建时间" prop="time_h"></el-table-column>
      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
          <el-button @click="update(scope.row)" size="mini" type="warning"
            >修改</el-button
          >
          <el-button @click="del(scope.row)" size="mini" type="danger"
            >删除</el-button
          >
          <el-button @click="sendCoach(scope.row)" size="mini" type="primary"
            >课程分配</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="msgTitle" :visible.sync="msgVisible" width="500px">
      <el-form class="msgForm" :model="msgForm" label-width="100px">
        <el-form-item label="课程名称">
          <el-input v-model="msgForm.name"></el-input>
        </el-form-item>
        <el-form-item label="课程人数">
          <el-input v-model="msgForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="课程时间">
          <el-input v-model="msgForm.period">
            <template slot="append"
              >分钟</template
            ></el-input
          >
        </el-form-item>
        <el-form-item label="课程售价">
          <el-input v-model="msgForm.price">
            <template slot="append"
              >元</template
            >
          </el-input>
        </el-form-item>
        <el-form-item label="最小购买单位">
          <el-input v-model="msgForm.min_sell">
            <template slot="append"
              >节</template
            >
          </el-input>
        </el-form-item>
        <el-form-item label="允许使用时间">
          <el-time-picker
            is-range
            v-model="defaultTime"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            value-format="HH:mm:ss"
            @change="changeTime"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item label="自动签课" style="text-align: left;">
          <el-switch
            v-model="msgForm.auto_finish"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="备注提醒">
          <el-input v-model="msgForm.note"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button @click="msgVisible = false">取消</el-button>
      </el-form>
    </el-dialog>
    <coach-dialog
      :dialogVisible="courseVisible"
      :coachData="coachData"
      :courseId="courseId"
      @closeDialog="closeCoachList"
      @dispatch="dispatch"
    ></coach-dialog>
  </div>
</template>
<script>
import CoachDialog from "./dialog/list.vue";

export default {
  components: { CoachDialog },
  data() {
    return {
      filter: false,
      searchText: "",
      tableData: [],
      name: "",
      dateCreate: "",
      msgVisible: false,
      msgTitle: "",
      msgForm: {},
      type: "add",
      courseVisible: false,
      coachData: [],
      courseId: 0,
      defaultTime: []
    };
  },
  methods: {
    add() {
      this.type = "add";
      this.msgVisible = true;
    },
    update(row) {
      this.type = "edit";
      this.msgVisible = true;
      this.msgForm = row;
      this.msgForm.auto_finish = Boolean(this.msgForm.auto_finish);
      this.defaultTime = [
        `${row.use_time_start}:00:00`,
        `${row.use_time_end}:00:00`
      ];
    },
    del(row) {
      this.$confirm("确认删除该课程吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .get(`/admin/course/courseDel?course_id=${row.id}`)
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
    // 修改时间
    changeTime(v) {
      this.msgForm.use_time_start = Number(v[0].split(":")[0]);
      this.msgForm.use_time_end = Number(v[1].split(":")[0]);
    },
    submit() {
      const url =
        this.type === "add"
          ? "/admin/course/courseAdd"
          : "/admin/course/courseUpdate";
      this.msgForm.course_id = this.msgForm.id;
      this.msgForm.auto_finish = Number(this.msgForm.auto_finish);
      this.$http.get(url, { params: this.msgForm }).then(res => {
        if (res.code === "1") {
          this.$message(res.msg);
          this.msgVisible = false;
          this.getData();
        }
      });
    },
    getData() {
      this.$http.get("/admin/Course/courseList").then(res => {
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
      this.courseVisible = true;
      this.courseId = row.id;
      this.$http
        .get(`admin/course/courseCoachList?course_id=${row.id}`)
        .then(res => {
          this.coachData = res.data.data;
        });
    },
    // 重新获取列表
    dispatch(v) {
      this.sendCoach({ id: v });
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
    },
    // 关闭分配弹框
    closeCoachList() {
      this.courseVisible = false;
    }
  },
  created() {
    this.getData();
    this.getCoach();
  }
};
</script>
