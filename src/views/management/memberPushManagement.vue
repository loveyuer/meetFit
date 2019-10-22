<template>
  <div class="wrap">
    <div class="search-wrap">
      <el-input
        v-model="searchText"
        placeholder="搜索推送文章名称"
        v-if="!filter"
      ></el-input>
      <div class="filter" v-if="filter">
        <el-form>
          <el-form-item label="推送文章名称">
            <el-input v-model="filterText"></el-input>
          </el-form-item>
          <el-form-item label="作者名称">
            <el-input v-model="filterAuthor"></el-input>
          </el-form-item>
          <el-form-item label="创作日期">
            <el-date-picker
              v-model="dateCreate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="发布日期">
            <el-date-picker
              v-model="datePublish"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清空</el-button>
        </el-form>
      </div>
      <span @click="filter = !filter">筛选</span>
    </div>
    <el-table>
      <el-table-column label="序号" prop="num"></el-table-column>
      <el-table-column label="文章姓名" prop="article"></el-table-column>
      <el-table-column label="作者姓名" prop="author"></el-table-column>
      <el-table-column label="创作日期" prop="createDate"></el-table-column>
      <el-table-column label="发布日期" prop="publishDate"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="update(scope.row)">修改</el-button>
          <el-button @click="del(scope.row)">删除</el-button>
          <el-button @click="publish(scope.row)">发布</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      filter: false,
      searchText: ""
    };
  }
};
</script>
<style lang="scss" scoped></style>
