import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

// THREE.JS开发指南首页内容
import index from '@/view/book/index'
import lifeCycle from '@/view/lifeCycle/index'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'HelloWorld',
			component: HelloWorld
		},
		{
			path: '/index',
			name: 'three.js首页',
			component: index
		},
		{
			path:'/lifeCycle',
			name:'生命周期管理',
			component:lifeCycle
		}
	]
})
