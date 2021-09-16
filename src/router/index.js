import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const originalPush = Router.prototype.push
	Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

export default new Router({
	mode:'history',
	scrollBehavior(to, from, savePosition) { // 在点击浏览器的“前进/后退”，或者切换导航的时候触发。
		if (savePosition) {
			return savePosition;
		} else {
            var top;
            if (window.innerWidth >= 700) {
                 top = 676
            } else {
                 top = 267
            }
			return {
				x: 0,
				y: top
			}
		}
	},
	routes: [{
			path: '/',
			component: resolve => require(['../pages/Home.vue'], resolve),
			meta: {
				auth: true
			},
			name: 'Home'
		}, //首页
		{
			path: '/home',
			component: resolve => require(['../pages/Home.vue'], resolve),
			meta: {
				auth: true
			},
			name: 'Home'
		},
		{
			path: '/login',
			component: resolve => require(['../pages/system/Login.vue'], resolve),
			meta: {
				auth: true
			},
			name: 'Login'
		},
		{
			path: '/post/:id',
			component: resolve => require(['../pages/PostDetail.vue'], resolve),
			meta: {
				auth: true
			},
			name: 'post'
		},
		{
			path: '/system',
			component: resolve => require(['../pages/system/SysLayout.vue'], resolve),
			children:[
				{path: '',component: ()=> import('@/pages/system/BlogManager.vue')},
				{path: '/blogManager',component: ()=> import('@/pages/system/BlogManager.vue')},
				{path: '/catalogManager',component: ()=> import('@/pages/system/CatalogManager.vue')},
				{path: '/blogEdit',component: ()=> import('@/pages/system/BlogEdit.vue')},
			],
			name: 'SystemManager'
		}
	]
})
