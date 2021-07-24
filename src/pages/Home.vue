<!-- zion首页 -->
<template>
    <div>
        <div class="top-bar">
            <div id="bar-body" class="bar-body"></div>
            <div id="outline-more" class="outline-more">
                <i class="imgthree fa fa-dedent fa-2x"></i>
            </div>
            <div id="bar-logo" @click="goHome()" class="bar-logo"><img src='../../static/img/logo.jpeg'></div>
            <div id="bar-but-home" @click="goHome()" class="bar-but-home">HOME</div>
        </div>
        <zion-menu ref="cliCatalog"></zion-menu>
        <zion-catalog  v-show="catalogShow"></zion-catalog>
        <zion-self v-show="selfShow"></zion-self>
    </div>
</template>


<script>
import menu from '../components/navigation.vue';
import catalog from './Catalog.vue';
import aboutMe from './AboutMe.vue';

    export default {
        name:'zion',
        data() { //选项 / 数据
            return {
                catalogShow : false,
                selfShow : true
            }
        },
        methods: { //事件处理器
            showCatalog(){
                this.catalogShow = !this.catalogShow;
                if(this.catalogShow){
                    this.selfShow = false;
                }
                this.$refs.cliCatalog.folderOpenClose('catalog');
            },
            showSelf(){
                this.selfShow = !this.selfShow;
                if(this.selfShow){
                    this.catalogShow = false;
                }
                this.$refs.cliCatalog.folderOpenClose('home');
            },
            goHome(){
                this.$router.push({
                    path: '/',
                });
            },
        },
        components: { //定义组件
            'zion-menu':menu,
            'zion-catalog':catalog,
            'zion-self':aboutMe
        },
        created() { //生命周期函数

        }
    }
</script>

<style>

    .background{
        width: 100%;
        height: 100%;
        background: #193, 228, 224;
    }

    /**导航条 */
    .bar-but-home {
        position: absolute;
        left: 55px;
        height: 35px;
        line-height: 35px;
        color: white;
        font-family: fantasy;
        font-size: 25px;
        cursor: pointer;
    }
    .outline-more{
        position: absolute;
        display: none;
    }
    .bar-logo > img {
        height: 100%;
        width: 35px;
    }
    .bar-logo {
        position: absolute;
        left: 5px;
        cursor: pointer;
    }

    .bar-body {
        height: 100%;
        width: 100%;
        opacity: 0.5;
        background-color: black;
        top: 0;
        position: absolute;
    }

    .top-bar {
        height: 35px;
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 999;
    }

    
    

</style>
