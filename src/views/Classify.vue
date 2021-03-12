<template>
    <div>
        <router-link to="/search">
             <div class="search-wrapper">
            <van-icon name="search" />
            <div class="search-text">一个榴莲只要9.9元</div>
        </div>
        </router-link>
       
        <one-tabbar></one-tabbar>
        <!-- 这里因为是数据请求回来部分，所以在store里边进行该数据的定义 -->
        <template v-if='showContent'>    
            <slider-bar></slider-bar>
        </template>
        <!-- 在这里有一个用户体验，就是数据未加载回来的时候有个正在加载的图标，使用vant里边的 -->
        <van-loading v-else/>
        <list></list>

    </div>
    
</template>

<script>
import { mapState } from 'vuex';
// 引入一级导航
import OneTabbar from '../components/OneTabbar.vue';
// 引入侧边栏
import SliderBar from '../components/SlideBar.vue';
// 引入中间的列表内容
import List from '../components/List.vue';

export default {
    name : 'classify',
    components : {
        OneTabbar,
        SliderBar,
        List,
    },
    //store里边最终的数据请求回来放在computed里边
    computed : {
        ...mapState({
            showContent : (state) => state.showContent,
        })
    } 
    
}
</script>

<style lang='less'>
    .search-wrapper{
        width: 355px;
        height: 33px;
        line-height: 33px;
        background: #eee;
        text-align: center;
        border-radius: 5px;
        margin: 22px auto 0 auto;
        font-size: 14px;
        color: #a1a1a1;
        >*{
            display: inline-block;
            vertical-align: middle;
        }
    }
</style>