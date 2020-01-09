<template>
  <div class="wrap">
    <div class="search-wrap">
      <el-input
        v-model="searchText"
        placeholder="搜索教练名称"
        prefix-icon="el-icon-search"
        v-if="!filter"
        class="input-search"
        @keyup.enter.native="getData"
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
        <el-button type="primary" @click="getData">搜索</el-button>
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
      achievementVisible: false,
      // 分页
      page: 1,
      page_size: 10,
      total: 0
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
    // 获取教练列表
    getData() {
      const params = {
        name: this.searchText || this.name || null,
        time_start: this.dateCreate && this.dateCreate[0],
        time_end: this.dateCreate && this.dateCreate[1],
        page: this.page,
        page_size: this.page_size
      };
      this.$http
        .get("/admin/achievement/coachList", {
          params: params
        })
        .then(res => {
          this.tableData = res.data.data;
          this.total = res.data.total;
        });
    },
    // 获取会员列表
    getMember() {
      this.$http.get("/admin/Customer/customerList").then(res => {
        this.memberList = res.data.data;
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
