<template>
  <div>
    <!-- 表单部分 -->
    <div class="baseForm">
        <el-form ref="form" :model="blog" label-width="80px">
            <el-table-column v-model="blog.id" label="id" v-if="false"> </el-table-column>
            <el-form-item label="博文名称">
                <el-input v-model="blog.title"></el-input>
            </el-form-item>
            <el-form-item label="博文类别">
                <el-select v-model="blog.categoryId" placeholder="请选择">
                    <el-option
                        v-for="item in catagorys"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="封面图片">
                <el-input v-model="blog.coverImg"></el-input>
            </el-form-item>
            <el-form-item label="封面预览">
                <el-image  style="width: 100px; height: 100px; margin-left:10px;" :src= blog.coverImg></el-image>
            </el-form-item>
            <el-form-item label="样式代码">
                <el-input v-model="blog.styles"></el-input>
            </el-form-item>
            <el-form-item label="封面简介">
                <el-input type="textarea" :rows="5" placeholder="请输入说明" v-model="blog.profile"></el-input>
            </el-form-item>
        </el-form>
    </div>
    
    <!-- 富文本编辑 -->
    <div class="editorForm">
        <editor ref="editorRef" :tinymceHtml = blog.content></editor>
    </div>

    <div class="save-butten" @click="saveOrEdit()">
        <el-button type="success" icon="el-icon-success" >保存</el-button>
    </div>
  </div>
</template>
<script>
import {blogCategorySelection,saveEditBlog,blogInfo} from '../../utils/server.js'

import Editor from "@/components/editor.vue";
export default {
  components: {
    Editor,
  },
  data() {
    return {
        catagorys: [],
        blog:{
            id:"",
            title:"",
            categoryId:"",
            coverImg:"",
            content:"",
            styles:"",
            profile:""
        },
    };
  },
  created(){
     // 博客类别下拉框
    blogCategorySelection((categorys)=>{
        this.catagorys = categorys;
    });

    // 获取博客内容
    if(this.$route.query.blogId != undefined){
        blogInfo(this.$route.query.blogId).then(res => {
            this.blog.title = res.title;
            this.blog.id = res.id;
            this.blog.categoryId = res.categoryId;
            this.blog.content = res.content;
            this.blog.coverImg = res.coverImg;
            this.blog.styles = res.styles;
            this.blog.profile = res.profile;
        }).catch(reject => {
            console.log(reject);
        })
    }
    
  },
  methods: {
    saveOrEdit(){
        this.blog.content = this.$refs.editorRef.sunHtml;
        saveEditBlog(this.blog,(success)=>{
            this.$router.push({path: "/blogManager"});
          },(failed)=>{
              this.$alert(failed.message);
          })
    },
  }
};

</script>

<style scoped>
.baseForm {
    padding: 1% 0% 1% 1%;
    width: 25%;
}
.save-butten {
    margin-left: 94%;
    margin-top: 1%;
}
</style>