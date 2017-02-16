// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Seller from 'components/seller/seller'
import Goods from 'components/goods/goods'
import Ratings from 'components/ratings/ratings' 
import VueResource from 'vue-resource'

import 'common/stylus/index.styl'
// 导入全局样式
// 报错在icon.styl里面找到字体的路径

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// })
Vue.use(VueRouter)
Vue.use(VueResource)

let routes=[
	{path:'/seller',component:Seller},
	{path:'/goods',component:Goods},
	{path:'/ratings',component:Ratings}
]

let router = new VueRouter({
	// linkActiveClass:'active',
	routes
}) 

let app = new Vue({
	router,
	...App
}).$mount('#app')
//router.push('/goods')
//Cannot read property 'children' of undefined 这哥错是因为 评论组建没有渲染完毕 就直接条到goods