// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/style.less'
import store from './store'
import 'font-awesome/css/font-awesome.min.css';
import outline from 'vue-outline';
Vue.use(outline);

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
  store,
})

//  路由判断登录 根据路由配置文件的参数
// router.beforeEach((from, to, next) => {
//   console.log('进来没？？？');
//   if (to.meta.auth) { // 判断跳转的路由是否需要登录
//       // if (store.state.token) { // vuex.state判断token是否存在
//       //     next() // 已登录
//       // } else {
//       //     next({
//       //         path: '/login',
//       //         query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       //     })
//       // }
//   } else {
//      next()
//   }
// })

