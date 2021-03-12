import Vue from 'vue'
import Vuex from 'vuex'
// 引入请求的接口文件
import api from '../api/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储的数据
    // 侧边栏数据的集合
    sideList : [],
    // 侧边栏数据请求回来之前正在加载的图标
    showContent : false,
    // 中间列表内容请求回来的数据集合
    goodList : [],
    size : 5,
    // 这里的type可能是你自己传进来的或者是数据里边本身就有的
    type : null,
    total : 0,
    // 排序的参数
    sort : ' ',
    // 购物里边的显示数据
    counterMap : {}//里边是id : xx，就是本地存储里边对应的id有几个的意思,我自己把这个设置为对象
    

  },
  mutations: {
    // 设置state里边的数据
    // 处理侧边栏的数据
    setSideList ( state, list) {
      state.sideList = list;
    },
    // 设置正在加载中的数据
    setShowContent (state, boolean) {
      state.showContent = boolean;
    },
    // 设置中间列表内容加载回来的数据
    setGoodList (state, list) {
      // 这里不大懂
      state.goodList = [...state.goodList, ...list];
      // 这里是每个分类加载的数据之后的所有数据长度
      state.total = [...list].length;
    },
    // 点从其他类别里边切换的时候，商品列表的内容得重新清空
    ResetGoodList (state) {
      state.goodList = [];
    },
    // 获取请求数据中的参数type
    setType (state,type) {
      state.type = type;
    },
    // 设置排序的参数
    setsort (state, type) {
      state.sort = type;
    },
    // 拿到购物车上边点击里边显示的数据
    setCounterMap(state, map) {
      state.counterMap = map;
    },
    // 对购物车里边显示的东西做一个本地仓库的存储,进行点击之后对数据的修改
    storageChange (state, { id, value}) {
      if (state.counterMap[id]) {
        if (state.counterMap[id] === 1 && value === -1) {
          Vue.delete(state.counterMap, +id);
          // Vue.set(state.counterMap, id, 0);
          console.log(typeof(id));
          console.log(state)
          console.log(2)
        }else{
          Vue.set(state.counterMap, id, state.counterMap[id] + value);
          // Vue.delete(state.counterMap, +id);
          if (state.counterMap[id] === 0) {
            Vue.delete(state.counterMap, +id);
          }
          console.log(3)
        }
      }else {
        Vue.set(state.counterMap, id, 1);
        console.log(444444)
      }
      localStorage.setItem('goods', JSON.stringify(state.counterMap));
    }
  },
  actions: {
    // 这里进行发送请求，则上边需要引入api里边的接口文件
    // 先获取请求侧边栏数据的函数
    // async getSideList ( { commit }, type ) {
    //   // 然后进行该函数的调用请求数据
    //   const value = await api.getSideList(type);
    //   // 这里进行mutations里边方法的触发,然后[]里边传的是请求回来的数据也就是存放在state里边
    //   commit('setSideList',[value])
    //   // 这里获取到了数据，则可以放进去需要用到数据的组件里边
    //   console.log(value);
    // }
    // 请求侧边栏的数据
    getSideList (context,type) {
      // 这里它返回的是一个promise对象
      return api.getSideList(type).then ( (value) => {
        // 进行触发mutation里边的方法
        context.commit('setSideList', value)
        // 进行设置数据加载回来后那个属性值的变化
        context.commit('setShowContent', true);    
        // context.commit('setsort', 'all')
      })
    },
    // 请求中间列表内容的数据
    // 这里有多个参数，那么它可以放在一个对象的形式进行传参
    async getGoodList ( { commit,state }, options) {
      const type = options.type || state.type;
      const {  page } = options;
      // return api.getGoodsList(type, page, 5, sort).then ( (data) => {
      //   commit('setGoodList', data);
      //   console.log(data)
      // })
      // 将请求回来的数据直接解构
      const { list } = await api.getGoodsList(type, page, state.size, state.sort);
      commit('setGoodList', list);
      commit('setType', type);
      // // 这里边是你请求回来当前数据里边的total
      // if (total > state.goodList.length) {
      //   return true;
      // }
      // return false;
      // 这里不用进行触发该函数清空，而是在特定的条件下再进行触发清空数组。
      // commit('ResetGoodList', )
      console.log(type)
    }
   

  },
  modules: {
  }
})
