<template>
  <div class="achievement-detail">
    <el-table :data="tableData">
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column label="会员名称" prop="customer_name"></el-table-column>
      <el-table-column label="购买课程" prop="course_name"></el-table-column>
      <el-table-column label="购买单价" prop="course_price"></el-table-column>
      <el-table-column label="购买数量" prop="course_count"></el-table-column>
      <el-table-column label="购买总价"></el-table-column>
      <el-table-column label="录入时间" prop="time_h"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      page: 1,
      size: 10,
      total: 0
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取数据
    getData() {
      this.$http
        .get("/index.php/admin/achievement/achievementList", {
          params: {
            coach_id: this.$route.params.id,
            page: this.page,
            page_size: this.size
          }
        })
        .then(res => {
          this.tableData = res.data.data;
          this.total = res.data.total;
        });
    },
    // 翻页
    handleCurrentChange(v) {
      this.page = v;
      this.getData();
    },
    // 设置每页条数
    handleSizeChange(v) {
      this.size = v;
      this.getData();
    }
  }
};
</script>
