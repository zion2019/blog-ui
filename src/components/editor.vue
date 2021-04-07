<template>
  <div class='tinymce'>
    <editor id='tinymce' v-model='sunHtml' @input="inp()" :init='init'></editor>
  </div>
</template>

<script>
import axios from "axios"; // 因为上传图片地址是本地服务器  所以我们需要引入axios当然你也可以用原生ajax或fetch来发请求
import tinymce from "tinymce/tinymce"; // 引入我们下载的tinymce包
import "../../static/tinymce/themes/modern/theme"; //引入theme文件，必须要引入的
import Editor from "@tinymce/tinymce-vue"; // 必须要引官方给我们的配置vue包
// 下方import引入都是文本编辑器中的配置项，这个根据个人需求去引入
import "../../static/tinymce/plugins/image";
import "../../static/tinymce/plugins/link";
import "../../static/tinymce/plugins/code";
import "../../static/tinymce/plugins/table";
import "../../static/tinymce/plugins/lists";
import "../../static/tinymce/plugins/contextmenu";
import "../../static/tinymce/plugins/wordcount";
import "../../static/tinymce/plugins/colorpicker";
import "../../static/tinymce/plugins/textcolor";
export default {
  name: "tinymce",
  // 因为我是在项目中使用的  所以这个时候我是采用了组件传值一系列方法来使用的
  // 当然你可以直接就使用v-model来绑定  （data中直接定义上方的v-model双向绑定值即可）
  props: {
    // 父组件传递过来的值
    tinymceHtml: {
      // 类型我们给其定义为String类型
      type: String,
    },
  },
  watch: {
    // 我们需要定义一个监听器
    tinymceHtml: {
      deep: true, // 深度监听  可加可不加当你传递的是一个对象时，我们需要将深度监听加上
      handler(newVal, oldVal) {
        // 我在这里直接让v-model的值等于this.tinymceHtml父组件传递过来的值了，
        // 当然你等于newVal也可以 这个时候我们就实现了sunHtml双绑值同步于父组件传递的tinymceHtml值
        this.sunHtml = this.tinymceHtml;
      },
    },
  },
  data() {
    return {
      // 定义v-model双向绑定值，然后让其默认等于父组件传递过来的值
      sunHtml: this.tinymceHtml,
      uploadUrl: process.env.UPLOAD_URL, // 自己定义的文件上传到服务器的上传地址
      picUrl: process.env.PIC_URL, // 上传到服务器后读取前缀路径（用于拼接显示使用的）
      // tinymce配置项 着重将下方两个路径换掉就可以了
      init: {
        language_url: "/static/tinymce/zh_CN.js", // 配置中文的路径
        language: "zh_CN",
        skin_url: "/static/tinymce/skins/lightgray", // 配置项的路径
        height: 300,
        plugins:
          "link lists image code table colorpicker textcolor wordcount contextmenu",
        toolbar:
          "bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat",
        branding: false,
        // 图片读取前缀路径
        images_upload_base_path: this.picUrl,
        // 图片本地上传方法  点击上传后执行的事件
        images_upload_handler: (blobInfo, success, failure) => {
          this.handleImgUpload(blobInfo, success, failure);
        },
      },
    };
  },
  created() {
    // 可写可不写  都行
    this.sunHtml = this.tinymceHtml;
  },
  mounted() {
    // 初始化tinymce
    tinymce.init({});
  },
  methods: {
    //子组件向父组件传值事件
    inp() {
      this.$emit("inp", this.sunHtml);
    },
    // 上传本地 图片执行事件
    handleImgUpload(blobInfo, success, failure) {
      let formdata = new FormData();
      // append 方法中的第一个参数就是 我们要上传文件 在后台接收的文件名
      // 这个值要根据后台来定义
      // 第二个参数是我们上传的文件
      formdata.append("file", blobInfo.blob());
      // axios 定义上传方法
      axios({
        method: "post", // post方法
        url: this.uploadUrl, // 请求上传图片服务器的路径
        headers: {
          // 配置headers请求头
          Authorization: localStorage.getItem("logintoken"), // token认证，看后台
          "Content-Type": "application/x-www-form-urlencoded", // 采用表单上传的方式，看后台如何接受
        },
        data: formdata, // 请求数据formdata
      }).then((res) => {
        if (res.data.code != 200) {
          // 上传失败执行此方法，将失败信息填入参数中
          failure("HTTP Error: " + res.msg);
          return;
        }
        // 上传成功之后，将对应完整的图片路径拼接在success的参数中
        success(this.picUrl + res.data.fileUrl);
      });
    },
  },
  components: { Editor },
};
</script>
<style></style>
