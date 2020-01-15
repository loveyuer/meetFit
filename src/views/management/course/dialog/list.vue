<template>
  <el-dialog title="课程分配" :visible.sync="visible" width="800px">
    <div class="btn-wrapper">
      <el-button type="primary" @click="batchDispatch">批量分配</el-button>
      <el-button @click="visible = false">返回列表</el-button>
    </div>
    <el-table
      :data="coachData"
      tooltip-effect="dark"
      style="width: 100%"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="序号" type="index" width="50"></el-table-column>
      <el-table-column prop="name" label="教练名称" width="120">
      </el-table-column>
      <el-table-column prop="mobile" label="联系方式"></el-table-column>
      <el-table-column prop="time_h" label="注册日期"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span
            @click="dispatch(scope.row.coach_id, scope.row.assign)"
            class="option-btn"
            >{{ scope.row.assign | filter }}</span
          >
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>
export default {
  props: {
    coachData: {
      type: Array,
      default: () => []
    },
    dialogVisible: {
      type: Boolean,
      default: () => false
    },
    courseId: {
      type: Number,
      default: () => 0
    }
  },
  computed: {
    visible: {
      get() {
        return this.dialogVisible;
      },
      set() {
        this.$emit("closeDialog");
      }
    }
  },
  data() {
    return {
      multipleSelection: []
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 分配
    dispatch(id, status) {
      const bind = status === 1 ? 0 : 1;
      this.$http
        .get(
          `admin/Course/courseBindCoach?course_id=${this.courseId}&coach_ids=${id}&bind=${bind}`
        )
        .then(res => {
          if (res.code === "1") {
            this.$message("分配成功！");
            this.$emit("dispatch", this.courseId);
          }
        })
        .catch(e => {
          this.$message(e.msg);
        });
    },
    // 批量分配
    batchDispatch() {
      const ids = [];
      this.multipleSelection.map(item => {
        if (item.assign === 0) {
          ids.push(item.coach_id);
        }
      });
      this.dispatch(ids.join(","), 0);
    }
  },
  filters: {
    filter(val) {
      if (val === 1) {
        return "取消分配";
      } else {
        return "分配";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.btn-wrapper {
  text-align: right;
  margin-bottom: 20px;
  margin-top: -20px;
}
.option-btn {
  cursor: pointer;
  color: #3a8ee6;
}
</style>
