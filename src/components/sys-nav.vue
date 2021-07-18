<template>
  <el-aside width="200px">
    <el-row class="tac">
      <el-col>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="1" @click="toPath('/blogManager')">
            <i class="el-icon-s-order"></i>
            <span slot="title">博文管理</span>
          </el-menu-item>

          <el-menu-item index="2" @click="toPath('/catalogManager')">
            <i class="el-icon-menu"></i>
            <span slot="title">类别管理</span>
          </el-menu-item>

          <el-menu-item index="3" @click="toPath('message')">
            <i class="el-icon-s-order"></i>
            <span slot="title">留言管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
</template>

<script>
var $this = {};
export default {
  data() {
    return {};
  },
  beforeCreate() {
    $this = this;
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toPath (path) {
      this.$router.push({
        path: path
      })
    },
  }
};
</script>


<style scoped>
.el-row{
  height: 100%;
}

.el-menu{
  border-right:none;
}
.el-aside{
  border-right: 1px solid #f5f1f1;
}
</style>
