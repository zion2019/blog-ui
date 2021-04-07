<template>
  <div style="height: 100%; width: 100%" id="CatalogManager">
    <!-- 搜索表单栏 -->
    <div class="tools">
      <div class="tools-form">
        <el-col :span="8" class="grid">
          <el-input placeholder="类别名称"></el-input>
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
      <el-button type="primary" size="small" @click="addCatagoty()">增加</el-button>
    </el-row>

    <!-- 数据列表 -->
    <div class="data-table">
      <el-table
        :data="catagoryList"
        style="width: 100%; height: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column prop="id" label="id" v-if="false"> </el-table-column>
        <el-table-column prop="catagoryName" label="类别名称" width="180">
        </el-table-column>
        <el-table-column prop="catagoryCode" label="类别编码" width="180">
        </el-table-column>
        <el-table-column prop="createdTime" label="创建时间"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button @click="del(scope.$id)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 编辑 -->
      <el-dialog title="编辑分类" :visible.sync="editDialogVisible">
        <el-form ref="form" :model="newCatagory" label-width="80px">
          <el-form-item label="类别名称">
            <el-input v-model="newCatagory.catagoryName"  autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="类别编码">
            <el-input v-model="newCatagory.catagoryCode" autocomplete="off" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveCatagoty">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 新增 -->
      <el-dialog title="新增分类" :visible.sync="saveDialogVisible">
        <el-form ref="form" :model="newCatagory" label-width="80px">
          <el-form-item label="类别名称">
            <el-input v-model="newCatagory.catagoryName" autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="类别编码">
            <el-input v-model="newCatagory.catagoryCode" autocomplete="off" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="saveDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveCatagoty()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      catagoryList: [
        {
          catagoryCode: "JAVA",
          catagoryName: "JAVA",
          createdTime: "2020-01-01 00:00:00",
        },
        {
          catagoryCode: "WORDPRESS",
          catagoryName: "WORDPRESS",
          createdTime: "2020-01-01 00:00:00",
        },
        {
          catagoryCode: "YUNWEI",
          catagoryName: "运维",
          createdTime: "2020-01-01 00:00:00",
        },
      ],
      editDialogVisible: false,
      saveDialogVisible: false,
      newCatagory: {
        catagoryName: "",
        catagoryCode: "",
      },
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    edit(row) {
      this.newCatagory = {
        catagoryName: row.catagoryName,
        catagoryCode: row.catagoryCode,
      };
      this.editDialogVisible = true;
    },
    saveCatagoty() {
      console.log("保存分类");
    },
    addCatagoty() {
      this.newCatagory = {};
      this.saveDialogVisible = true;
    },
    del(id) {
      this.$confirm("确认删除？")
        .then((_) => {
          this.UsercatagoryList.splice(id, 1);
        })
        .catch((_) => {});
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