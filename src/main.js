import Vue from 'vue'
import App from './App.vue'
// VUEX组件
import store from './store'
// 路由组件
import router from "@/router";
// antdesign-vue组件
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
// markdown组件
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
//工具类挂载
import {utils}  from './util/utils';
Vue.prototype.$utils = utils;
import axios from './config/axios'
Vue.prototype.$request = axios;

//代码高亮
// import Highlight from './util/highlight'
// Vue.use(Highlight)


Vue.config.productionTip = false
Vue.use(Antd);
Vue.use(mavonEditor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
