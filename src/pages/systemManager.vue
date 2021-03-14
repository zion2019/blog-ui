<template>
    <div>
        <el-button>test</el-button>
        <el-container>
          <el-header>Header</el-header>
          <el-main>Main</el-main>
        </el-container>
    </div>
</template>


<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
</script>

