<template>
  <div style="height: 100%; width: 100%" id="BlogManager">
    <!-- 搜索表单栏 -->
    <div class="tools">
      <div class="tools-form">
        <el-col :span="8" class="grid">
          <el-input placeholder="所属分类"></el-input>
        </el-col>
         <el-col :span="8" class="grid" style="margin-left: 10%;">
          <el-input placeholder="博文名称"></el-input>
        </el-col>
      </div>
      <div class="tools-butten">
        <el-col :span="3" class="grid" :gutter="1">
          <el-button type="success" icon="el-icon-search">搜索</el-button>
        </el-col>
      </div>
    </div>

     <!-- 操作栏 -->
    <el-row>
      <el-button type="primary" size="small" @click="addBlog()">新增博文</el-button>
    </el-row>

    <!-- 数据列表 -->
    <div class="data-table">
      <el-table :data="bolgList" style="width: 100%; height: 100%" :row-class-name="tableRowClassName">
        <el-table-column prop="id" label="id" v-if="false"> </el-table-column>
        <el-table-column prop="catagoryName" label="所属分类" width="180"> </el-table-column>
        <el-table-column prop="bolgName" label="博文名称" width="180"> </el-table-column>
        <el-table-column prop="createdTime" label="创建时间"> </el-table-column> <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small" >编辑</el-button >
            <el-button @click="del(scope.$id)" type="text" size="small" >删除</el-button >
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return { 
        bolgList:[
            {
            "id":"1"
            ,"catagoryName":"JAVA"
            ,"bolgName":"入门到放弃系列1"
            ,"createdTime":"2020-01-01"
            },
            {
            "id":"2"
            ,"catagoryName":"JAVA"
            ,"bolgName":"入门到放弃系列2"
            ,"createdTime":"2020-01-01"
            },
            {
            "id":"3"
            ,"catagoryName":"JAVA"
            ,"bolgName":"入门到放弃系列3"
            ,"createdTime":"2020-01-01"
            },
            
        ]

     };
  },
  methods: {
    addBlog() {
        console.log("跳转新增博文页面");
    },
    edit(row) {
      console.log("跳转编辑页面");
      this.$router.push({
        path: "/blogEdit"
      })
    },
    del(id) {
      this.$confirm("确认删除？")
        .then((_) => {
          this.bolgList.splice(id, 1);
        })
        .catch((_) => {});
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
  }
};
</script>
<style scoped>
    .tools-butten {
        width: 15%;
        height: 91%;
        float: left;
        padding: 5px 0px 0px 5px;
    }
    .tools-form {
        width: 79%;
        height: 90%;
        float: left;
        padding: 5px 0px 0px 5px;
    }
    .tools {
        height: 10%;
    }
</style>