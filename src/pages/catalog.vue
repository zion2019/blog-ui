<template>
    <zion-window :windowClass="windowClass">
        <div class="catalog-body" >
        <!-- <div style="height:10px"></div> -->
        <div class="catalog-filter" id = "catalog-filter">
            <mySelector class="mySelect" :width="190" :height="40" :datas="catalogs" @labelChangeEvent = "loadPosts"></mySelector>
            <div class="serach"> <div><input placeholder="Search..."></div> <i class="imgthree fa fa-search fa-lg"></i></div>
        </div>
        <!-- 文章列表 -->
        <div class = "catalog-posts" id = "catalog-posts">
            <template v-for="item in posts">
                <post :post="item" :key="item.id"></post>
            </template>
        </div>

            

        </div>
    </zion-window>
</template>
<script>
import {blogDatas,blogCategorySelection} from '../utils/server.js'
import zionWindow from '../components/window.vue'
import mySelector from '../components/my-selector.vue'
import post from '../components/post'
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
            'post':post,
        },
    };
</script>

<style scoped>
    .catalog-posts {
        width: 75%;
        margin: 0 auto;
    }

    /** 小屏 */
    @media screen and (max-width: 1280px) {
        #catalog-filter{
            display: none;
        }
        #catalog-posts{
            width: 100%;
            margin: 0 auto;
        }
    }


    /** 操作栏 start  */
    .serach{
        border: 2px solid;
        border-radius: 5px;
        height: 40px;
        width: 190px;
        /* position: absolute; */
        margin-left: 5px;
        margin-top: 20%;
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
        width: 205px;
        /* position: absolute; */
        box-shadow: 1px 0px 2px #888888;
        margin-top: 0.3%;
    }
    /** 操作栏 end  */
    .catalog-body{
        width: 100%;
        height: 100%;
        border-radius: 10px;
        position: relative;
        display: flex;
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