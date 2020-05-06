<template>
  <div class="wrap">
    <div class="return">
      <el-button type="primary" @click="$router.push('/home/memberManagement')"
        >返回</el-button
      >
    </div>
    <el-table :data="tableData">
      <el-table-column
        label="序号"
        type="index"
        width="50px"
        :index="table_index"
      ></el-table-column>
      <el-table-column label="课程名称" prop="course_name"></el-table-column>
      <el-table-column
        label="购买数量"
        prop="course_count_all"
      ></el-table-column>
      <el-table-column label="购买单价" prop="course_price"></el-table-column>
      <el-table-column label="剩余课程" prop="count_valid"></el-table-column>
      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
          <el-button @click="clearCourse(scope.row)" type="text"
            >清除课程</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      // 分页
      page: 1,
      page_size: 10,
      total: 0
    };
  },
  methods: {
    clearCourse(row) {
      this.$confirm("确认清除课程吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .get(
              `/index.php/admin/Customer/customerCourseUnbind?course_bind_customer_id=${row.course_bind_customer_id}&customer_id=${row.customer_id}`
            )
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
    // 获取数据
    getData() {
      this.$http
        .get("/index.php/admin/Customer/customerCourseInfo", {
          params: {
            customer_id: this.$route.params.id
          }
        })
        .then(res => {
          this.tableData = res.data;
          //   this.total = res.data.total;
        });
    },
    // 分页table index
    table_index(index) {
      return (this.page - 1) * this.page_size + index + 1;
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style lang="scss">
.wrap {
  .return {
    float: right;
    margin-bottom: 20px;
  }
}
</style>
