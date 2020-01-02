<template>
  <div class="wrap">
    <div class="search-wrap">
      <el-input
        v-model="searchText"
        placeholder="搜索教练名称"
        prefix-icon="el-icon-search"
        v-if="!filter"
        class="input-search"
      ></el-input>
      <div class="filter" v-if="filter">
        <el-form>
          <el-form-item label="教练名称">
            <el-input v-model="name"></el-input>
          </el-form-item>
          <el-form-item label="时间区间">
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
      <el-table-column label="教练名称" prop="name"></el-table-column>
      <el-table-column
        label="课时统计（节）"
        prop="course_period_all"
      ></el-table-column>
      <el-table-column
        label="业绩统计（元）"
        prop="course_price_all"
      ></el-table-column>
      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
          <el-button
            @click="addAchievement(scope.row)"
            size="mini"
            type="primary"
            >业绩录入</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="业绩录入"
      :visible.sync="achievementVisible"
      width="500px"
    >
      <el-form label-width="80px">
        <el-form-item label="会员选择">
          <el-select v-model="chooseMember" style="width: 100%">
            <el-option
              v-for="item in memberList"
              :key="item.customer_id"
              :label="item.name"
              :value="item.customer_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程选择">
          <el-select v-model="chooseCourse" style="width: 100%">
            <el-option
              v-for="item in courseList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程单价">
          <el-input v-model="coursePrice"></el-input>
        </el-form-item>
        <el-form-item label="购买数量">
          <el-input v-model="courseCount"></el-input>
        </el-form-item>
        <el-form-item label="业绩总计" style="text-align: left;">
          <span>{{ totalAchieve }}</span>
        </el-form-item>
        <el-button type="primary" @click="confirmAdd">确定</el-button>
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
      courseList: [],
      memberList: [],
      dateCreate: "",
      chooseCourse: "",
      chooseMember: "",
      coursePrice: 0,
      courseCount: 0,
      chooseGym: "",
      chooseCoach: "",
      achievementVisible: false
    };
  },
  computed: {
    totalAchieve() {
      return parseFloat(this.coursePrice) * parseFloat(this.courseCount);
    }
  },
  methods: {
    update(row) {
      alert(row);
    },
    del(row) {
      alert(row);
    },
    publish(row) {
      alert(row);
    },
    getData() {
      this.$http.get("/admin/achievement/coachList").then(res => {
        this.tableData = res.data.data;
      });
    },
    // 获取会员列表
    getMember() {
      this.$http.get("/admin/Customer/customerList").then(res => {
        this.memberList = res.data.data;
      });
    },
    // 获取课程列表
    getCourse() {
      this.$http.get("/admin/Course/courseList").then(res => {
        this.courseList = res.data.data;
      });
    },
    // 清空表格
    clearForm() {
      this.name = "";
      this.dateCreate = null;
    },
    // 业绩录入
    addAchievement(row) {
      this.chooseCourse = "";
      this.chooseMember = "";
      this.coursePrice = 0;
      this.courseCount = 0;
      this.achievementVisible = true;
      this.chooseGym = row.gym_id;
      this.chooseCoach = row.coach_id;
    },
    // 确定录入
    confirmAdd() {
      const params = {
        customer_id: this.chooseMember,
        coach_id: this.chooseCoach,
        gym_id: this.chooseGym,
        course_id: this.chooseCourse,
        course_price: this.coursePrice,
        course_count: this.courseCount
      };
      this.$http
        .get("/admin/achievement/achievementAdd", { params })
        .then(res => {
          if (res.code === "1") {
            this.$message(res.msg);
            this.achievementVisible = false;
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
    this.getMember();
    this.getCourse();
  }
};
</script>
<style lang="scss" scoped>
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
    .el-form {
      display: flex;
      .el-form-item {
        margin-right: 20px;
      }
    }
  }
}
</style>
