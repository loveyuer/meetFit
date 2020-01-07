<template>
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
    <el-button @click="$router.push('/home/memberManagement')">取消</el-button>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      msgForm: {}
    };
  },
  methods: {
    submit() {
      //   const url = this.type === "add" ? "" : "/admin/Customer/customerUpdate";
      const url = "/admin/Customer/customerUpdate";
      this.$http.get(url, { params: this.msgForm }).then(res => {
        if (res.code === "1") {
          this.$message(res.msg);
          this.$router.push("/home/memberManagement");
        }
      });
    }
  }
};
</script>
