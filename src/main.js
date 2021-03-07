// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/css/style.less'
import store from './store'

Vue.config.productionTip = false
Vue.use(ElementUI)

//自定义拖动指令
Vue.directive('drag', function(el) {
  el.style.position = 'absolute'
  el.onmousedown = function(ev) {
    // 用元素距离视窗的X、Y坐标，减去el元素最近的相对定位父元素的left、top值
    var sX = ev.clientX - el.offsetLeft
    var sY = ev.clientY - el.offsetTop
    document.onmousemove = function(ev) {
      var eX = ev.clientX - sX
      var eY = ev.clientY - sY
      // 不断地更新元素的left、top值
      el.style.left = eX + 'px'
      el.style.top = eY + 'px'
    }
    document.onmouseup = function() {
      // 清除mousemove事件
      document.onmousemove = null;
      document.onmouseup = null;
    }
  }
})	

//自定义拖动父元素指令
Vue.directive('drag-parent', function(el) {
  el.style.position = 'absolute'
  el.onmousedown = function(ev) {
    // 用元素距离视窗的X、Y坐标，减去el元素最近的相对定位父元素的left、top值
    var sX = ev.clientX - el.parentNode.offsetLeft
    var sY = ev.clientY - el.parentNode.offsetTop
    document.onmousemove = function(ev) {
      var eX = ev.clientX - sX
      var eY = ev.clientY - sY
      // 不断地更新元素的left、top值
      el.parentNode.style.left = eX + 'px'
      el.parentNode.style.top = eY + 'px'
    }
    document.onmouseup = function() {
      // 清除mousemove事件
      document.onmousemove = null;
      document.onmouseup = null;
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})

