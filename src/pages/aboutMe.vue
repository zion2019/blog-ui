<template>
    <zion-window :windowClass="windowClass">
    
        <div class="aboutMe">
            <img src="../../static/img/logo.jpeg"/>
            <div class="say">
                Hey,我是Zion！JAVA、PHP后端码农一枚。
                <br/>
                学习&nbsp;•&nbsp;生活&nbsp;•&nbsp;分享
                <br/>
                各位大佬请戳<a @click="showCatalog()" href="javascript:void(0);">Blog文件夹</a>了解~
            </div>
            <div class="bar">
                <i @click="href(weixinQrCode)" class="imgthree fa fa-weixin fa-1x"></i>
                <a href="mailto:for_ly@foxmail.com"> <i class=" fa fa-envelope fa-1x"></i></a>
                <i @click="href('https://github.com/zion2019')" class="imgthree fa fa-github fa-lg"></i>
            </div>

        </div>
    </zion-window>
</template>

<script>
import zionWindow from '../components/window.vue'
export default {
    data() {
        return {
            windowClass: "window-self",
            weixinQrCode:process.env.PIC_URL+"2021/9/zion-weixin.jpg",
        };
    },
    methods:{
        href(url){
            window.open(url, "_blank");
        },
        showCatalog(){
            this.$parent.showCatalog();
        },
    },
    components: { //定义组件
        'zion-window':zionWindow
    },
};

</script>
<style scoped>
    .aboutMe .say {
        margin: auto;
        width: 400px;
        font-family: fantasy;
        font-size: 19px;
    }
    .aboutMe .bar {
        display: flex;
        width: 300px;
        height: 30px;
        margin-left: 50%;
        /* background-color: red; */
    }

    .aboutMe .bar {
        display: flex;
        width: 300px;
        height: 30px;
        margin-left: 65%;
        margin-top: 10px;
    }

    .aboutMe .bar .imgthree {
        margin-left: 10px;
        margin-top: 4px;
        cursor: pointer;
    }

    .aboutMe > img {
        width: 70px;
        height: 70px;
        margin: 30px 0 0 45%;
        border-radius: 25%;
    }
    .bar > a {
        margin-left: 10px;
        cursor: pointer;
    }
</style>