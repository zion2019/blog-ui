<template>
  <div id="app">
      <keep-alive :include="['AboutMe', 'Catalog','Home']">
          <router-view></router-view>
      </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
/*reset*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
 caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  // font: inherit;
}
html {
	  height:100%;
    margin:0 auto;
    padding:0;
}
body{
      /* 网格样式 zion */
      /* height: 100vh;
      background: linear-gradient(to right,rgb(250, 244, 230) 1px,transparent 1px),linear-gradient(to bottom,rgb(250, 244, 230) 1px,transparent 1px);
      background-repeat: repeat;
      background-size: 40px 40px;
      background-color: rgb(193, 228, 224); */
      /* 底图 */
      width: 100%;
      height: 100%;
      background:url(/static/img/bg-content.jpg) no-repeat;
      background-attachment: fixed;
      background-size: 100%;
      min-height: 100vh;
      background-repeat: repeat;
      width: 100%;
      overflow-x: hidden;
  }

#app {
  height: 100%;
  // overflow: hidden;
}

.tools {
  background: #fff;
  margin-bottom: 10px;
  /deep/.el-card__body {
    padding: 10px 0;
  }
  .formBox {
    border: 1px solid #ece9e9;
    padding-bottom: 10px;
    border-radius: 6px;
  }
  // 搜索按钮
  .grid-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #ece9e9;
    .fontColor {
      color: #6a6b6d;
      margin-left: 20px;
    }
    .bthPosition {
      display: flex;
      justify-content: space-around;
      align-items: center;
      button {
        margin: 0 3px;
      }
      margin-right: 10px;
    }
  }
  // 搜索表单区域
  .formStyle {
    margin-top: 10px;
    .formItem {
      display:flex;
      flex-wrap: wrap;
      .el-form-item {
        margin: 5px 0!important;
        label {
          font-weight: 600;
          color: #6a6b6d;
          font-size: 13px;
        }
        .el-form-item__content{
          .el-input{
            width: 180px;
          }
          .el-select {
            width: 180px;
          }
          .el-checkbox-group {
            width: 180px;
          }
        }
      }
    }
  }
  // 下拉按钮
  .showStatus {
    text-align: center;
    color: #5e7fb3;
    cursor: pointer;
    font-size: 12px;
  }
}
</style>
