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
                <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :headers="headers"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="blog.coverImg" :src="blog.coverImg" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <!-- <el-input v-model="blog.coverImg"></el-input> -->
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
import {blogCategorySelection,saveEditBlog,blogInfo,upload} from '../../utils/server.js'

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
        uploadUrl:'',
        headers:{}
    };
  },
  created(){
    // 上传文件地址
    this.uploadUrl = process.env.BACKEND_URL+'blog/file/upload/';
    // headers
    var user = JSON.parse(sessionStorage.getItem('user'));
    if(user != undefined && user != null){
      let token = user.token_type+' '+user.access_token;
      this.headers = {'Authorization':token}
    }

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
    handleAvatarSuccess(res, file) {
        if(file.response.code === '0000'){
            this.blog.coverImg = process.env.PIC_URL+file.response.data.fileUrl;
        }else{
            console.log(file);
        }
        // upload(file.raw,(success)=>{
        //     this.blog.coverImg = success;
        // },(failed) => {
        //     console.log(failed);
        // });
    },
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
    }
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
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>