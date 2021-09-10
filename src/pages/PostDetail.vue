<template>
    <div class="post-detail-body">
        <topBar @showLeft = "showLeft"/>
        <div id = "articles" class="articles">
            <!-- 文章目录 -->
            <div id="article-menus" :class="sidebarClass">
                <menu-tree :menus="menus" child-label="child"></menu-tree>
            </div>
            <main id =  "article-content" class="article-content">
                <div class="content-title">
                    <span>{{postTitle}}</span>
                    <div class="title-profiles">
                    <div><i class="imgthree fa fa-calendar fa-1x"></i>&nbsp; {{createdTime}}&nbsp; &nbsp; <br/></div>
                </div>
                </div>
                <div class="entry-content" v-html="content"></div>
            </main>
        </div>
    </div>
    
</template>
<script>
import topBar from '../components/top-bar.vue'
import menuTree from '../components/menu-tree.vue'
import sectionTitle from '@/components/section-title'
import {blogInfo} from '../utils/server.js' 
import prismjs from '../../static/prism/prism.js'
import prismCss from '../../static/prism/prism.css'
export default {
    data() {
        return {
            showDonate: false,
            comments: [],
            menus: [],
            postTitle: "TITLE",
            sidebarClass: 'article-menus',
            content: "",
            createdTime:"2020-01-01"
        }
    },
    created(){
         blogInfo(this.$route.query.postId).then(res => {
            // this.content = this.replaceHtml(res.content);
            this.content = res.content;
            this.postTitle = res.title;
            this.createdTime = res.createdTime;
            this.$nextTick(() => {
                prismjs.highlightAll();
            });
         }).catch(error => {
            console.log(error);
         });

    },
    components: { //定义组件
        'topBar':topBar,
        'menuTree':menuTree,
        'sectionTitle':sectionTitle
    },
    methods: {
        replaceHtml(htmlContent) {
            let reg=new RegExp("<pre","g"); //创建正则RegExp对象
            let stringObj=htmlContent;
            let newstr=stringObj.replace(reg,`<pre class="line-numbers "`);
            return newstr
        },
        showLeft(){
            this.sidebarClass = this.sidebarClass == "article-menus open" ? "article-menus":"article-menus open";
        },
        fetchH(arr,left,right){
            if (right) {
                return arr.filter(item => item.offsetTop > left && item.offsetTop < right)
            }else {
                return arr.filter(item => item.offsetTop > left)
            }
        },
        // 生成目录
        createMenus(){
            let arr = []
            let idIndex = 0;
            for(let i=6;i>0;i--){
                let temp = []
                let content = document.querySelector(".entry-content");
                // console.log(content);
                let e = content.querySelectorAll(`h${i}`)
                // console.log('hahah',document.querySelector(".entry-content").querySelectorAll(`h1`).length);
                for (let j=0;j<e.length;j++){
                    idIndex ++;
                    e[j].id = 'id'+idIndex;
                    let child = this.fetchH(arr,e[j].offsetTop,(j+1 === e.length)?undefined:e[j+1].offsetTop)
                    temp.push({
                        h: i,
                        title: e[j].innerText,
                        id: e[j].id,
                        // id: i + '@'+ j,
                        offsetTop: e[j].offsetTop,
                        child
                    })
                }
                if (temp.length){
                    arr = temp
                }
            }
            this.menus = arr
        }
    },
    mounted(){
        setTimeout(()=>{ this.createMenus();} ,300);
    },
}
</script>
<style scoped lang="less">
    /** 标题样式 */
    .content-title {
        text-align: left;
        font-size: 30px;
        font-weight: bold;
        padding-top: 5px;
    }
    .title-profiles {
        width: 100%;
        height: 5%;
        display: flex;
        // margin-left: 2%;
        font-size: 15px;
        color: black;
    }
    .imgthree {
        color: black;
        margin-top: 3px;
    }
    .entry-content{
        margin-top: 5px;
    }

    // 底色
    .post-detail-body{
        background:white;
        height: 100%;
        overflow-y: auto;
        width: 100%;
    }
    .articles {
        position: static;
    }
    #articles {
        position: relative;
        z-index: 1;
        padding: 0 60px 30px;
        overflow-x: hidden;
    }
    .article-content {
        position: relative;
        padding: 35px 0;
        max-width: 700px;
        margin: 0 auto;
        padding-left: 50px;
        display: flex;
        flex-direction: column;
    }
    .article-menus {
        position: absolute;
        z-index: 10;
        top: 61px;
        width: 260px;
        padding: 0px 0px 60px 20px;
        box-shadow: 0 2px 5px #888888;
        left: 0;
        bottom: 0;
        overflow-x: hidden;
        overflow-y: auto;
        position: fixed;
        background-color: white;
        /* display: inline-block; */
        // -webkit-overflow-scrolling: touch;
    }

        /* 宽度小于1000px时，目录栏缩小 */
    @media screen and (max-width: 1280px) {
        .article-menus {
            position: absolute;
            z-index: 10;
            top: 61px;
            width: 260px;
            padding: 0px 0px 60px 20px;
            // box-shadow: 0 2px 5px rgb(0 0 0 / 10%);
            left: 0;
            bottom: 0;
            overflow-x: hidden;
            overflow-y: auto;
            position: fixed;
            /* display: inline-block; */
            -webkit-overflow-scrolling: touch;
            // box-shadow: 0 0 10px rgb(0 0 0 / 20%);
            transition: all 0.4s cubic-bezier(0.4, 0, 0, 1);
            -webkit-transform: translate(-280px, 0);
            transform: translate(-280px, 0);
        }

        .article-menus.open {
            -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
        }

        #article-content {
            padding-left:  0;
        }
    }
    
    
</style>

