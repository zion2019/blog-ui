<template>
  <div class="zion-menu">
    <div class="unit-menu" v-drag @click="showSelf()">
      <img class="menu-icon" src="static/img/butten.png" />
      <span class="menu-font">Home</span>
    </div>
    <div class="unit-menu" style="top:60%;" v-drag  @click="showCatalog()">
      <img class="menu-icon" src="static/img/butten.png" />
      <span class="menu-font">Blog</span>
    </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {
            message: "some message",
            };
        },
        methods:{
          showCatalog(){
            this.$parent.showCatalog();
          },
          showSelf(){
            this.$parent.showSelf();
          }
        }
    };
</script>

<style>
/*********头部导航栏********/
.zion-menu {
  position: absolute;
  width: 50px;
  height: 200px;
  top: 20%;
  left: 93%;
}
.unit-menu {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 10%;
  cursor: pointer;/*鼠标变成手指样式*/
  transition: all 0.1s;/*所有属性变化在0.1秒内执行动画*/
}
.unit-menu:hover{
	transform: scale(1.2);/*鼠标放上之后元素变成1.4倍大小*/
}
.menu-icon {
  width: 50px;
  height: 50px;
}
.menu-font {
  padding-left: 8px;
}
</style>