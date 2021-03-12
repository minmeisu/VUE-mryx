import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import classify from '../views/Classify.vue';
import shopping from '../views/Shopping.vue';
import search from '../views/Search.vue';

// 路由进行切换时候
VueRouter.prototype.back = false;
VueRouter.prototype.goBack = function goBack () {
  this.back = true;
  this.go (-1);
}
Vue.use(VueRouter)

const routes = [
  {
    path : '/home',
    component : Home,
    children : [
      {
        path : 'classify',
        name: 'classify',
        component : classify,
      },
      {
        path : 'shopping',
        component : shopping,
      },
      
    ]
  },
  {
    path : '/search',
    name: 'search',
    component : search,
  },
  {
    path : '*',
    redirect: '/home/classify'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
