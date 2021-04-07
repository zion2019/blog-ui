<template>
    <div v-bind:class="windowClass" >
        <div class="window-tools" v-drag-parent >
            <div class="butten-close" @click="showCatalog()"></div>
            <div class="butten-max"></div>
            <div class="butten-min"></div>
        </div>

        <div class="blog-container">
            <!-- 窗体内容 -->
            <slot></slot>
        </div>
    </div>
    
</template>

<script>
    export default {
        props:['windowClass'],
        data() {
            return {
            };
        },
        methods:{
          showCatalog(){
              if(this.windowClass == 'window-self'){
                this.$parent.$parent.showSelf();
              }else if(this.windowClass == 'window-catalog'){
                this.$parent.$parent.showCatalog();
              }
               
          },
        }
    };
</script>

<style  scoped>
/*  self 样式 start  */
.window-self{
    height: 50%;
    width: 70%;
    top: 20%;
    left: 10%;
    background-color: rgb(250, 244, 230);
    border-radius: 25px;
    border: 3px solid;
    position: absolute;
}
.window-self .window-tools{
    position: absolute;
    border-radius: 20px 20px 0px 0px;
    border: 2px solid;
    height: 10%;
    width: 100%;
}
.window-catalog .blog-container{
    position: absolute;
    top:5.5%;
    border: 2px solid;
    height: 94%;
    width: 100%;
    border-radius: 0px 0px 25px 25px;
}
/*  self 样式 end  */
/*  catalog 样式 start  */
.window-catalog{
    height: 90%;
    width: 70%;
    top: 5%;
    left: 10%;
    background-color: rgb(250, 244, 230);
    border-radius: 25px;
    border: 3px solid;
    position: absolute;
}
.window-catalog .window-tools{
    position: absolute;
    border-radius: 20px 20px 0px 0px;
    border: 2px solid;
    height: 5%;
    width: 100%;
}
.window-self .blog-container{
    position: absolute;
    top: 10.5%;
    border: 2px solid;
    height: 89%;
    width: 100%;
    border-radius: 0px 0px 25px 25px;
}
/*  catalog 样式 end  */
.butten-close{
    position: absolute;
    background-color: rgb(238, 106, 94);
    height: 15px;
    width: 15px;
    left: 2%;
    top: 20%;
    border-radius: 60px;
    border: 2px solid;
    cursor: pointer;/*鼠标变成手指样式*/
    transition: all 0.1s;/*所有属性变化在0.6秒内执行动画*/
}
.butten-close:hover{
	transform: scale(1.2);/*鼠标放上之后元素变成1.4倍大小*/
}
.butten-max{
    position: absolute;
    background-color: rgb(245, 193, 79);
    height: 15px;
    width: 15px;
    left: 5%;
    top: 20%;
    border-radius: 60px;
    border: 2px solid;
}
.butten-min{
    position: absolute;
    background-color: rgb(98, 200, 84);
    height: 15px;
    width: 15px;
    left: 8%;
    top: 20%;
    border-radius: 60px;
    border: 2px solid;
}

</style>