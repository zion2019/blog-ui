<template>
  <div style="height: 100%; width: 100%" id="CatalogManager">
    <!-- 搜索表单栏 -->
    <div class="tools">
      <div class="tools-form">
        <el-col :span="8" class="grid">
          <el-input v-model="search.name" placeholder="类别名称"></el-input>
        </el-col>
      </div>
      <div class="tools-butten">
        <el-col :span="3" class="grid" :gutter="1">
          <el-button type="success" icon="el-icon-search" @click="loadData()">搜索</el-button>
        </el-col>
      </div>
    </div>

    <!-- 操作栏 -->
    <el-row>
      <el-button type="primary" size="small" @click="toAdd()">增加</el-button>
    </el-row>

    <!-- 数据列表 -->
    <div class="data-table">
      <el-table
        :data="catagoryList"
        style="width: 100%; height: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column prop="id" label="id" v-if="false"> </el-table-column>
        <el-table-column prop="name" label="类别名称" width="180">
        </el-table-column>
        <el-table-column prop="code" label="类别编码" width="180">
        </el-table-column>
        <el-table-column prop="createdTime" label="创建时间"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="toEdit(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button @click="del(scope.row.id)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageInfo.current" :page-size="pageInfo.size" layout="total, prev, pager, next" :total="pageInfo.total"> </el-pagination>

      <!-- 编辑 -->
      <el-dialog title="编辑分类" :visible.sync="editDialogVisible">
        <el-form ref="form" :model="catagory" label-width="80px">
          <el-form-item label="类别名称">
            <el-input v-model="catagory.name"  autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="类别编码">
            <el-input v-model="catagory.code" autocomplete="off" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveOrUpdate()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 新增 -->
      <el-dialog title="新增分类" :visible.sync="saveDialogVisible">
        <el-form ref="form" :model="catagory" label-width="80px">
          <el-form-item label="类别名称">
            <el-input v-model="catagory.name" autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="类别编码">
            <el-input v-model="catagory.code" autocomplete="off" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="saveDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveOrUpdate()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {blogCategoryData,saveOrEditCategory,removeCategory} from '../../utils/server.js'
export default {
  data() {
    return {
      pageInfo:{
        current:1
        ,size:10
        ,total:10 
      }
      ,search:{
        name:""
      }
      ,catagoryList: []
      ,editDialogVisible: false
      ,saveDialogVisible: false
      ,catagory: {
        id:"",
        name: "",
        code: "",
      },
    };
  },
  created(){
    this.loadData();
  }
  ,methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    loadData(){
      blogCategoryData(this.pageInfo.current,this.pageInfo.size,this.search,(data)=>{
        this.pageInfo.total = data.total;
        this.catagoryList = data.records;
      });
    },
    toAdd() {
      this.catagory = {};
      this.saveDialogVisible = true;
    },
    toEdit(row) {
      this.catagory = {
        id:row.id,
        name: row.name,
        code: row.code,
      };
      this.editDialogVisible = true;
    },
    saveOrUpdate() {
      saveOrEditCategory(this.catagory,(res)=>{
        if(res.data){
          this.editDialogVisible = false;
          this.saveDialogVisible = false;
          this.loadData();
        }else{
          this.$alert(res.message);
        }
      });
    },
    del(id) {
      this.$confirm("确认删除？")
        .then((_) => {
          removeCategory(id,(success)=>{
            this.loadData();
          },(failed)=>{
              this.$alert(failed.message);
          })
        })
        .catch((_) => {});
    },
    handleSizeChange(){
      this.loadData();
    },
    handleCurrentChange(){
      this.loadData();
    },
  },
};
</script>

<style>
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