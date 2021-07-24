<template>
    <div v-bind:class="windowClass" :id="windowClass" >
        <div class="window-tools" v-drag-parent >
            <div id="butten-close" class="butten-close" @click="showCatalog()"></div>
            <div id="butten-max" class="butten-max"></div>
            <div id="butten-min" class="butten-min"></div>
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
    height: 30%;
    width: 40%;
    min-width: 750px;
    min-height: 300px;
    top: 20%;
    left: 30%;
    background-color: rgb(250, 244, 230);
    border-radius: 25px;
    border: 3px solid;
    position: absolute;
}
.window-self .window-tools{
    position: absolute;
    border-bottom: 2px solid;
    height: 10%;
    width: 100%;
}
.window-catalog .blog-container{
    position: absolute;
    top:5.1%;
    /* border: 2px solid; */
    height: 94%;
    width: 100%;
    border-radius: 0px 0px 25px 25px;
}
/*  self 样式 end  */
/*  catalog 样式 start  */
.window-catalog{
    height: 90%;
    width: 70%;
    top: 10%;
    left: 23%;
    background-color: rgb(250, 244, 230);
    border-radius: 25px;
    border: 3px solid;
    position: absolute;
    max-width: 1000px;
    max-height: 800px;
}
.window-catalog .window-tools{
    position: absolute;
    border-bottom: 2px solid;
    height: 5%;
    width: 100%;
}
.window-self .blog-container{
    position: absolute;
    top: 10.5%;
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

/** 小于1920  */
@media screen and (max-width: 1800px) {
    #window-self {
        top: 20%;
        left: 22%;
    }

    #window-catalog {
        top: 7%;
        left: 12%;
    }
}

/* 手机端样式 */
@media screen and (max-width: 400px) {
    #window-self {
        width: 90%;
        height: 300px;
        min-width: 0;
        min-height: 0;
        top: 20%;
        left: 5%;
    }

    #butten-close {
        left: 2%;
    }
    #butten-max {
        left: 10%;
    }
    #butten-min {
        left: 19%;
    }

    .unit-menu {
        display: none;
    }
}

</style>