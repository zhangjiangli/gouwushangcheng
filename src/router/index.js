// 路由配置
import Vue from 'vue'
import VueRouter from 'vue-router' // 这是基于vue的一个插件

import Login from '../component/login/Login.vue'
import Admin from '../component/admin/Admin.vue'

// 商品管理模块相关组件
import GoodsList from '../component/admin/goods/list/List.vue'
import GoodsDetail from '../component/admin/goods/detail/Detail.vue'
import GoodsComment from '../component/admin/goods/comment/Comment.vue'

Vue.use(VueRouter)

// 购物车页面路由配置
const goods = [
    //注意：子路由不加/
    { name: 'goodsList', path: 'goods/list', component: GoodsList }, // 子路由path不加/自动拼接父路由path
    { name: 'goodsDetail', path: 'goods/detail/:id', component: GoodsDetail }, // 子路由path不加/自动拼接父路由path
    { name: 'goodsComment', path: 'goods/comment', component: GoodsComment } // 子路由path不加/自动拼接父路由path
]
// 导出路由实例 
export default new VueRouter({
    routes: [
        //登录
        { name: 'login', path: '/login', component: Login },
        //后台管理 将子路由存在一个常量中 const--ES6的写法
        { name: 'admin', path: '/admin', component: Admin, children: [...goods] }
    ]
})

