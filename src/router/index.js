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

let router = new VueRouter({
    routes: [
        //登录
        { name: 'login', path: '/login', component: Login },
        //后台管理 将子路由存在一个常量中 const--ES6的写法
        { name: 'admin', path: '/admin', component: Admin, children: [...goods] }
    ]
})

//前置守卫
router.beforeEach((to, from, next) => {
    //调用后台接口判断是否登录
    Vue.prototype.$http.get(Vue.prototype.$api.islogin).then(res => {
        let isLogin = false;
        //判断是否登录
        if (res.data.code == 'logined') {
            isLogin=true;
        }

        //判断路由
        if (to.name == 'login') {
            if (isLogin) {
                next({name:'admin'});
            }else{
                next();
            }
        } 

        if (to.name != 'login') {
            if (isLogin) {
                next();
            }else{
                confirm('您还未登录，请先登录');
                //// query用来设置url中的查询字符串, 我们这里把用户要访问的页面地址通过query记录下来
                //登录后自动跳转到原地址 to.fullPath表示原来的地址
                next({name:'login',query:{next:to.fullPath}});
            }
        }
    })
});
// 导出路由实例
export default router;