<template>
    <div class="post-detail-body">
        <div class="top-bar">
            <div id="bar-body" class="bar-body"></div>
            <div id="outline-more" class="outline-more" @click="showOutline">
                <i class="imgthree fa fa-dedent fa-2x"></i>
            </div>
            <div id="bar-logo" @click="goHome()" class="bar-logo"><img src='../../static/img/logo.jpeg'></div>
            <div id="bar-but-home" @click="goHome()" class="bar-but-home">HOME</div>
        </div>
        <!-- 博文、目录 -->
        <div id="main" class="fix-sidebar">
            <div :class="sidebarClass">
                <div class="sidebar-inner">
                    <div class="online-title">目录</div>
                    <div class="ontline">
                        <outline-tree :treeData="navTree" class="tree">
                            <div slot-scope="{ data, parentData, level }">
                                <div class="node-render-content" @click.stop="jumpToAnchor(data.el)">
                                    {{ data.title }}
                                </div>
                            </div>
                        </outline-tree>
                    </div>
                </div>
            </div>


            <div class="content" id = 'content'>
                <div class="content-title">
                    <span>{{postTitle}}</span>
                    <div class="title-profiles">
                    <div><i class="imgthree fa fa-calendar fa-1x"></i>&nbsp; 2019年12月12日&nbsp; &nbsp; <br/></div>
                    <div><i class="imgthree fa fa-eye fa-1x"></i>&nbsp; 888&nbsp; &nbsp; </div>
                    <div><i class="imgthree fa fa-commenting-o fa-1x"></i>&nbsp;16&nbsp; &nbsp; 
                    
                    </div>
                </div>
                </div>
            
                <div class="content-data" v-html="content" v-outline="{
                        callback: refreshNavTree,
                        selectors: ['h1','h2', 'h3', 'h4'],
                        exceptSelector: '[un-nav]' }"></div>
            </div>

        </div>

        
        
    </div>
    
</template>
<script>
import {blogInfo} from '../utils/server.js'
export default {
    data() {
        return {
            sidebarClass:"sidebar",
            navTree: [],
            postTitle:"",
            content:"",
        };
    },
    created(){
        console.log(this.$route.query.postId);
        blogInfo(this.$route.query.postId
        ,(res)=>{
            console.log(res);
            this.content = res.content;
            this.postTitle = res.title;
        }
        ,(failed) => {
            console.log("接口请求错误");
        }
        )
    },
    methods:{
        refreshNavTree (treeData) {
            this.navTree = treeData
        },
        jumpToAnchor (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
        },
        showOutline(){
            this.sidebarClass = this.sidebarClass == "sidebar open" ? "sidebar":"sidebar open";
        },
        goHome(){
                this.$router.push({
                    path: '/',
                });
        },
    },
    components: { //定义组件
        
    },
};

</script>

<style scoped>
    /** 博文内容 */
    .node-render-content {
        cursor: pointer;
        white-space: nowrap;
        line-height: 1.8;
        text-decoration: underline;
    }

    .title-profiles {
        width: 100%;
        height: 5%;
        display: flex;
        /* margin-left: 2%; */
        font-size: 15px;
        color: #909399;
    }
    
    .content-title {
        border-bottom: 2px solid;
        text-align: left;
        font-size: 20px;
        height: 60px;
        font-weight: bold;
        padding-top: 5px;
        padding-left: 20px;
    }

    .online-title {
        border-bottom: 2px solid;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        height: 60px;
        padding-top: 5px;
    }

    .content-data{
        padding-left: 20px;
        padding-top: 20px;
        min-height: 1000px;
    }

    .ontline {
        padding-top: 20px;
        padding-left: 35px;
        height: 60px;
    }

    #main {
        position: relative;
        z-index: 1;
        padding: 0 10px 0 10px;
        overflow-x: hidden;
        margin-top: 35px;
    }

    /* 目录 */
    #main.fix-sidebar {
        position: static;
    }

    #main.fix-sidebar .sidebar {
        position: fixed;
    }

    .sidebar .sidebar-inner {
        width: 96%;
        height: 100%;
        margin-top: 35px;
        margin-left: 5px;
        /* padding: 35px 0px 60px 20px; */
        /* border-radius: 20px; */
        background-color: white;
        /* border: 2px solid; */
    }

    .sidebar {
        position: absolute;
        z-index: 10;
        top: 0%;
        left: 0;
        width: 280px;
        bottom: 0;
        overflow-x: hidden;
        /* overflow-y: auto; */
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: none;
    }
    .content {
        position: relative;
        /* padding: 35px 0; */
        max-width: 1000px;
        margin: 0 300px 0 auto;
        /* padding-left: 50px; */
        background-color: white;
        /* border-radius: 25px;
        border: 2px solid; */
        box-shadow: 0 0 10px rgb(0 0 0 / 20%);
    }

    /* 宽度小于 1400px 时 */
    @media screen and (max-width: 1400px) {
        #content {
            margin-right: 0;
        }
    }

    /* 宽度小于1000px时，目录栏缩小 */
    @media screen and (max-width: 1280px) {

        .sidebar {
            position: fixed;
            height: 100%;
            top: 0;
            left: 0;
            box-shadow: 0 0 10px rgb(0 0 0 / 20%);
            transition: all 0.4s cubic-bezier(0.4, 0, 0, 1);
            -webkit-transform: translate(-280px, 0);
            transform: translate(-280px, 0);
        }

        .sidebar.open {
            -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
        }

        #outline-more{
            position: absolute;
            display: block;
            left: 10%;
            cursor: pointer;
        }

        .imgthree {
            color: white;
            margin-top: 3px;
        }
        
        #bar-logo {
            position: absolute;
            left: 20%;
            cursor: pointer;
        }

        #bar-but-home[data-v-af546162] {
            display: none;
        }
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

    /* 滚动条样式 */
    ::-webkit-scrollbar-track {
        background-color: rgb(250, 244, 230);
        display: none;
    }
    ::-webkit-scrollbar {
        width: 4px;
        height: 18%;
        background-color: black;
        display: none;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 50px;
        background-color: #555;
        display: none;
    }
</style>