<template>
    <div class="history">
        <h4>历史记录：</h4>
        <div class="his-item" v-for="item in searchList" :key="item.time" @click="search(item.value)">
            {{ item.value }}
        </div>
    </div>
</template>

<script>
export default {
    // 进行父组件里边的传值
    props : {
        searchList : {
            // 导出里边的数组
            default () {
                return [];
            }
        }
    },
    methods : {
        search (value) {
            // 这里边进行父组件里边传递过来的方法触发
            this.$emit('search', value);
        }
    }
}
</script>

<style lang='less'>
    .history{
       margin-top: 85px;
        .his-item{
        padding: 15px;
        background: #eee;
        border-radius: 10px;
        display: inline-block;
        margin-left: 10px;
        margin-bottom: 10px;
        }
    }
    
</style>