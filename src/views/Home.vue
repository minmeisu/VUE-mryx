<template>
    <div>
        <router-view></router-view>
        <tabbar/>
    </div>
</template>
<script>
// 这里引入下边的导航条的页面
import Tabbar from '../components/Tabbar.vue';
export default {
    name : 'Home',
    components : {
        Tabbar
    }
}
</script>