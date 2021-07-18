<template>
  <div style="height: 100%; width: 100%" id="BlogManager">
    <!-- 搜索表单栏 -->
    <div class="tools">
      <div class="tools-form">
        <el-col :span="8" class="grid">
          <el-input  v-model="search.catagoryName" placeholder="所属分类"></el-input>
        </el-col>
         <el-col :span="8" class="grid" style="margin-left: 10%;">
          <el-input v-model="search.title" placeholder="博文名称"></el-input>
        </el-col>
      </div>
      <div class="tools-butten" @click="loadData()">
        <el-col :span="3" class="grid" :gutter="1">
          <el-button type="success" icon="el-icon-search">搜索</el-button>
        </el-col>
      </div>
    </div>

     <!-- 操作栏 -->
    <el-row>
      <el-button type="primary" size="small" @click="toEditBlog()">新增博文</el-button>
    </el-row>

    <!-- 数据列表 -->
    <div class="data-table">
      <el-table :data="bolgList" style="width: 100%; height: 100%" :row-class-name="tableRowClassName">
        <el-table-column prop="id" label="id" v-if="false"> </el-table-column>

        <el-table-column prop="coverImg" label="封面" width="200">
           <template slot-scope="scope">
              <div class="demo-image__preview">
                  <el-image  style="width: 100px; height: 100px; margin-left:10px;" :src= scope.row.coverImg></el-image>
              </div>
        　　</template>
        </el-table-column>
        <el-table-column prop="categoryName" label="所属分类" width="180"> </el-table-column>
        <el-table-column prop="title" label="博文名称" width="180"> </el-table-column>
        <el-table-column prop="createdTime" label="创建时间"> </el-table-column> <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="toEditBlog(scope.row.id)" type="text" size="small" >编辑</el-button >
            <el-button @click="del(scope.row.id)" type="text" size="small" >删除</el-button >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageInfo.current" :page-size="pageInfo.size" layout="total, prev, pager, next" :total="pageInfo.total"> </el-pagination>
    </div>

  </div>
</template>

<script>
import {blogDatas,removeBlog} from '../../utils/server.js'
export default {
  data() {
    return {
        pageInfo:{
          current:1
          ,size:10
          ,total:10 
        },
        search:{
          catagoryName:''
          ,title:''
        },
        bolgList:[],
     };
  },
  created(){
    this.loadData();
  },
  methods: {
    loadData(){
      blogDatas(this.pageInfo.current,this.pageInfo.size,this.search,(res)=>{
        this.pageInfo.total = res.total;
        this.bolgList = res.records;
      })
    },
    handleSizeChange(){
      this.loadData();
    },
    handleCurrentChange(){
      this.loadData();
    },
    toEditBlog(id) {
      this.$router.push({
        path: "/blogEdit",
        query:{'blogId':id}
      })
    },
    del(id) {
      this.$confirm("确认删除？")
        .then((_) => {
          removeBlog(id,(success)=>{
            this.loadData();
          },(failed)=>{
              this.$alert(failed.message);
          })
        }).catch((_) => {});
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