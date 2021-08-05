<template>
    <zion-window :windowClass="windowClass">
        <div class="catalog-body" >
        <!-- <div style="height:10px"></div> -->
        <div class="catalog-filter">
            <mySelector class="mySelect" :width="90" :height="40" :datas="catalogs" @labelChangeEvent = "loadPosts"></mySelector>
            <div class="serach">
                <div><input placeholder="Search..."></div>
                    <i class="imgthree fa fa-search fa-lg"></i>
                </div>
            </div>
            <!-- 时间轴内容 -->
            <div class="timeLine-body">
                <div class="timeLine-item" v-for="post in this.posts" :key="post.id">
                    <!-- 时间轴上的线 -->
                    <div class="timeLine-line"></div>
                    <!-- 时间轴上的点 -->
                    <i class="imgthree fa fa-circle fa-1x"></i>
                    <!-- 指向的线条 -->
                    <div class="timeLine-item-line"></div>
                    <!-- 时间 -->
                    <div class="timeLine-item-date">{{post.createdTime}}</div>
                    <!-- 博文卡片 -->
                    <div class="timeLine-item-card" @click="toBlogDeatil(post.id)">
                        <!-- 预览图片 -->
                        <img :src="post.coverImg">
                        <!-- 文本内容 -->
                        <div class="item-card-content">
                            <div class="card-title">{{post.title}}</div>
                            <div class="card-content-preview">
                                {{post.profile}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </zion-window>
</template>
<script>
import {blogDatas,blogCategorySelection} from '../utils/server.js'
import zionWindow from '../components/window.vue'
import mySelector from '../components/my-selector.vue'
    export default {
        data() {
            return {
                windowClass: "window-catalog",
                posts:[],
                catalogs:[],
                optionId:null,
            };
        },
        created(){
            // 博文分类
            this.loadCategory();
        },
        methods:{
            loadCategory(){
                blogCategorySelection((res)=>{
                    this.catalogs = res;
                })
            },
            loadPosts({ optionId, label }){
                this.optionId = optionId != null?optionId:this.optionId;
                if(this.optionId == null){
                    return;
                }
                var search = {categoryId:this.optionId,title:""};
                blogDatas(1,100,search,(res)=>{
                    this.posts = res.records;
                })
            },
            toBlogDeatil(blogId){
                let routeUrl = this.$router.resolve({ 
                    path:"/post",
                    query: {
                        postId: blogId,
                    }
                });
                window.open(routeUrl.href, '_blank');
            },
        },
        components: { //定义组件
            'zion-window':zionWindow,
            'mySelector':mySelector,
        },
    };
</script>

<style scoped>
    /** 文章列表 start */
    .card-content-preview {
        margin-left: 30px;
        margin-top: 10px;
        font-size: 15px;
        font-family: 微软雅黑;
    }
    .card-title{
        margin-left: 30px;
        font-size: 21px;
        font-family: 微软雅黑;
    }
    .item-card-content {
        height: 100%;
        width: 60%;
        /* background-color: red; */
    }
    .timeLine-item-card > img {
        height: 97%;
        width: 38%;
        margin-top: 3px;
        margin-left: 3px;
        max-width: 250px;
        max-height: 200px;
    }
    .timeLine-item-card {
        cursor: pointer;
        width: 80%;
        height: 80%;
        max-height: 180px;
        top: 30px;
        left: 60px;
        background: #f3d4d1;
        position: absolute;
        display: flex;
    }
    .timeLine-item-date {
        position: absolute;
        left: 50px;
        font-size: 20px;
    }
    .timeLine-item-line {
        position: absolute;
        width: 40px;
        background-color: #000;
        height: 2px;
        left: 1px;
        top: 12px;
    }
    .timeLine-line {
        position: absolute;
        background-color: #000;
        top:15px;
        left: 6px;
        width: 3px;
        height: 100%;
    }
    .timeLine-item .imgthree {
        position: absolute;
        top: 5px
    }
    .timeLine-item {
        height: 40%;
        width: 100%;
        max-height: 230px;
        /* border: 1px solid; */
        position: relative;
    }
    .timeLine-body {
        position: absolute;
        left: 20%;
        top: 3%;
        height: 95%;
        width: 77%;
        overflow-y:scroll;
    }
    /** 文章列表 end */

    /** 操作栏 start  */
    .serach{
        border: 2px solid;
        border-radius: 5px;
        height: 40px;
        width: 90%;
        position: absolute;
        margin-left: 5%;
        margin-top: 40%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        line-height: 40px;
    }
    .serach > div {
        width: 83.5%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .serach > div > input{
        width: 90%;
        height: 100%;
        background-color: rgb(250, 244, 230);
        border: 0px;
        outline-style: none;
        font-size: 15px;
        padding-left: 7%;
    }
    .serach .imgthree {
        width: 10%;
        cursor: pointer;
        line-height: 40px;
    }
    .catalog-filter {
        height: 100%;
        width: 18%;
        position: absolute;
        border-right: 3px solid;
        margin-top: 0.3%;
    }
    /** 操作栏 end  */

    .catalog-body{
        width: 100%;
        height: 100%;
        border-radius: 10px;
        position: relative;
    }  

    /* 滚动条样式 */
    ::-webkit-scrollbar-track {
        background-color: rgb(250, 244, 230);
    }
    ::-webkit-scrollbar {
        width: 4px;
        height: 18%;
        background-color: black;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 50px;
        background-color: #555;
    }

</style>