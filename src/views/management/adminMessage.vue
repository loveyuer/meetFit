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
      <el-table-column label="店铺名称" prop="gym_name"> </el-table-column>
      <el-table-column label="老板名称" prop="boss_name"> </el-table-column>
      <el-table-column label="店铺人数" type="count"></el-table-column>
      <!-- <el-table-column label="会员状态" prop="label"> </el-table-column> -->
      <el-table-column label="短信剩余条数" prop="count"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="addMessage(scope.row)"
            >添加短信</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" width="500px">
      <div class="flex">
        <label>添加条数</label>
        <el-input v-model="addNum" type="text"></el-input>
      </div>
      <el-button type="primary" @click="confirm">确定</el-button>
      <el-button @click="close">取消</el-button>
    </el-dialog>
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
      addGym: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    confirm() {
      this.$http
        .get("/index.php/admin/message/messageList", {
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
    // 获取数据
    getData() {
      this.$http
        .get("/index.php/admin/message/messageList", {
          params: { name: this.searchText }
        })
        .then(res => {
          this.tableData = res.data.data;
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
