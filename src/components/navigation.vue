<template>
  <div class="zion-menu" id = "zion-menu">
    <div class="unit-menu"   @click="showSelf()">
      <i  :class="homeIconClass"></i>
      <!-- <img class="menu-icon" src="static/img/butten.png" /> -->
      <span class="menu-font">HOME</span>
    </div>
    <div class="unit-menu"  style="top:60%;"   @click="showCatalog()">
      <i  :class="blogIconClass"></i>
      <!-- <img class="menu-icon" src="static/img/butten.png" /> -->
      <span class="menu-font">BLOG</span>
    </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {
              closeFolder:"imgthree fa fa-folder-o fa-3x",
              openFolder:"imgthree fa fa-folder-open-o fa-3x",
              homeIconClass:"",
              blogIconClass:"",
            };
        },
        created(){
          this.homeIconClass = this.openFolder;
          this.blogIconClass = this.closeFolder;
        },
        methods:{
          folderOpenClose(type){
            if(type == 'home'){
              this.homeIconClass  = this.homeIconClass == this.openFolder?this.closeFolder:this.openFolder;
              if(this.blogIconClass == this.openFolder){
                this.blogIconClass = this.closeFolder;
              }
            }else{
              this.blogIconClass  = this.blogIconClass == this.openFolder?this.closeFolder:this.openFolder;
              if(this.homeIconClass == this.openFolder){
                this.homeIconClass = this.closeFolder;
              }
            }
          },
          showCatalog(){
            this.$parent.showCatalog();
          },
          showSelf(){
            this.$parent.showSelf();
          }
        }
    };
</script>

<style scoped>


  /* 手机端样式 */
  @media screen and (max-width: 550px) {
      #zion-menu{
        display: none;
      }
  }

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
  z-index: 10;
}

.unit-menu.blogSelect {
  width: 70px;
  width: 70px;
}

.unit-menu.homeSelect {
  width: 70px;
  width: 70px;
}

.unit-menu:hover{
	transform: scale(1.2);/*鼠标放上之后元素变成1.4倍大小*/
}
.menu-icon {
  width: 50px;
  height: 50px;
}

.imgthree {
    /* color: #faf4e6; */
    /* border: 1px solid; */
}

.unit-menu > span {
  /* color: #faf4e6; */
}
</style>