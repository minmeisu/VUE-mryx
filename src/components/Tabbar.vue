<template>
    <div>
        <van-tabbar v-model="active" route fixed>
        <van-tabbar-item name="home" icon="home-o" to='/'>首页</van-tabbar-item>
        <van-tabbar-item name="search" icon="apps-o" to='/home/classify'>分类</van-tabbar-item>
        <van-tabbar-item name="friends" icon="cart-o" to='/home/shopping' :badge="badge" id="car">购物车</van-tabbar-item>
        <van-tabbar-item name="setting" icon="user-circle-o" to='/home/my'>我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      active: 'home',
    };
  },
  computed : {
     ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    badge() {
      const l = Object.values(this.counterMap).reduce((prev, next) => prev + next, 0);
      if (l > 99) {
        return '99+';
      }
      return l;
    },
  }
};
</script>