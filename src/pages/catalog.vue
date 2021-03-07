<template>
    <zion-window :windowClass="windowClass">
        <div class="catalog-body" >
            <div class="catalog-bar">
                <button class="catalog-butten">JAVA</button>
                <button class="catalog-butten">WORDPRESS</button>
                <button class="catalog-butten">运维</button>
            </div>
            <div class="catalog-content">
                <div class="card-one">
                    <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3069058608,2121953491&fm=15&gp=0.jpg">
                    <div class="card-descript">
                        <span title="123">程序员的自我修养程序员的自我修养程序员的自我修养程序员的自我修养程序员的自我修养程序员的自我修养程序员的自我修养</span>
                    </div>
                </div>
                <div class="card-one">

                </div>

                <div class="card-one">

                </div>
                <div class="card-three">

                </div>
            </div>
        </div>
    </zion-window>
</template>
<script>
import window from '../components/window.vue'
    export default {
        data() {
            return {
                windowClass: "window-catalog",
            };
        },
        methods:{
          
        },
        components: { //定义组件
            'zion-window':window
        },
    };
</script>

<style>
    .catalog-body{
        /* border: 1px solid; */
        width: 97%;
        height: 97%;
        margin: 6px auto;
        border-radius: 10px;
    }
    .catalog-bar{
        height: 8%;
        border: 1px solid;
        border-radius: 10px;
        box-shadow: 0 1px 2px 1px #000
    }
    .catalog-butten{
        margin-left: 10%;
        width: 20%;
        height: 80%;
        background-color: rgb(250, 244, 230);
        border: 0px;
        font-size: 27px;
        font-family: 微软雅黑;
        cursor: pointer;/*鼠标变成手指样式*/
        transition: all 0.1s;/*所有属性变化在0.6秒内执行动画*/
    }
    .catalog-butten:hover{
	    transform: scale(1.03);/*鼠标放上之后元素变成1.4倍大小*/
    }
    .catalog-content{
        width: 100%;
        height: 92%;
        overflow-y:auto;
    }

    .catalog-content > div > img {
        border-radius: 10px;
        width: 100%;
        height: 80%;
    }

    /* 滚动条样式 */
    .catalog-content::-webkit-scrollbar-track {
        background-color: rgb(250, 244, 230);
    }
    .catalog-content::-webkit-scrollbar {
        width: 2px;
        height: 18%;
        background-color: black;
    }
    .catalog-content::-webkit-scrollbar-thumb {
        border-radius: 50px;
        background-color: #555;
    }
    .card-one{
        float: left;
        margin-right: 3%;
        margin-top: 2%;
        width: 30%;
        height: 50%;
        border: 1px solid;
        border-radius: 10px;
        box-shadow: 0 1px 1px 1px #000;
    }

    .card-three{
        float: left;
        margin-right: 3%;
        margin-top: 2%;
        width: 97%;
        height: 100%;
        border: 1px solid;
        border-radius: 10px;
        box-shadow: 0 1px 1px 1px #000;
    }
    .card-descript {
        padding: 14px;
    }

    .card-descript > span{
        white-space:nowrap;/*强制单行显示*/
        text-overflow:ellipsis;/*超出部分省略号表示*/
        overflow:hidden;/*超出部分隐藏*/
        width: 100%;/*设置显示的最大宽度*/
        display:inline-block;
        font-family: '微软雅黑';
        font-size: 15px;
    }
        

</style>