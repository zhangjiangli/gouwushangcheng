// 导入Vue库
import Vue from 'vue';

// 导入根组件
import App from './component/App.vue';
import VueRouter from './router'

import ElementUI from 'element-ui'

import VueQuillEditor from 'vue-quill-editor'

import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css'

import axios from 'axios'
import api, {domain} from './js/api'

import './less/index.less'


Vue.use(ElementUI)
Vue.use(VueQuillEditor)

//设置默认域名
axios.defaults.baseURL=domain;
// 因为我们调用的接口跨域了, 默认情况下接口给我们设置cookie无效, 为了让它有效, 我们必须添加此配置
axios.defaults.withCredentials=true;
//添加到原型上
Vue.prototype.$http=axios;
Vue.prototype.$api=api;

// 渲染根组件到占位标签上
new Vue({
    el: '#app',
    render: createElement => createElement(App),
    router:VueRouter

});