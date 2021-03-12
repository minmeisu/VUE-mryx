import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入下载的dpr适配插件
import 'lib-flexible';
// 引入vant库
import './plugins/vant.js'
// 全局里边引入请求数据的接口
import api from '../src/api';

// 在vue里边的原型上添加api
Vue.prototype.$api = api;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
