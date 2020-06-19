<template>
  <div class="message-management">
    <div class="search-wrap">
      <div>
        <label>场馆名称</label>
        <el-input
          v-model="searchText"
          placeholder="请输入场馆名称"
          prefix-icon="el-icon-search"
          class="input-search"
        ></el-input>
        <el-button type="primary" @click="getData">查询</el-button>
        <el-button type="text" @click="searchText = ''">清空</el-button>
      </div>
    </div>
    <el-table :data="tableData">
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column label="店铺名称" prop="gym_name"></el-table-column>
      <el-table-column label="老板名称" prop="boss_name"></el-table-column>
      <el-table-column label="店铺人数" prop="customer_count"></el-table-column>
      <!-- <el-table-column label="会员状态" prop="label"> </el-table-column> -->
      <el-table-column label="短信剩余条数" prop="message_use_count"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="addMessage(scope.row)">添加短信</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" width="400px">
      <div class="flex">
        <label>添加条数</label>
        <el-input v-model="addNum" type="number" style="width: 225px"></el-input>
      </div>
      <el-button type="primary" @click="confirm">确定</el-button>
      <el-button @click="close">取消</el-button>
    </el-dialog>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      searchText: "",
      dialogVisible: false,
      addNum: "",
      addGym: "",
      // 分页
      page: 1,
      page_size: 10,
      total: 0
    };
  },
  created() {
    this.getData();
  },
  methods: {
    confirm() {
      this.$http
        .get("/index.php/admin/message/messageAddCount", {
          params: {
            gym_id: this.addGym,
            add_num: this.addNum
          }
        })
        .then(() => {
          this.getData();
          this.dialogVisible = false;
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
        .get("/index.php/admin/message/messageGymInfoList", {
          params: {
            name: this.searchText,
            page: this.page,
            page_size: this.page_size
          }
        })
        .then(res => {
          this.tableData = res.data.data;
          this.total = res.data.total;
        });
    },
    // 关闭弹窗
    close() {
      this.dialogVisible = false;
      this.addNum = "";
    },
    // 确定添加
    addMessage(row) {
      this.dialogVisible = true;
      this.addGym = row.gym_id;
    }
  }
};
</script>
<style lang="scss">
.message-management {
  .search-wrap {
    label {
      margin-right: 10px;
    }
    .el-input {
      margin-right: 10px;
    }
  }
  .flex {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    label {
      width: 80px;
      margin-right: 10px;
    }
  }
}
</style>
