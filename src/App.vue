<template>
    <div id="app">
      <!-- 里边有路由进行切换的情况 -->
      <!-- 这里:mode是因为路由切换时带着不同的组件进行切换，也就是进行判断是哪个时进去还是出来 -->
      <transition :name="transitionName" :mode="$router.back ? 'out-in' : 'in-out' ">
          <!-- 下边是用来呈现大的路由也面的-->
          <router-view class="view"></router-view>
      </transition>
      
    </div>
</template>
<script>

export default {
  name : 'app',
  // 这是为了页面刷新之后还会显示里边对应的数据
  created() {
    const counterMap = JSON.parse(localStorage.getItem('goods')) || {};
    this.$store.commit('setCounterMap', counterMap);
  },
  // 数据里边返回的是向左移动路由展示动画
  data () {
    return {
      transitionName: 'slide-left',
    }
  },
  // 进行监听
  watch : {
    $route(to, from) {
       if (to.name === 'classify' && from.name === 'search') {
        this.$router.back = true;
      }
      if (this.$router.back) {
        this.transitionName = 'slide-right';
      } else {
        this.transitionName = 'slide-left';
      }
      this.$router.back = false;
    }
  }
}
</script>

<style >
.view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  transition: all .3s linear;
}
.slide-left-enter {
  transform: translate(100%, 0);
}

.slide-right-leave-to {
  transform: translate(100%, 0);
}

</style>
