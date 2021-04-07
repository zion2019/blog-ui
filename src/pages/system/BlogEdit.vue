<template>
  <div>
    <!-- 表单部分 -->
    <div class="baseForm">
        <el-form ref="form" :model="blog" label-width="80px">
            <el-form-item label="博文名称">
                <el-input v-model="blog.name"></el-input>
            </el-form-item>
            <el-form-item label="博文类别">
                <el-select v-model="blog.catagorys" placeholder="请选择">
                    <el-option
                        v-for="item in catagorys"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-form-item>

        </el-form>

        
    </div>
    

    <!-- 富文本编辑 -->
    <div class="editorForm">
        <editor></editor>
    </div>
    
  </div>
</template>
<script>
import Editor from "@/components/editor.vue";
export default {
  components: {
    Editor,
  },
  data() {
    return {
        "catagorys": [
            {
                "value":"1",
                "label":"JAVA"
            },
            {
                "value":"2",
                "label":"WORDPRESS"
            },
            {
                "value":"3",
                "label":"运维"
            },
        ],
      "blog":{
          "name":"",
          "catagorys": [],
      },
    };
  },
};

</script>

<style scoped>
.baseForm {
    padding: 1% 0% 1% 1%;
    width: 25%;
}
</style>